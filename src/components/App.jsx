import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { searchMovies } from 'components/services/api';
import { getTrending } from 'components/services/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    const searchMoviesHttp = async input => {
      try {
        const response = await searchMovies(input).then(responseHttp => {
          return responseHttp.data.results;
        });
        setImages([]);
        setImages([...response]);
      } catch (error) {
        console.error(error);
      }
    };
    const getTrendingHttp = async () => {
      try {
        const response = await getTrending().then(responseHttp => {
          return responseHttp.data.results;
        });
        setImages([]);
        setImages([...response]);
      } catch (error) {
        console.error(error);
      }
    };
    if (input) {
      searchMoviesHttp(input);
    }
    if (!input) {
      getTrendingHttp();
    }
  }, [input]);

  const onSubmit = input => {
    setInput(input);
  };

  return (
    <>
      <Searchbar
        {...{
          onSubmit,
          input,
          setInput,
        }}
      />
      {
        <ImageGallery
          {...{
            images,
          }}
        />
      }
        
    </>
  );
};
