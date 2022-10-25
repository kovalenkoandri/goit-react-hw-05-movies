import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ImageGallery } from 'components/ImageGallery';
import { useState } from 'react';
export const Searchbar = ({ onSubmit, images }) => {
  const [input, setInput] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(input);
  };

  const onChange = event => {
    setInput(event.target.value);
  };

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span>Search</span>
          </button>

          <input
            name="input"
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={input}
            onChange={onChange}
          />
        </form>
      </header>
      {input && (
        <ImageGallery
          {...{
            images,
          }}
        />
      )}
    </>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
