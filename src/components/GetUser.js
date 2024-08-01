// src/components/GetUser.js

import React, { useState } from 'react';
import { ethers } from 'ethers';
import MeddxContract from '../artifacts/contracts/MeddxContract.sol/MeddxContract.json';

const contractAddress = '0xeb1b7c3aa28239a541461484263636f3346eb636';

function GetUser() {
  const [userAddress, setUserAddress] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isPatient, setIsPatient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUserAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, MeddxContract.abi, signer);

        let userInfo;
        if (isPatient) {
          userInfo = await contract.getUserInfo(userAddress);
        } else {
          userInfo = await contract.getPublicUserInfo(userAddress);
        }
        setUserInfo(userInfo);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch user info');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('MetaMask is not installed');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="p-10 bg-[#24133d] bg-opacity-90 w-11/12 lg:w-1/3 tracking-wide rounded-3xl">
        <h1 className="text-2xl text-white tracking-wider font-bold mb-6">View Records</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="text-white">User Address</label>
            <input
              type="text"
              name="userAddress"
              placeholder="Enter User Address"
              value={userAddress}
              onChange={handleChange}
              className="w-full p-2 rounded-lg mt-2 outline-none text-lg"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPatient"
              checked={isPatient}
              onChange={(e) => setIsPatient(e.target.checked)}
              className="mr-2"
            />
            <label className="text-white">I am the patient</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 w-full rounded-lg tracking-wide font-bold text-lg hover:scale-105 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Fetching...' : 'Get Info'}
          </button>
        </form>
        {userInfo && (
          <div className="mt-6 text-white">
            <p><strong>Name:</strong> {userInfo[0]}</p>
            <p><strong>Phone Number:</strong> {userInfo[1]}</p>
            {isPatient && <p><strong>SSN:</strong> {userInfo[2]}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default GetUser;
