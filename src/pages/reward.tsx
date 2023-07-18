import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { mintNFT } from "../cadence/transactions/mintNFT";
import { getTotalSupply } from "../cadence/scripts/getTotalSupply";
import { getIDs } from "../cadence/scripts/getID";
import { getMetadata } from "../cadence/scripts/getMetadata";
import { LoginFlowButton } from "../components/Shared/FlowLoginButton";
import { LogoutFlowButton } from "../components/Shared/FlowLogoutButton";
import { MintRewardButton } from "../components/Shared/FlowMintButton";
import { UserRewardsMinted } from "../components/Shared/FlowUserRewards";
import Link from "next/link";
import { useRouter } from 'next/router'; 
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

fcl.config({
  "flow.network": "testnet",
  "app.detail.title": "Qzard",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "app.detail.icon": "https://qstn.open4glabs.xyz/android-chrome-192x192.png",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

export default function Reward() {
    const router = useRouter();
    const [user, setUser] = useState<any>();
    const [images, setImages] = useState<any>();

    const logInFlowNetwork = () => {
        fcl.authenticate();
      };
    
    const logOutFlowNetwork = () => {
        setImages([]);
        fcl.unauthenticate();
    };


    const fetchRewards = async () => {
        // Empty the images array
        setImages([]);
        let IDs: any = [];
    
        // Fetch the IDs with a script (no fees or signers)
        try {
          IDs = await fcl.query({
            cadence: `${getIDs}`,
            args: (arg, t) => [arg(user.addr, types.Address)],
          });
        } catch (err) {
          console.log("No NFTs Rewards yet");
        }
    
        let nft_mediaSource: any = [];
        try {
          for (let i = 0; i < IDs.length; i++) {
            const result = await fcl.query({
              cadence: `${getMetadata}`,
              args: (arg, t) => [
                arg(user.addr, types.Address),
                arg(IDs[i].toString(), types.UInt64),
              ],
            });
            // If the source is an IPFS link, remove the "ipfs://" prefix
            if (result["thumbnail"].startsWith("ipfs://")) {
              nft_mediaSource.push(result["thumbnail"].substring(7));
              // Add a gateway prefix
              nft_mediaSource[i] = "https://nftstorage.link/ipfs/" + nft_mediaSource[i];
            } else {
              nft_mediaSource.push(result["thumbnail"]);
            }
          }
        } catch (err) {
          console.log(err);
        }
    
        if (images.length < nft_mediaSource.length) {
          setImages(
            Array.from({ length: nft_mediaSource.length }, (_, i) => i).map(
              (number, index) => (
                <img
                  style={{ margin: "9px", height: "160px" }}
                  src={nft_mediaSource[index]}
                  key={number}
                  alt={"NFT #" + number}
                />
              )
            )
          );
        }
    };
    
    const mintFlowNft = async () => {
        let nft_TotalSupply;
        try {
          nft_TotalSupply = await fcl.query({
            cadence: `${getTotalSupply}`,
          });
        } catch (err) {
          console.log(err);
        }
    
        const nft_id = parseInt(nft_TotalSupply) + 1;
    
        try {
          const transactionId = await fcl.mutate({
            cadence: `${mintNFT}`,
            args: (arg, t) => [
              arg(user.addr, types.Address), //address to which NFT should be minted
              arg("Qzard # " + nft_id.toString(), types.String),
              arg("Qzard Collection", types.String),
              arg(
                "https://bafybeig2muqvepvyoq757zjdfhfymf53mnmj2d2lsivokjv76ctonsx5si.ipfs.nftstorage.link/" +
                  nft_id +
                  ".jpg",
                types.String
              ),
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            limit: 99,
          });
    
          console.log("Minting NFT reward [transaction ID] ", transactionId);
          const transaction = await fcl.tx(transactionId).onceSealed();
          console.log(
            "Testnet explorer:",
            `https://testnet.flowscan.org/transaction/${transactionId}`
          );
          console.log(transaction);
          alert("Reward NFT minted successfully!");
        } catch (error) {
          console.log(error);
          alert("Error minting NFT!");
        }
    };


    useEffect(() => {
        fcl.currentUser().subscribe(setUser);
    }, []);
    
    useEffect(() => {
        if (user && user.addr) {
          fetchRewards();
        }
    }, [user]);

    useEffect(() => {
    }, [images]);

    return (
      <main
        className={`${inter.className}`}
      >
        
        <div className="relative flex sm:min-h-screen min-h-full flex-col justify-center overflow-hidden bg-gray-50 sm:py-12">
        <img src="/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative bg-white px-3 pt-5 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="mx-auto max-w-full">
            <div className="flex flex-col items-center justify-center p-6">

            {user && user.addr && (<div className="flex flex-col items-left mb-8 w-full">
                <h1 className="text-sm">Welcome Back, {user.addr}</h1>
                <h2 className="text-3xl font-bold">Congratulations!</h2>
            </div>)}

            {user && user.addr && (<div className="rounded-lg bg-gray-200 p-4 flex items-center justify-between mb-8 w-full">
                <h3 className="text-base font-bold mr-4">Receive your reward</h3>
                <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6" />
            </div>)}

            {user && user.addr ? (
            <div className="mb-8 w-full">
                <h2 className="text-base pb-3">Click button bellow to mint your reward</h2>
                <div className="rounded-lg bg-gray-200 p-4 text-center">
                <MintRewardButton mintFlowNft={mintFlowNft} />
                </div>

                <UserRewardsMinted images={images} />

            </div>) 
            :(
                <div className="mb-8 w-full text-center">
                <h2 className="text-base pb-3">Connect to Flow network receive your reward!</h2>
                <div className="rounded-lg bg-gray-200 p-4 text-center">
                <LoginFlowButton logInFlowNetwork={logInFlowNetwork} />
                </div>
            </div>                
            )}

            <LogoutFlowButton user={user} router={router} logOutFlowNetwork={logOutFlowNetwork} />

            </div>
            </div>
        </div>
        </div>
        
    </main>
    )
  }