// src/components/MetaMaskConnect.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import { Card } from 'flowbite-react';
import Images from './Images';
import { Alert } from 'flowbite-react';

const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const [showCard, setShowCard] = useState(false);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        // console.log(ethers);

        const signer = provider.getSigner();
        const account = accounts[0];
        setAccount(account);

        // Fetch balance
        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));
        console.log(ethers.utils);
        console.log(ethers.formatEther(balance));

        setErrorMessage(null);
        setShowAlert(false);
        setShowCard(true);
      } catch (error) {
        if (error.code === 4001) {
          setErrorMessage('Connection request rejected. Please try again.');
        } else {
          console.error('An error occurred:', error);
          setErrorMessage('An error occurred while connecting to MetaMask.');
        }
        setShowAlert(true);
        setShowCard(false);
      }
    } else {
      console.log('MetaMask is not installed. Please install MetaMask.');
      setShowAlert(true);
      setShowCard(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={connectMetaMask}
        className="bg-blue-500 text-white p-2 rounded">
        Connect MetaMask
      </button>

      {showAlert && errorMessage && (
        <Alert color="failure" className="absolute top-0 left-0 right-0 m-4">
          <span className="font-medium">ERROR!</span>
          {errorMessage}
          <button
            onClick={() => {
              setShowAlert(false);
              setErrorMessage(null);
              setAccount(null);
              setBalance(null);
            }}
            className="absolute right-2 px-2 text-gray-600 hover:text-gray-900">
            <span className="sr-only">Close</span>
            &times;
          </button>
        </Alert>
      )}

      {showCard && account ? (
        <div className="p-8 text-center">
          <Card
            className="max-w-m relative"
            renderImage={() => (
              <Images width={500} height={500} src="/eth.png" alt="image 1" />
            )}>
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              <span className="sr-only">Close</span>
              &times;
            </button>
            <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white">
              <strong>Connected Account:</strong> {account}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <strong>Balance:</strong> {balance} ETH
            </p>
          </Card>
        </div>
      ) : (
        <p className="p-8">not connected</p>
      )}
    </div>
  );
};

export default MetaMaskConnect;
