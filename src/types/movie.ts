export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number; // Кількість сторінок, яку вимагає ТЗ для пагінації
  total_results: number;
}