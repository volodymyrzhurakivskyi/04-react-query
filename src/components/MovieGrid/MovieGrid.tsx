import { type Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void; // Проп для майбутнього відкриття модалки
}

export default function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li 
          key={movie.id} 
          className={css.card} 
          onClick={() => onMovieClick(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `${BASE_IMG_URL}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className={css.poster}
          />
          <div className={css.info}>
            <h3 className={css.title}>{movie.title}</h3>
            <p className={css.date}>{movie.release_date || 'Дата невідома'}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}