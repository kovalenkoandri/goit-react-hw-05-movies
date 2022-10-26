import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails } from 'components/services/api';
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
  return (
    <main>
      <p>{title}</p>
      <p>{id}</p>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
    </main>
  );
};
export default CardTemplate;
