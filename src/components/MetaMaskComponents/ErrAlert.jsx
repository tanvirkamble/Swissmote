import PropTypes from 'prop-types';

export default function ErrAlert({ message, onClose }) {
  return (
    <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded">
      <span className="font-medium">ERROR!</span> {message}
      <button
        onClick={onClose}
        className="ml-4 text-gray-600 hover:text-gray-900">
        <span className="sr-only">Close</span>
        &times;
      </button>
    </div>
  );
}

ErrAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
