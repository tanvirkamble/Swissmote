// src/components/MetaMaskConnect.jsx
import { useState, useEffect } from 'react';
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
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts.length > 1) {
          setAccounts(accounts);
          setShowAlert(false);
        } else {
          handleAccountSelection(accounts[0]);
        }

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

  const handleAccountSelection = async (selectedAccount) => {
    try {
      // Fetch balance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(selectedAccount);
      console.log(ethers.utils);
      console.log(ethers.formatEther(balance));

      setAccount(selectedAccount);
      setBalance(ethers.formatEther(balance));
      setErrorMessage(null);
      setShowAlert(false);
      setShowCard(true);
      setAccounts([]);
      setSelectedAccount(null);
    } catch (error) {
      console.error('An error occurred while fetching account details:', error);
      setErrorMessage('An error occurred while fetching account details.');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (selectedAccount) {
      handleAccountSelection(selectedAccount);
    }
  }, [selectedAccount]);

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

      {accounts.length > 1 && (
        <div className="relative p-8 text-center">
          <h3 className="text-lg mb-4">Select an Account:</h3>
          <ul className="list-none p-0">
            {accounts.map((acc, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedAccount(acc)}
                  className="bg-blue-500 text-white p-2 rounded mb-2">
                  {acc}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showCard && account && (
        <div className="relative p-8 text-center">
          <Card
            className="max-w-m relative"
            renderImage={() => (
              <Images width={500} height={500} src="/eth.png" alt="Ethereum" />
            )}>
            <button
              onClick={() => {
                setShowCard(false);
                setAccount(null);
              }}
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
      )}
      {!account && !showAlert && <p className="p-8">not connected</p>}
    </div>
  );
};

export default MetaMaskConnect;
