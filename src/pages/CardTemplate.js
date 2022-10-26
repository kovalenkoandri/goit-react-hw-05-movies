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
  const { poster_path, title } = details;
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : NO_POSTER;
  return (
    <main>
      <p>{title}</p>
      <p>{id}</p>
      <img src={poster} alt={title} />
    </main>
  );
};
export default CardTemplate;
