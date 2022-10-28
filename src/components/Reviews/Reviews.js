import { getMovieReviews } from 'components/services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ListReviews,
  ItemReviews,
  TextReviews,
} from 'components/Reviews/Reviews.styled';
const Reviews = () => {
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
      <ListReviews>
      {reviewed.length > 0
        ? reviewed.map(({ id, author, content }) => {
            return (
              <ItemReviews key={id}>
                <TextReviews>Author: {author}</TextReviews>
                <p>{content}</p>
              </ItemReviews>
            );
          })
        : 'no reviews found'}
      </ListReviews>
    </section>
  );
};

export default Reviews;