import PropTypes from 'prop-types';
import cssItem from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  src,
  alt,
}) => {
  return (
    <>
      <li
        className={cssItem.ImageGalleryItem}
      >
        <img
          src={src}
          alt={alt}
          className={cssItem['ImageGalleryItem-image']}
        />
      </li>
    </>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
