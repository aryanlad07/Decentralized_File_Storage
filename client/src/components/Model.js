import { useState, useEffect } from "react";
import "./Model.css";

const Model = ({ setShowModal, contract, account, fileToShare }) => { // Receive fileToShare as a prop
  const [addressToShare, setAddressToShare] = useState("");
  const [accessList, setAccessList] = useState([]);

  const sharing = async () => {
    try {
      console.log(addressToShare);
      console.log(fileToShare);
      await contract.grantAccess(addressToShare, fileToShare); // Grant access to the specified file
      alert("Access shared successfully!");
      setShowModal(false);
    } catch (error) {
      alert("Error sharing access: " + error.message);
    }
  };
  const unsharing = async () => {
    try {
      console.log(addressToShare);
      console.log(fileToShare);
      await contract.revokeAccess(addressToShare, fileToShare); // Grant access to the specified file
      alert("Access removed successfully!");
      setShowModal(false);
    } catch (error) {
      alert("Error sharing access: " + error.message);
    }
  };

  const handleAddressChange = (e) => {
    setAddressToShare(e.target.value);
  };

  useEffect(() => {
    const fetchAccessList = async () => {
      try {
        const addressList = await contract.getaccessibleaccounts(fileToShare);
        setAccessList(addressList);
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };
    fetchAccessList();
  }, [contract, account]);

  return (
    <>
      {/* <div className="modalBackground"> */}
      <div>
        {/* <div className="modalContainer"> */}
        <div>
          <div  className="title">Share/Unshare</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              value={addressToShare}
              onChange={handleAddressChange}
            />
          </div>
          <div>
            
            <button id="share" onClick={sharing}>Share</button>
            <button id="not" onClick={unsharing}>Unshare</button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          </div>
          {/* <div className="accessList"> */}
          <div class="access-list-container">
            <p>People with access</p>
            <ul>
              {accessList.map((address, index) => (
                <li key={index}>{address}</li>
              ))}
            </ul>
          </div>
          {/* <div className="footer"> */}
          {/* <div>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={sharing}>Share</button>
            <button onClick={unsharing}>unShare</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Model;














// import { useEffect } from "react";
// import "./Model.css";
// const Model = ({ setModalOpen, contract }) => {
//   const sharing = async () => {
//     const address = document.querySelector(".address").value;
//     await contract.allow(address);
//     setModalOpen(false);
//   };
//   useEffect(() => {
//     const accessList = async () => {
//       const addressList = await contract.shareAccess();
//       let select = document.querySelector("#selectNumber");
//       const options = addressList;

//       for (let i = 0; i < options.length; i++) {
//         let opt = options[i];
//         let e1 = document.createElement("option");
//         e1.textContent = opt;
//         e1.value = opt;
//         select.appendChild(e1);
//       }
//     };
//     contract && accessList();
//   }, [contract]);
//   return (
//     <>
//       <div className="modalBackground">
//         <div className="modalContainer">
//           <div className="title">Share with</div>
//           <div className="body">
//             <input
//               type="text"
//               className="address"
//               placeholder="Enter Address"
//             ></input>
//           </div>
//           <form id="myForm">
//             <select id="selectNumber">
//               <option className="address">People With Access</option>
//             </select>
//           </form>
//           <div className="footer">
//             <button
//               onClick={() => {
//                 setModalOpen(false);
//               }}
//               id="cancelBtn"
//             >
//               Cancel
//             </button>
//             <button onClick={() => sharing()}>Share</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Model;