import { useState, useEffect } from 'react';
import { Movies } from 'pages/Movies';
import { Home } from 'pages/Home';
import { searchMovies } from 'components/services/api';
import { getTrending } from 'components/services/api';
import { Cast } from 'components/Cast';
import { Reviews } from 'components/Reviews';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from 'pages/NotFound';
import { Container, Header, Link } from './App.styled';
import { MovieDetails } from 'pages/MovieDetails';

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
              <Home
                {...{
                  trendingImages,
                }}
              />
            }
          />
          <Route
            path="/movies/*"
            element={
              <Movies
                {...{
                  onSubmit,
                  appSetImages: setImages,
                  appSetInput: setInput,
                  images,
                }}
              />
            }
          />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};
