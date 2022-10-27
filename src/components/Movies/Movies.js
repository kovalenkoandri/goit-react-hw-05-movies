import PropTypes from 'prop-types';
import { ImageGallery } from 'components/ImageGallery';
import { useState } from 'react';
import { Input, Button } from './Movies.styled';
export const Movies = ({ onSubmit, images, appSetInput, appSetImages }) => {
  const [input, setInput] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(input);
  };

  const onChange = event => {
    setInput(event.target.value);
    appSetInput(''); // clear old search rendered response
    appSetImages([]);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <Input
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder=""
            value={input}
            onChange={onChange}
          />
          <Button type="submit">
            <span>Search</span>
          </Button>
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
Movies.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  appSetInput: PropTypes.func.isRequired,
  appSetImages: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
