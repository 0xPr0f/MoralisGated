import React, { useState } from "react";
import { Button } from "web3uikit";
import "../styles/App.css";
import { Abi } from "./abi";
import { NFT } from "web3uikit";
import Moralis from "moralis";
import { useChain } from "react-moralis";
import { useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

const UnlockInterface = () => {
  const dispatch = useNotification();
  const { chainId } = useMoralis();
  const { switchNetwork } = useChain();
  const [loading, setLoading] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleNewNotification = (type, icon, position, message, title) => {
    dispatch({
      type,
      message: message,
      title: title,
      icon,
      position: position || "topR",
    });
  };
  const Mint = async () => {
    const options = {
      contractAddress: "0x0639666C3D9bcF4ad739210663443D0C8fDA369b",
      functionName: "mintNFT",
      abi: Abi,
      msgValue: "",
    };
    switchNetwork("0x13881").then(async () => {
      setLoading(true);
      await delay(4000);
      try {
        if (chainId === "0x13881") {
          const transaction = await Moralis.executeFunction(options);
          const receipt = await transaction.wait();
          setLoading(false);
          handleNewNotification(
            "success",
            undefined,
            "topR",
            `https://mumbai.polygonscan.com/tx/${JSON.stringify(
              receipt.transactionHash
            ).replace(/^"(.*)"$/, "$1")}`,
            "Transaction Successful"
          );
          console.log(
            `https://mumbai.polygonscan.com/tx/${JSON.stringify(
              receipt.transactionHash
            ).replace(/^"(.*)"$/, "$1")}`
          );
        } else {
          return;
        }
      } catch (e) {
        setLoading(false);
        console.log(JSON.stringify(e.message));
        handleNewNotification(
          "error",
          undefined,
          "topR",
          JSON.stringify(e.message).replace(/^"(.*)"$/, "$1"),
          "Request Failed"
        );
      }
    });

    /*
    handleNewNotification({
      type: "success",
      icon,
      position,
      message: "tx hash",
      title: "you tx",
    });*/
  };

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
        <div>Hidden stuff</div>
        <br />
        <div className="Modal">
          <div>
            <b>
              <h2>The NFT</h2>
            </b>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <NFT
              address="0x0639666C3D9bcF4ad739210663443D0C8fDA369b"
              chain="mumbai"
              fetchMetadata
              tokenId="1"
            />
          </div>
          <br />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            isLoading={loading}
            id="test-button-primary"
            onClick={function mint() {
              Mint();
            }}
            size="large"
            text="Mint"
            // theme="secondary"
            theme="primary"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default UnlockInterface;
