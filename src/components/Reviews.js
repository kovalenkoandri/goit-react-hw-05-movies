import { getMovieReviews } from 'components/services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
export const Reviews = () => {
  const [reviewed, setReviewed] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getMovieReviewsHttp = async input => {
      try {
        const response = await getMovieReviews(input).then(responseHttp => {
          return responseHttp.data.results.filter((_, idx) => idx < 3);
        });
        setReviewed([...response]);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieReviewsHttp(movieId);
  }, [movieId]);
  console.log(reviewed);
  return (
    <section>
      {reviewed.length > 0
        ? reviewed.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </li>
            );
          })
        : 'no reviews found'}
      
    </section>
  );
};
