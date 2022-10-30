import { useParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from 'components/services/api';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  CardTemplate,
  Img,
  Ul,
  Li,
  H2,
  H3,
  H4,
  UlAdditional,
  LiAdditional,
} from './MovieDetails.styled';
const NO_POSTER = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjBqfRNytcTv3gLsDnnoDKhEyqSS9D-TVsA&usqp=CAU`;
const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const { movieId } = useParams();
  useEffect(() => {
    const getMovieDetailsHttp = async input => {
      try {
        const response = await getMovieDetails(input).then(responseHttp => {
          return responseHttp.data;
        });
        setDetails({ ...response });
      } catch (error) {
        console.error(error);
      }
    };
    getMovieDetailsHttp(movieId);
  }, [movieId]);
  const { poster_path, title, popularity, overview, genres } = details;
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : NO_POSTER;
  const userTitle = () => (title ? title : 'no title');
  const userScore = () =>
    Math.round(popularity) ? `${Math.round(popularity)}%` : 'no score';
  const userOverview = () => (overview ? overview : 'no overview');
  const userGenres = () =>
    genres
      ? genres.reduce((ac, { name }) => (ac += `${name} `), '')
      : 'no genres';
  const location = useLocation();
  return (
    <>
      <Link
        to={location.state?.from.pathname + location.state?.from.search || '/'}
      >
        ᐸ go Back ᐸ
      </Link>
      <CardTemplate>
        <Img src={poster} alt={title} />
        <Ul>
          <Li>
            <H2>{userTitle()}</H2>
          </Li>
          <Li>
            <p>User score: {userScore()}</p>
          </Li>
          <Li>
            <H3>Overview</H3>
            <p>{userOverview()}</p>
          </Li>
          <Li>
            <H4>Genres</H4>
            <p>{userGenres()}</p>
          </Li>
        </Ul>
      </CardTemplate>
      <UlAdditional>
        Additional information
        <LiAdditional>
          <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
        </LiAdditional>
        <LiAdditional>
          <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
        </LiAdditional>
      </UlAdditional>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
