import axios from 'axios';
import { type TMDBResponse } from '../types/movie';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const fetchMovies = async (query: string, page: number): Promise<TMDBResponse> => {
  const response = await api.get<TMDBResponse>('/search/movie', {
    params: {
      api_key: 'e932e66ee5819c11bae66b66cde73bfb', // Твій робочий ключ
      query,
      page,
      include_adult: false,
      language: 'uk-UA',
    },
  });
  return response.data;
};