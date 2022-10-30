import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Home = ({ images, trendingImages }) => {
  const renderImages = images || trendingImages || [];
  const noDuplicate = renderImages.filter(
    (el,
    idx) => renderImages.indexOf(el) === idx
  );
  const location = useLocation();
  console.log(location);
  return (
    <>
      <ul>
        {noDuplicate.length > 0 &&
          noDuplicate.map(({ id, title, name }) => {
            return (
              <li key={id}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location }}
                >
                  {title || name}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Home;

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
