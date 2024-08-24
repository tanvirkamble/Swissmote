import PropTypes from 'prop-types';
import { Card } from 'flowbite-react';
import Images from './Images';

export default function DetailsCard({ account, balance, onClose }) {
  return (
    <div className="relative p-8 text-center">
      <Card className="max-w-m relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          <span className="sr-only">Close</span>
          &times;
        </button>
        <Images width={500} height={500} src="/eth.png" alt="Ethereum" />
        <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white">
          <strong>Connected Account:</strong> {account}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <strong>Balance:</strong> {balance} ETH
        </p>
      </Card>
    </div>
  );
}

DetailsCard.propTypes = {
  account: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
