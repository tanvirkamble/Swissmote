import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';
import { NavigationBar } from './partials/NavigationBar';
import Footer from './partials/footerTemp';

export default function CryptoValuation() {
  const [cryptoData, setCryptoData] = useState([]);
  const [ethRate, setEthRate] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('http://api.coinlayer.com/live', {
          params: {
            access_key: import.meta.env.VITE_CRYPTOVALUE_API_KEY, // Your API key from .env
          },
        });

        if (response.data && response.data.success) {
          const top20 = Object.keys(response.data.rates).map((symbol) => ({
            symbol,
            rate: response.data.rates[symbol],
            name_full: response.data.crypto?.[symbol]?.name_full || symbol, // Safely access name_full
          }));

          const ethRate = response.data.rates['ETH']; // Get Ethereum rate for comparison
          setEthRate(ethRate);

          setCryptoData(top20);
        } else {
          setError(
            response.data.error ? response.data.error.info : 'Unknown error'
          );
        }
      } catch (error) {
        setError('Failed to fetch crypto data.');
        console.log(error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleSearch = () => {
    const coin = cryptoData.find(
      (crypto) => crypto.symbol.toUpperCase() === searchTerm.toUpperCase()
    );
    if (coin) {
      setSelectedCoin(coin);
      setShowComparison(true);
    } else {
      setSelectedCoin(null);
      setShowComparison(false);
      alert('Coin not found');
    }
  };

  const compareWithEthereum = (cryptoRate) => {
    if (ethRate === null || !cryptoRate) return null;

    const difference = ethRate - cryptoRate;
    if (difference > 0) {
      return (
        <div className="text-green-500">
          Ethereum is higher by ${difference.toFixed(2)}.
        </div>
      );
    } else {
      return (
        <div className="text-red-500">
          Ethereum is lower by ${Math.abs(difference).toFixed(2)}.
        </div>
      );
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="p-5 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Cryptocurrency Values Compared to Ethereum
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4">
            <strong>Error:</strong> {error}
          </p>
        )}
        {/* Search Bar and Submit Button */}
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Search for a coin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <Button
            className="text-black hover:bg-gray-700 hover:text-white"
            onClick={handleSearch}>
            Search
          </Button>
        </div>
        {/* Comparison Results */}
        {showComparison && selectedCoin && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Comparison for {selectedCoin.name_full} ({selectedCoin.symbol}):
            </h2>
            {compareWithEthereum(selectedCoin.rate)}
          </div>
        )}
        {/* Crypto Table */}
        <Table className="min-w-full bg-white shadow-md rounded">
          <Table.Head>
            <Table.HeadCell>Cryptocurrency (Symbol)</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Value (USD)</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {cryptoData.length > 0 ? (
              cryptoData.map((crypto, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{crypto.symbol}</Table.Cell>
                  <Table.Cell>{crypto.name_full}</Table.Cell>
                  <Table.Cell>${crypto.rate.toFixed(2)}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="3" className="text-center">
                  Loading...
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <Footer />
    </>
  );
}
