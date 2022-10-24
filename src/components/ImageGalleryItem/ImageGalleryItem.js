import PropTypes from 'prop-types';
import cssItem from './ImageGalleryItem.module.css';
import { Routes, Route, Link } from 'react-router-dom';
import { About } from './About';
export const ImageGalleryItem = ({ src, alt, poster_path, id }) => {
  return (
    <>
      <Link to={poster_path}>
        <li className={cssItem.ImageGalleryItem}>
          <img
            src={src}
            alt={alt}
            className={cssItem['ImageGalleryItem-image']}
          />
        </li>
      </Link>
      <Routes>
        <Route path={poster_path} element={<About id={id} />} />
      </Routes>
    </>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
