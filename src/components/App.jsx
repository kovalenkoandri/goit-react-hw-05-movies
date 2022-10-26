import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { searchMovies } from 'components/services/api';
import { getTrending } from 'components/services/api';
import { Route, Routes} from 'react-router-dom';
import { NotFound } from 'pages/NotFound';
import { Container, Header, Link } from './App.styled';
import CardTemplate from 'pages/CardTemplate';

export const App = () => {
  const [images, setImages] = useState([]);
  const [trendingImages, setTrendingImages] = useState([]);
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
        setTrendingImages([]);
        setTrendingImages([...response]);
      } catch (error) {
        console.error(error);
      }
    };
    if (input) {
      searchMoviesHttp(input);
    } else {
      getTrendingHttp();
    }
  }, [input]);

  const onSubmit = input => {
    setInput(input);
  };

  return (
    <>
      <Container>
        <Header>
          <nav>
            <Link to="/" end>
              Home
            </Link>
            <Link to="/movies">Movies</Link>
          </nav>
        </Header>
        <Routes>
          <Route
            path="/*"
            element={
              <ImageGallery
                {...{
                  trendingImages,
                }}
              />
            }
          />
          <Route
            path="/movies/*"
            element={
              <Searchbar
                {...{
                  onSubmit,
                  appSetImages: setImages,
                  appSetInput: setInput,
                  images,
                }}
              />
            }
          />
          <Route path="/movies/:id" element={<CardTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};
