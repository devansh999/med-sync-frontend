import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MeddxContract from '../artifacts/contracts/MeddxContract.sol/MeddxContract.json';

const contractAddress = '0xeb1b7c3aa28239a541461484263636f3346eb636';

function RegisterUser() {
  useEffect(() => {
    console.log('RegisterUser component rendered');
  }, []);

  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    ssn: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, MeddxContract.abi, signer);

        const transaction = await contract.registerUser(form.name, form.phoneNumber, form.ssn);
        await transaction.wait();

        alert('User registered successfully!');
      } catch (err) {
        console.error(err);
        alert(`Failed to register user: ${err.message}`);
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
        <h1 className="text-2xl text-white tracking-wider font-bold mb-6">Register User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="text-white">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg mt-2 outline-none text-lg"
              required
            />
          </div>
          <div>
            <label className="text-white">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 rounded-lg mt-2 outline-none text-lg"
              required
            />
          </div>
          <div>
            <label className="text-white">SSN</label>
            <input
              type="text"
              name="ssn"
              placeholder="Enter SSN"
              value={form.ssn}
              onChange={handleChange}
              className="w-full p-2 rounded-lg mt-2 outline-none text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 w-full rounded-lg tracking-wide font-bold text-lg hover:scale-105 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
