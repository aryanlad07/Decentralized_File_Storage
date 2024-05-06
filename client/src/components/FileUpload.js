import { useState } from "react";
import axios from 'axios';
import "./FileUpload.css";

const FileUpload = ({ contract, account }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `f7bfae89954d6952f7db`,
                        pinata_secret_api_key: `b14a8922caffb575dc24061e5e6eebfd7f4b16c4e2b4ba078349a94cc24a7004`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.addFile(ImgHash); // Changed function call from add(account, ImgHash) to addFile(ImgHash)
                alert("Successfully File Uploaded");
                setFileName("No File selected");
                setFile(null);
            } catch (e) {
                alert("Unable to upload File to Pinata");
            }
        } else {
            alert("Please select an File to upload");
        }
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(data);
        };
        setFileName(data.name);
    };

    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    Choose File
                </label>
                <input
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={retrieveFile}
                />
                <span className="textArea">File: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};

export default FileUpload;













// import { useState } from "react"
// import axios from 'axios';
// import "./FileUpload.css";
// const FileUpload=({ contract, account, provider })=>{
//     const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();        //it will not reload page when form is submitted
//     if (file) {
//       try {
//         const formData = new FormData();      
//         formData.append("file", file);     //this 'file' store as key and file as a value in formData object

//         const resFile = await axios({    //this axious will store the form data i.e image file on IPFS using pinata as a service
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             // pinata_api_key: `Enter Your Key`,
//             // pinata_secret_api_key: `Enter Your Secret Key`,
//             pinata_api_key: `f7bfae89954d6952f7db`,
//             pinata_secret_api_key: `b14a8922caffb575dc24061e5e6eebfd7f4b16c4e2b4ba078349a94cc24a7004`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;   //imsge hash is generated see ipfs documentation how to get image hash
//         contract.add(account,ImgHash);     //this image hash is added on smart contract this add function is defined in smart contract
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object this object contain all information of that choosen file
//     // console.log(data);
//     const reader = new window.FileReader();     //to read the file
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {        //when file completely read then it will set that file or we can say choose that file
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);   //and this file object contain all info about file so from that we choose that filename
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose File
//         </label>
//         <input
//           disabled={!account}    //if metamask account is not there then it will not take input
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">File: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>   
//           Upload File                                                
//         </button>
//         {/*upload button not work till there is any file choosen this is done by disable property otherwise withoud file also it will functioning*/ }
//       </form>
//     </div>
//   );
// }
// export default FileUpload