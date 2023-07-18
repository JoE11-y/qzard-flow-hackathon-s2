import NonFungibleToken from 0x631e88ae7f1d7c20;
import MetadataViews from 0x631e88ae7f1d7c20;

pub contract QzardNft: NonFungibleToken {

  /// Total supply of ExampleNFTs in existence
  pub var totalSupply: UInt64

  /// The event that is emitted when the contract is created
  pub event ContractInitialized()

  /// The event that is emitted when an NFT is withdrawn from a Collection
  pub event Withdraw(id: UInt64, from: Address?)

  /// The event that is emitted when an NFT is deposited to a Collection
  pub event Deposit(id: UInt64, to: Address?)

  /// Storage and Public Paths
  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath

  /// The core resource that represents a Non Fungible Token.
  /// New instances will be created using the NFTMinter resource
  /// and stored in the Collection resource

  pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
    /// The unique ID that each NFT has
    pub let id: UInt64

    /// Metadata fields
    pub let name: String
    pub let description: String
    pub let thumbnail: String

    init(
      id: UInt64,
      name: String,
      description: String,
      thumbnail: String,
    ) {
      self.id = id
      self.name = name
      self.description = description
      self.thumbnail = thumbnail
    }

    /// Function that returns all the Metadata Views implemented by a Non Fungible Token
    ///
    /// @return An array of Types defining the implemented views. This value will be used by
    ///         developers to know which parameter to pass to the resolveView() method.
    ///
    pub fun getViews(): [Type] {
      return [
        Type<MetadataViews.Display>()
      ]
    }

    /// Function that resolves a metadata view for this token.
    ///
    /// @param view: The Type of the desired view.
    /// @return A structure representing the requested view.
    ///
    pub fun resolveView(_ view: Type): AnyStruct? {
      switch view {
        case Type<MetadataViews.Display>():
          return MetadataViews.Display(
            name: self.name,
            description: self.description,
            thumbnail: MetadataViews.HTTPFile(
              url: self.thumbnail
            )
          )
      }
      return nil
    }
  }

  /// Defines the methods that are particular to this NFT contract collection
  ///
  pub resource interface QzardNftCollectionPublic {
    pub fun deposit(token: @NonFungibleToken.NFT)
    pub fun getIDs(): [UInt64]
    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
  }

  /// The resource that will be holding the NFTs inside any account.
  /// In order to be able to manage NFTs any account will need to create
  /// an empty collection first
  ///
  pub resource Collection: QzardNftCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
    // dictionary of NFT conforming tokens
    // NFT is a resource type with an `UInt64` ID field
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

    init () {
      self.ownedNFTs <- {}
    }

    /// Removes an NFT from the collection and moves it to the caller
    ///
    /// @param withdrawID: The ID of the NFT that wants to be withdrawn
    /// @return The NFT resource that has been taken out of the collection
    ///    
    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
      let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

      emit Withdraw(id: token.id, from: self.owner?.address)

      return <-token
    }

    /// Adds an NFT to the collections dictionary and adds the ID to the id array
    ///
    /// @param token: The NFT resource to be included in the collection
    ///
    pub fun deposit(token: @NonFungibleToken.NFT) {
      let token <- token as! @QzardNft.NFT

      let id: UInt64 = token.id

      let oldToken <- self.ownedNFTs[id] <- token

      emit Deposit(id: id, to: self.owner?.address)

      destroy oldToken
    }

    /// Helper method for getting the collection IDs
    ///
    /// @return An array containing the IDs of the NFTs in the collection
    ///
    pub fun getIDs(): [UInt64] {
        return self.ownedNFTs.keys
    }

    /// Gets a reference to an NFT in the collection so that
    /// the caller can read its metadata and call its methods
    ///
    /// @param id: The ID of the wanted NFT
    /// @return A reference to the wanted NFT resource
    ///
    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
      return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
    }

    /// Gets a reference to the NFT only conforming to the `{MetadataViews.Resolver}`
    /// interface so that the caller can retrieve the views that the NFT
    /// is implementing and resolve them
    ///
    /// @param id: The ID of the wanted NFT
    /// @return The resource reference conforming to the Resolver interface
    ///
    pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
      let nft = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
      let QzardNft = nft as! &QzardNft.NFT
      return QzardNft as &AnyResource{MetadataViews.Resolver}
    }

    destroy() {
      destroy self.ownedNFTs
    }
  }

  /// Allows anyone to create a new empty collection
  ///
  /// @return The new Collection resource
  ///
  pub fun createEmptyCollection(): @NonFungibleToken.Collection {
    return <- create Collection()
  }

  pub fun mintNFT(
    recipient: &{NonFungibleToken.CollectionPublic},
    name: String,
    description: String,
    thumbnail: String,
  ) {
    var newNFT <- create NFT(
      id: QzardNft.totalSupply,
      name: name,
      description: description,
      thumbnail: thumbnail
    )

    recipient.deposit(token: <-newNFT)

    QzardNft.totalSupply = QzardNft.totalSupply + UInt64(1)
  }

  init() {
    self.totalSupply = 0

    self.CollectionStoragePath = /storage/QzardNftCollection
    self.CollectionPublicPath = /public/QzardNftCollection

    let collection <- create Collection()
    self.account.save(<-collection, to: self.CollectionStoragePath)

    self.account.link<&QzardNft.Collection{NonFungibleToken.CollectionPublic, QzardNft.QzardNftCollectionPublic, MetadataViews.ResolverCollection}>(
      self.CollectionPublicPath,
      target: self.CollectionStoragePath
    )

    emit ContractInitialized()
  }
}


  