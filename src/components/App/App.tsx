import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast'; // Импортуємо тости та Toaster

// Імпорт та типізація react-paginate для Vite
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import type { Movie } from '../../types/movie';

// Імпорт сервісу запитів та компонентів
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal'; // Імпортуємо модалку
import Loader from '../Loader/Loader'; // Обов'язковий компонент замість <p>
import ErrorMessage from '../ErrorMessage/ErrorMessage'; // Обов'язковий компонент замість <p>
import css from './App.module.css';

// Трюк для коректного імпорту за замовчуванням у деяких версіях Vite з ESM
type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  
  // 1. Стейт для поточно вибраного фільму (для модалки)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Використання TanStack Query для запиту фільмів
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '',
    placeholderData: (previousData) => previousData,
  });

  // 2. Ефект для виклику тосту, коли запит успішний, але масив фільмів пустий
  useEffect(() => {
    if (data && data.results.length === 0 && !isFetching) {
      toast.success('Запит успішний, але фільмів не знайдено 🔍');
    }
  }, [data, isFetching]);

  // Обробник відправки форми пошуку
  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); 
  };

  // 3. Обробники для встановлення та очищення вибраного фільму
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.container}>
      {/* 4. Обов'язково рендеримо Toaster для відображення сповіщень */}
      <Toaster position="top-right" reverseOrder={false} />

      <h1>04-react-query Фільми 🎬</h1>
      
      <SearchBar onSubmit={handleSearchSubmit} />

      {/* 5. Замінюємо прості <p> на обов'язкові компоненти Loader та ErrorMessage */}
      {isLoading && !data && <Loader />}
      {isError && <ErrorMessage message={(error as Error).message} />}

      {/* Індикатор фонового оновлення сторінок */}
      {isFetching && data && <div className={css.loaderMini}>Оновлення даних...</div>}

      {/* Список фільмів з оновленим пропом onSelect */}
      {data?.results && data.results.length > 0 && (
        <MovieGrid 
          movies={data.results} 
          onSelect={handleSelectMovie} // Передаємо наш обробник замість console.log
        />
      )}

      {/* Рендер пагінації */}
      {totalPages > 1 && (
        <div className={css.paginationContainer}>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
            nextLabel="→"
            previousLabel="←"
          />
        </div>
      )}

      {/* 6. Логіка для відображення та закриття модального вікна */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}