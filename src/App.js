import "./styles/App.css";
import { ConnectButton } from "web3uikit";
import { gateNativeBalance } from "./gate/gate";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

function App() {
  const { account } = useMoralis();
  const [state, setState] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const test1 = await test();
      console.log(test1);
      setState(test1);
    }

    fetchData();
  });
  async function test() {
    const balance = await gateNativeBalance("eth", account, 0.0001);
    return balance;
  }

  return (
    <div className="App">
      <ConnectButton />
      <button onClick={fetch}>Fetch</button>
      {state ? <button>Well gated</button> : null}
    </div>
  );
}

export default App;
