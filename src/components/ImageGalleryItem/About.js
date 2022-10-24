import { getMovieDetails } from 'components/services/api';
import { useEffect } from 'react';

export const About = ({ id }) => {
    useEffect(() => {getMovieDetails(id)});
  return <><p>ggggggggggggggggggggggggggggggggg</p></>;
};
