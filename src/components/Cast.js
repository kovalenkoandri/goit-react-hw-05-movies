import { getMovieCredits } from 'components/services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
export const Cast = () => {
   const [casted, setCasted] = useState({});
   const { movieId } = useParams();
   useEffect(() => {
     const getMovieCreditsHttp = async input => {
       try {
         const response = await getMovieCredits(input).then(responseHttp => {
           return responseHttp.data;
         });
         setCasted({ ...response });
       } catch (error) {
         console.error(error);
       }
     };
     getMovieCreditsHttp(movieId);
   }, [movieId]);
  console.log(casted);
     const { cast } = casted;
  return (
    <section>
      <ul>
        <li>
          <b>CEO</b> - Gabrijela Vohu Manah
        </li>
        <li>
          <b>Sales</b> - Darius Marianne
        </li>
        <li>
          <b>Product</b> - Ségdae Jean-Pierre
        </li>
        <li>
          <b>Marketing</b> - Melina Theotimos
        </li>
        <li>
          <b>Engineering</b> - Gregor Ramadhani
        </li>
      </ul>
    </section>
  );
};
