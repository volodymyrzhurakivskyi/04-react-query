export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
}