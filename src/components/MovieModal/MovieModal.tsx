import { useEffect } from 'react';
import { type Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Закриття по Esc
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movie, onClose]);

  if (!movie) return null;

  const BACKDROP_URL = 'https://image.tmdb.org/t/p/w780';
  const POSTER_URL = 'https://image.tmdb.org/t/p/w342';

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>

        <div 
          className={css.hero} 
          style={{ 
            backgroundImage: movie.backdrop_path 
              ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${BACKDROP_URL}${movie.backdrop_path})`
              : 'none' 
          }}
        >
          <h2 className={css.title}>{movie.title}</h2>
        </div>

        <div className={css.content}>
          <img
            src={
              movie.poster_path
                ? `${POSTER_URL}${movie.poster_path}`
                : 'https://via.placeholder.com/342x513?text=No+Poster'
            }
            alt={movie.title}
            className={css.modalPoster}
          />
          <div className={css.details}>
            <p className={css.release}>📅 <strong>Реліз:</strong> {movie.release_date || 'Невідомо'}</p>
            <p className={css.rating}>⭐ <strong>Рейтинг:</strong> {movie.vote_average?.toFixed(1) || '0.0'} / 10</p>
            <h4 className={css.overviewTitle}>Опис сюжету:</h4>
            <p className={css.overview}>{movie.overview || 'Опис відсутній для цього фільму.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}