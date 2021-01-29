import React, { useEffect } from "react";
import "./css/App.css";
import useWeb3 from "./hooks/web3";
import { Provider } from "react-redux";
import { store } from "./redux";
import { setAccountsAction, setWeb3DataAction } from "./redux/actions";
import { Election } from "./components/Election";

function App() {
  const { isLoading, isWeb3, web3, accounts } = useWeb3();

  useEffect(() => {
    (async () => {
      if (web3 !== null) {
        const networkId = await web3.eth.net.getId();
        store.dispatch(setWeb3DataAction(networkId));
        store.dispatch(setAccountsAction(accounts));
      }
    })();
  }, [isLoading, isWeb3]);

  return (
    <Provider store={store}>
      <div className="App">
        {isLoading ? (
          <div>Loading Web3, accounts, and contract...</div>
        ) : isWeb3 ? (
          <>
            <Election />
          </>
        ) : (
          <div>
            <p>none web3</p>
          </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
