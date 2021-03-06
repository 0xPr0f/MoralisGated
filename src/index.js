import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import reportWebVitals from "./reportWebVitals";
import { MORALIS_APP_ID } from "./env";
import { NotificationProvider } from "web3uikit";
import { MORALIS_SERVER_URL } from "./env";
const Moralis = require("moralis");

const root = ReactDOM.createRoot(document.getElementById("root"));
Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });
root.render(
  <React.StrictMode>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
