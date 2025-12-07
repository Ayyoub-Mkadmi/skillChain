import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const checkAdmin = async (address) => {
      const adminAddress = '0x10E130F782b961eC76eDbE793E8014f166E33C91';
      if (address.toLowerCase() === adminAddress.toLowerCase()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const signerAddress = await signer.getAddress();
          setAccount(signerAddress);
          setIsConnected(true);
          await checkAdmin(signerAddress);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('Ethereum wallet is not connected.');
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        setAccount(signerAddress);
        setIsConnected(true);
        const adminAddress = '0x10E130F782b961eC76eDbE793E8014f166E33C91';
        if (signerAddress.toLowerCase() === adminAddress.toLowerCase()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('User rejected the request or another error occurred:', error);
      }
    } else {
      console.error('MetaMask is not installed.');
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md sm:px-6 lg:px-8">
      <div className="flex items-center">
        <a href="/" className="text-lg font-semibold text-white hover:text-gray-200 transition duration-300">
          Accueil
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="px-4 py-2 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
          >
            Se connecter à MetaMask
          </button>
        ) : (
          <span className="px-4 py-2 text-sm text-white bg-indigo-800 rounded-md">
            Connecté : {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}

        {isAdmin && (
          <a
            href="/issuecertificate"
            className="px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
          >
            Émettre un certificat
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
