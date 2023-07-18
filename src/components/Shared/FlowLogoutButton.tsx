export const LogoutFlowButton = (props: any) => {
    const { user, router, logOutFlowNetwork } = props;
    if (user && user.addr) {
      return (
        <div className="inline-flex gap-2">
          <button className="text-xs bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded mb-3" onClick={() => logOutFlowNetwork()}>
            Logout
          </button>
          <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded mb-3" onClick={() => router.push('/')}>
            Go Back
          </button>
        </div>
      );
    }
    return null;
  };