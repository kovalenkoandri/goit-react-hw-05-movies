import PropTypes from 'prop-types';
import Home from 'pages/Home';
import { useState, useEffect } from 'react';
import { Input, Button } from './Movies.styled';
import { useSearchParams } from 'react-router-dom';
const Movies = ({ onSubmit, images, appSetInput, appSetImages }) => {
  const [input, setInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(input);
  };

  const onChange = event => {
    appSetInput(''); // clear old search rendered response
    appSetImages([]);
    setInput(event.target.value);
    event.target.value ? setSearchParams({ query: event.target.value }) : setSearchParams({});
    
  };
  useEffect(() => {
    query && setInput(query);
}, [query]);
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
        <Home
          {...{
            images,
          }}
        />
      )}
    </>
  );
};

export default Movies;

Movies.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  appSetInput: PropTypes.func.isRequired,
  appSetImages: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
