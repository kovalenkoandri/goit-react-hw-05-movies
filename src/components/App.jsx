import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { searchMovies } from 'components/services/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    if (!input) return;

    const getHttp = async input => {
      try {
        const response = await searchMovies(input).then(
          responseHttp => {
            return responseHttp.data.results
          }
        );
        setImages([...response]);
      } catch (error) {
        console.error(error);
      }
    };
    getHttp(input);
  }, [input]);

  const handleSubmit = input => {
    setInput(input);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {
        <ImageGallery
          {...{
            images: images,
          }}
        />
      }
    </>
  );
};
