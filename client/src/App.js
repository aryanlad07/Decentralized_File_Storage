// import logo from './logo.svg';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"        //by running haedhat we get this artifacts see details in theory file
import {useState,useEffect} from "react"
import { ethers } from "ethers";
// import './App.css';
import '../src/App.css'
import FileUpload from "./components/FileUpload"
import Display from "./components/Display";
import Navbar from "./components/Navbar";
import Model from "./components/Model";
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);    //provider use to read data  of blockchin and for write data we need signer.metamask injects window.etherium

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {        //if on run time we change the blockchain then page will not reload automatically for reload automatically we  use this
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {     //if on run time we change the metamask account then page will not reload automatically for that we use this
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);      //it will open metamask wallet account
        const signer = provider.getSigner();                 //for write data on blockchain we need signer
        const address = await signer.getAddress();           // it will give address of account which is connected
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";      //IMP Your Contract Address Here i.e after running npx hardhat run --network localhost scripts/deploy.js   we can  get this contract address.after closing vscode it will vanish blochchain so when we want to run this code we need to agin compile and deply contract and give that address again here

        const contract = new ethers.Contract(    //creating contract instance
          contractAddress, 
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();    //here we check provider is there or not  and we call loadprovider
  }, []);   //if we not give ,[] then it load at evry render and run infinite time;
  return (
    <>
      {/* {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Model setModalOpen={setModalOpen} contract={contract}></Model>
      )} */}
      <Navbar></Navbar>
      <div className="App">
        
        {/* <h1 style={{ color: "white" }}>ImageShield Vault</h1> */}
        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;