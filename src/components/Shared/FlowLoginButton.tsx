export const LoginFlowButton = (props: any) => {
    const { logInFlowNetwork } = props;
    return (
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded" onClick={() => logInFlowNetwork()}>
          Log In
        </button>
      </div>
    );
};