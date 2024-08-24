// src/components/MetaMaskConnect.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ErrAlert from './MetaMaskComponents/ErrAlert';
import DetailsCard from './MetaMaskComponents/DetailsCard';
import { NavigationBar } from './partials/NavigationBar';
import Footer from './partials/footer';

const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]); //account with a 's'
  const [balance, setBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

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
      //   console.log(ethers.utils);
      //   console.log(ethers.formatEther(balance));

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
    <div className="bg-gray-100">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          onClick={connectMetaMask}
          className="bg-blue-500 text-white p-2 rounded hover:bg-gray-700">
          Connect MetaMask
        </button>

        {showAlert && errorMessage && (
          <ErrAlert
            message={errorMessage}
            onClose={() => {
              setShowAlert(false);
              setErrorMessage(null);
              setAccount(null);
              setBalance(null);
            }}
          />
        )}

        {accounts.length > 1 && (
          <div className="relative p-8 text-center">
            <h3 className="text-lg mb-4">Select an Account:</h3>
            <ul className="list-none p-0">
              {accounts.map((acc, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedAccount(acc)}
                    className="bg-blue-500 text-white p-2 rounded mb-2 hover:bg-gray-700">
                    {acc}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showCard && account && (
          <DetailsCard
            account={account}
            balance={balance}
            onClose={() => {
              setShowCard(false);
              setAccount(null);
            }}
          />
        )}
        {!account && !showAlert && (
          <p className="p-8 text-gray-400"> not yet connected</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MetaMaskConnect;
