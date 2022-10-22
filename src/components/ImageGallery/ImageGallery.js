import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
  images,
  children,
}) => (
  <>
    <ul className={css.ImageGallery}>
      {images.length > 0 &&
        images.map(({ id, title, poster_path }) => {
          return (
            <ImageGalleryItem key={id.toString()} src={poster_path} alt={title}>
              {children}
            </ImageGalleryItem>
          );
        })}
    </ul>
  </>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
