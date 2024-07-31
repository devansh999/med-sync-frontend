import React, { useState } from 'react';
import { ethers } from 'ethers';
import MeddxContract from './artifacts/contracts/MeddxContract.sol/MeddxContract.json';

const contractAddress = '0xeb1b7c3aa28239a541461484263636f3346eb636';
function GetUser() {
  const [userAddress, setUserAddress] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isPatient, setIsPatient] = useState(false);

  const handleChange = (e) => {
    setUserAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Fetching user info");

    if (typeof window.ethereum !== 'undefined') {
      console.log("Ethereum object found");
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, MeddxContract.abi, signer);
        console.log("Connected to contract");

        let userInfo;
        if (isPatient) {
          userInfo = await contract.getUserInfo(userAddress);
        } else {
          userInfo = await contract.getPublicUserInfo(userAddress);
        }
        setUserInfo(userInfo);
        console.log("User info fetched:", userInfo);
      } catch (err) {
        console.error("Error:", err);
        alert('Failed to fetch user info');
      }
    } else {
      console.log("Ethereum object not found");
      alert('MetaMask is not installed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <input
          type="text"
          name="userAddress"
          placeholder="User Address"
          value={userAddress}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
        />
        <label style={{ marginBottom: '10px' }}>
          <input
            type="checkbox"
            name="isPatient"
            checked={isPatient}
            onChange={(e) => setIsPatient(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          I am the patient
        </label>
        <button type="submit" style={{ padding: '10px 20px' }}>Get User Info</button>
      </form>
      {userInfo && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p><strong>Name:</strong> {userInfo[0]}</p>
          <p><strong>Phone Number:</strong> {userInfo[1]}</p>
          {isPatient && <p><strong>SSN:</strong> {userInfo[2]}</p>}
        </div>
      )}
    </div>
  );
}

export default GetUser;
