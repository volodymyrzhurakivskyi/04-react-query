import axios from 'axios';
import type { Movie } from '../types/movie';

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchMovies = async (query: string, page: number): Promise<TMDBResponse> => {
  const response = await api.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'uk-UA',
    },
  });
  return response.data;
};