export const MintRewardButton = (props: any) => {
    const { mintFlowNft } = props;
    return (
      <div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded" onClick={() => mintFlowNft()}>
            Mint Reward
          </button>
        </div>
      </div>
    );
};