import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { NavigationBar } from './partials/NavigationBar';
import Footer from './partials/Footer';

export default function CryptoValuation() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('http://api.coinlayer.com/live', {
          params: {
            access_key: import.meta.env.VITE_CRYPTOVALUE_API_KEY, // use your API key from .env
          },
        });

        console.log('API response:', response); // Log full API response
        if (response.data && response.data.success) {
          const filteredData = Object.keys(response.data.rates)
            .filter((symbol) =>
              ['BTC', 'ETH', 'SOL', 'BNB', 'LTC'].includes(symbol)
            )
            .map((symbol) => ({
              symbol,
              rate: response.data.rates[symbol],
            }));

          setCryptoData(filteredData);
        } else {
          console.error('Invalid data structure:', response.data);
          setError(
            response.data.error ? response.data.error.info : 'Unknown error'
          );
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setError('Failed to fetch crypto data.');
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="p-5 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Top Cryptocurrency Values</h1>
        {error && (
          <p className="text-red-500 text-center mb-4">
            <strong>Error:</strong> {error}
          </p>
        )}
        <Table className="min-w-full bg-white shadow-md rounded">
          <Table.Head>
            <Table.HeadCell>Cryptocurrency</Table.HeadCell>
            <Table.HeadCell>Value (USD)</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {cryptoData.length > 0 ? (
              cryptoData.map((crypto, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{crypto.symbol}</Table.Cell>
                  <Table.Cell>${crypto.rate.toFixed(2)}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="2" className="text-center">
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
