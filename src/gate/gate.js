import { Moralis } from "moralis";

export const gateNativeBalance = async (chain, address, amount, decimal) => {
  let balInEth;
  const options = {
    chain: chain,
    address: address,
  };
  /*
  if (
    typeof address !== "string" ||
    typeof chain !== "string" ||
    typeof amount !== "number"
  ) {
    return console.error(
      "chain is a string, address is a string, amount is a number."
    );
  }
*/
  const balance = await Moralis.Web3API.account.getNativeBalance(options);
  if (decimal === undefined) {
    balInEth = Moralis.Units.FromWei(JSON.stringify(parseInt(balance.balance)));
  }
  if (balInEth > amount) {
    return true;
  } else {
    return false;
  }
};
