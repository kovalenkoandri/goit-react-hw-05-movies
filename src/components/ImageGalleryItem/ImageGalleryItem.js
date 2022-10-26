import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export const ImageGalleryItem = ({ alt, id }) => {
  return (
    <>
      <li>
        <Link to={`/movies/${id}`}>{alt}</Link>
      </li>
    </>
  );
};
ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
};
