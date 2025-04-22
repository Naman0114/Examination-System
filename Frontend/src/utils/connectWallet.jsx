import axios from 'axios';
import { ethers } from 'ethers';
import contractAbi from '../constants/contractAbi.json';

export const connectWallet = async () => {
  try {

    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    console.log("Connected accounts:", accounts);
    const selectedAccount = accounts[0].toLowerCase();


    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("Signer:", signer);

    const address = (await signer.getAddress()).toLowerCase();
    console.log("Signer Address:", address);

    if (address !== selectedAccount) {
      throw new Error("Signer address does not match selected account");
    }

    const message = "Welcome to Authenticate Wallet";
    let signature = null;
    try {
      signature = await signer.signMessage(message);
      console.log("Signature:", signature);
    } catch (signingError) {
      console.error("Error signing message:", signingError);
      throw new Error("Unable to sign message");
    }

    if (!signature) {
      throw new Error("Signature not obtained");
    }

    const dataSignature = { signature };
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/authentication?address=${selectedAccount}`;


    const res = await axios.post(url, dataSignature);
    console.log("Backend Response:", res.data);


    const contractAddress = "0x2E6562C16F15f6C1e8E8eFD3D9A1c352FDaB2f62";
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);


    return { contractInstance, selectedAccount };

  } catch (error) {
    console.log("Error occurred:", error);
  }
};

