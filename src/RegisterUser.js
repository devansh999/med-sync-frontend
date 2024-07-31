// RegisterUser.js

import React, { useState } from 'react';
import { ethers } from 'ethers';
import MeddxContract from './artifacts/contracts/MeddxContract.sol/MeddxContract.json'; 

const contractAddress = '0xeb1b7c3aa28239a541461484263636f3346eb636';

function RegisterUser() {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    ssn: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", form);

    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Ethereum object found");
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Ethereum accounts requested");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Web3 provider initialized", provider);
        const signer = provider.getSigner();
        console.log("Signer obtained", signer);

        // Debug ABI and Contract Address
        console.log("Contract ABI:", MeddxContract.abi);
        console.log("Contract Address:", contractAddress);

        // Verify if ABI is correctly imported
        if (!MeddxContract.abi) {
          throw new Error("Contract ABI is undefined");
        }

        // Log ABI length
        console.log("Contract ABI length:", MeddxContract.abi.length);

        const contract = new ethers.Contract(contractAddress, MeddxContract.abi, signer);
        console.log("Connected to contract", contract);

        const transaction = await contract.registerUser(
          form.name,
          form.phoneNumber,
          form.ssn
        );
        console.log("Transaction sent:", transaction);

        const receipt = await transaction.wait();
        console.log("Transaction receipt:", receipt);
        alert('User registered successfully!');
      } catch (err) {
        console.error("Error details:", err);
        alert(`Failed to register user: ${err.message}`);
      }
    } else {
      console.log("MetaMask not found or not installed");
      alert('MetaMask is not installed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
      />
      <input
        type="text"
        name="ssn"
        placeholder="SSN"
        value={form.ssn}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
    </form>
  );
}

export default RegisterUser;
