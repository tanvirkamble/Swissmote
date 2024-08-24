import PropTypes from 'prop-types';

const Images = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

Images.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Images;
