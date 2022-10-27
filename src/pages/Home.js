import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const Home = ({ images, trendingImages }) => {
  const renderImages = images || trendingImages || [];
  return (
    <>
      <ul>
        {renderImages.length > 0 &&
          renderImages.map(({ id, title, name }) => {
            return <ImageGalleryItem key={id} alt={title || name} id={id} />;
          })}
      </ul>
    </>
  );
};

Home.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  trendingImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};
