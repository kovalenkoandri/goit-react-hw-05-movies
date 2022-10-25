import PropTypes from 'prop-types';

export const ImageGalleryItem = ({  alt }) => {
  return (
    <>
      <li>{alt}</li>
    </>
  );
};
ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
};
