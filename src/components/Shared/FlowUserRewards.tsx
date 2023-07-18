export const UserRewardsMinted = (props: any) => {
    const { images } = props;
    return (
        <div className="mt-6">
        <h2 className="text-lg">Your NFT Rewards</h2>
        {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-1">{images}</div>
        ) : (
        ""
        )}
        </div>
    )

}