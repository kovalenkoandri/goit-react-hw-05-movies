import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails } from 'components/services/api';
const NO_POSTER = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjBqfRNytcTv3gLsDnnoDKhEyqSS9D-TVsA&usqp=CAU`;
const CardTemplate = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
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
    getMovieDetailsHttp(id);
  }, [id]);
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
    genres ? genres.reduce((ac, { name }) => (ac += `${name} `), '') : 'no genres';
  return (
    <main>
      <img src={poster} alt={title} />
      <p>{userTitle()}</p>
      <p>User score: {userScore()}</p>
      <p>Overview: {userOverview()}</p>
      <p>Genres: {userGenres()}</p>
    </main>
  );
};
export default CardTemplate;
