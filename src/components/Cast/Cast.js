import { getMovieCredits } from 'components/services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ImgCast, ListCast, ListItemCast, TextCast } from 'components/Cast/Cast.styled';
const Cast = () => {
  const [casted, setCasted] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getMovieCreditsHttp = async input => {
      try {
        const response = await getMovieCredits(input).then(responseHttp => {
          return responseHttp.data.cast.filter((_, idx) => idx < 3);
        });
        setCasted([...response]);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieCreditsHttp(movieId);
  }, [movieId]);
  return (
    <section>
      <ListCast>
        {casted.length > 0
          ? casted.map(({ id, profile_path, name, character }) => {
              return (
                <ListItemCast key={id}>
                  <ImgCast
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                  />
                  <TextCast>{name}</TextCast>
                  <TextCast>{character}</TextCast>
                </ListItemCast>
              );
            })
          : 'no casted actors found'}
      </ListCast>
    </section>
  );
};

export default Cast;