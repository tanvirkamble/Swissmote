import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react';
import { NavigationBar } from './partials/NavigationBar';
import Footer from './partials/footer';

export default function EthereumNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Ethereum',
            apiKey: import.meta.env.VITE_NEWS_API_KEY, // Updated line
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 9,
          },
          headers: {
            Accept: 'application/json',
          },
        });

        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching Ethereum news:', error);
        <p>
          <strong>ERROR!</strong>
          {error}
        </p>;
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="p-5 bg-gray-100 h-screen">
        <h1 className="text-2xl font-bold mb-4">Ethereum News</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {news.map((article, index) => (
            <Card key={index} className="max-w-sm">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-3"
                />
              )}
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                {article.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
                {article.description}
              </p>
              <div className="flex justify-end">
                <Button
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white text-sm py-1 px-3 rounded-md hover:bg-gray-500">
                  Read more
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
