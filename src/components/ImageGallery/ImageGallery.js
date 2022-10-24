import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
  images,
}) => (
  <>
    <ul className={css.ImageGallery}>
      {images.length > 0 &&
        images.map(({ id, title, name, poster_path }) => {
          return (
            // https://image.tmdb.org/t/p/w500${el.poster_path}
            <ImageGalleryItem
              key={id}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title || name}
              poster_path={poster_path}
              id={id}
            />
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
