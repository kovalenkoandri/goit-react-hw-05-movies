import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'f302710f039c7625cc79ce50e56d4bcc';

export const getTrending = async () =>
  await axios.get(`trending/all/day`, { params: { api_key: API_KEY} });

export const searchMovies = async query =>
  await axios.get(`search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

export const getMovieDetails  = async movie_id =>
  await axios.get(`movie/${movie_id}`, {
    params: { api_key: API_KEY },
  });

export const getMovieCredits = async movie_id =>
  await axios.get(`movie/${movie_id}/credits`, {
    params: { api_key: API_KEY },
  });

export const getMovieReviews = async movie_id =>
  await axios.get(`movie/${movie_id}/reviews`, {
    params: { api_key: API_KEY },
  });


