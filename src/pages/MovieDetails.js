import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails } from 'components/services/api';
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
export const MovieDetails = () => {
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
  console.log(details);
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
  return (
    <>
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
        <LiAdditional></LiAdditional>
        <LiAdditional></LiAdditional>
      </UlAdditional>
    </>
  );
};
