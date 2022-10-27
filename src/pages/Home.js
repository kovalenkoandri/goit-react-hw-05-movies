import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Home = ({ images, trendingImages }) => {
  const renderImages = images || trendingImages || [];
  const noDuplicate = renderImages.filter(
    (el,
    idx) => renderImages.indexOf(el) === idx
  );
  return (
    <>
      <ul>
        {noDuplicate.length > 0 &&
          noDuplicate.map(({ id, title, name }) => {
            return (
                <li key={id}>
                  <Link to={`/movies/${id}`}>{title || name}</Link>
                </li>
            );
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
