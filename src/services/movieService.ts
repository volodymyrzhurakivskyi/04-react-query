import axios from 'axios';
import type { Movie } from '../types/movie'; // Залишаємо імпорт лише для поодинокого фільму

// 1. Переносимо інтерфейс відповіді API сюди, як вимагає ментор
export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const fetchMovies = async (query: string, page: number): Promise<TMDBResponse> => {
  const response = await api.get<TMDBResponse>('/search/movie', {
    params: {
      api_key: 'e932e66ee5819c11bae66b66cde73bfb',
      query,
      page,
      include_adult: false,
      language: 'uk-UA',
    },
  });
  return response.data;
};