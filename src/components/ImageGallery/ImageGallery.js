import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, trendingImages }) => {
  const renderImages = images || trendingImages || [];
  return (
    <>
      <ul className={css.ImageGallery}>
        {renderImages.length > 0 &&
          renderImages.map(({ id, title, name, poster_path }) => {
            return (
              <ImageGalleryItem
                key={id}
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title || name}
              />
            );
          })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
  trendingImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
};
