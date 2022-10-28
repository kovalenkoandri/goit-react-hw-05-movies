import { useState, useEffect } from 'react';
import { searchMovies } from 'components/services/api';
import { getTrending } from 'components/services/api';
import { Route, Routes } from 'react-router-dom';
import { Container, Header, Link } from 'components/App/App.styled';
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const NotFound = lazy(() => import('pages/NotFound'));

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
        <Suspense fallback={<div>Loading...</div>}>
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
            path="/"
            element={
              <Home
                {...{
                  trendingImages,
                }}
              />
            }
          />
          <Route
            path="/movies"
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
        </Suspense>
      </Container>
    </>
  );
};
