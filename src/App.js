import "./styles/App.css";
import { ConnectButton } from "web3uikit";
import { gateNativeBalance } from "./gate/gate";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import UnlockInterface from "./gate/unlockInterface";

function App() {
  const { account, isAuthenticated } = useMoralis();
  const [state, setState] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const test1 = await test();
      setState(test1);
    }

    fetchData();
  });
  async function test() {
    const balance = await gateNativeBalance("eth", account, 0.001);
    return balance;
  }

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "right", margin: "20px" }}>
        <ConnectButton />
      </div>
      {state && isAuthenticated ? (
        <UnlockInterface />
      ) : (
        <>
          <div style={{ fontSize: "20px" }}>
            <br />
            <br />
            <br />
            {/*Please pardon me for the terrible css*/}
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              Hey, you got to hold at least 0.001 ETH on mainnet to claim the
              NFT{" "}
            </div>
            <br />
            <div>
              This only gates Native balance, but hopefully will be customised
              and improved
            </div>
            <br />
            <div>
              They may be some buys, moralis isnt a token gating tool but can
              serve some of that purpose due to conditional rendering
            </div>
            <br />
            <div>
              This was also mad with the web3uiKit,&nbsp;
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/web3ui/web3uikit"
              >
                check that out here
              </a>
            </div>
            <div>
              check out the &nbsp;
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/0xPr0f/MoralisGated"
              >
                github here
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
