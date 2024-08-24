import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OffCanvasSidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {/* Drawer init and show */}
      <div className="text-center">
        <button
          className="bg-white hover:bg-gray-300 focus:ring-4 focus:ring-gray-400 rounded-lg text-sm px-2 py-2 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation">
          <span role="img" aria-label="emoji">
            <img
              src="/sidebar-svgrepo-com.svg"
              alt="MetaMask"
              className="w-6 h-6"
            />
          </span>
        </button>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label">
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/news"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src="/news-svgrepo-com.svg"
                  alt="News"
                  className="w-5 h-5"
                />
                <span className="ml-3">NEWS</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wallet"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src="/wallet-arrow-right-svgrepo-com.svg"
                  alt="Wallet"
                  className="w-5 h-5"
                />
                <span className="ml-3">WALLET</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
