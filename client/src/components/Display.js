import { useState } from "react";
import axios from 'axios';
import './Display.css';
import Model from './Model';

const Display = ({ contract, account }) => {
    const [data, setData] = useState("");
    const [otherAddress, setOtherAddress] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [fileToShare, setFileToShare] = useState(""); // New state to store the file to share

    const getdata = async () => {
        try {
            let dataArray;
            if (otherAddress) {
              console.log(otherAddress);
              // console.log(account);
                dataArray = await contract.getAccessibleFiles(otherAddress,account);
                console.log(dataArray);
            } else {
                dataArray = await contract.getFileList(account);
            }
            const isEmpty = dataArray.length === 0;

            if (!isEmpty) {
                const images = dataArray.map((item, i) => (
                    <div className="modelcontainer" key={i}>
                        <a href={item} target="_blank">
                            <img
                                src={item}
                                alt="new"
                                className="image-list"
                            />
                        </a>
                        {!otherAddress && ( // Display the "Share Access" button only if otherAddress is empty
                            <div className="button-group">
                                {/* <button onClick={() => openShareModal(item)}>Share Access</button>
                                <button onClick={() => openShareModal(item)}>unShare Access</button> */}
                                <button  onClick={() => openShareModal(item)}>Access control</button>
                                {/* <button  onClick={() => deletefile(item,dataArray)}>Delete file</button> */}
                            </div>
                        )}
                    </div>
                ));
                setData(images);
            } else {
                alert("No File to display");
            }
        } catch (error) {
            alert("Error getting data: " + error.message);
        }
    };

    const openShareModal = (file) => { // Updated function to set the file to share and open the modal
        setFileToShare(file);
        setShowModal(true);
        console.log(showModal);
        console.log(fileToShare);
    };
    const deletefile = async (fileHash,dataArray) => {
const parts = fileHash.split('/'); // Split the URL by '/'
const hash = parts[parts.length - 1]; // Get the last part of the URL
console.log(hash);
        try {
            const response = await axios({
                method: "delete",
                url: `https://api.pinata.cloud/pinning/unpin/${hash}`,
                headers: {
                    pinata_api_key: `f7bfae89954d6952f7db`,
                    pinata_secret_api_key: `b14a8922caffb575dc24061e5e6eebfd7f4b16c4e2b4ba078349a94cc24a7004`,
                },
            });
            const indexToRemove = dataArray.indexOf(fileHash);
            if (indexToRemove !== -1) {
                // Remove the hash from the array using splice()
                dataArray.splice(indexToRemove, 1);
                console.log(`File with hash ${fileHash} removed from dataarray`);
            } else {
                console.log(`File with hash ${fileHash} not found in dataarray`);
            }
            console.log('File deleted from IPFS successfully:', response.data);
        } catch (error) {
            console.error('Error deleting file from IPFS:', error);
        }
    };

    return (
        <>
            <div className="image-list">{data}</div>
            <div className="lst">
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
                value={otherAddress}
                onChange={(e) => setOtherAddress(e.target.value)}
            />
            <button className="center button" onClick={getdata}>
                VIEW UPLOADS
            </button>
            {showModal && (
                <Model
                setShowModal={setShowModal}
                    contract={contract}
                    account={account}
                    fileToShare={fileToShare} // Pass the file to share to the Model component
                />
            )}</div>
        </>
    );
}

export default Display;




























// import { useState } from "react";
// import './Display.css'
// const Display=({contract,account})=>{
//     const [data, setData] = useState("");
//   const getdata = async () => {
//     let dataArray;
//     const Otheraddress = document.querySelector(".address").value;    //it will take adress if that user has given any other address to retrive other addresss account data
//     try {
//       if (Otheraddress) {      //if other address provided then we retrive that address files
//         dataArray = await contract.display(Otheraddress);      //this contract function is defined in smart contract
//         console.log(dataArray);
//       } else {                 //else we retrive current user files
//         dataArray = await contract.display(account);
//       }
//     } catch (e) {
//       alert("You don't have access");
//     }
//     const isEmpty = Object.keys(dataArray).length === 0;   //if that account has not any files i.e file url then ibecome true;

//     if (!isEmpty) {
//       const str = dataArray.toString();    //becouse values are in object form we convert them into string
//       const str_array = str.split(",");    //str is in form of concanated form so we split eac url and put them into array in each element in array is image ling on the ipfs
//       // console.log(str);
//       // console.log(str_array);
//       const images = str_array.map((item, i) => {
//         return (
//           <a href={item} key={i} target="_blank">
//             <img
//               key={i}
//               // src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}    // item contain entire url but we need part only after ipfs/ becouse before part of ipfs/ is default and we already givenn here . to see each image url use console.log(str_array); you will get url format. this is done becouse img tag not working by giving directly url
//               src={item}
//               alt="new"
//               className="image-list"
//             ></img>
//           </a>
//         );
//       });
//       setData(images);
//     } else {
//       alert("No image to display");
//     }
//   };
//   return (
//     <>
//       <div className="image-list">{data}</div>
//       <input
//         type="text"
//         placeholder="Enter Address"
//         className="address"
//       ></input>
//       <button className="center button" onClick={getdata}>
//         Get Data
//       </button>
//     </>
//   );
// }
// // module.exports=Display
// export default Display;