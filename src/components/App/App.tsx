import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Імпорт та типізація react-paginate для Vite
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import type { Movie } from '../../types/movie';

// Імпорт сервісу запитів та компонентів
import { fetchMovies } from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import css from './App.module.css';

// Трюк для коректного імпорту за замовчуванням у деяких версіях Vite з ESM
type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

export default function App() {
  // Стейт для пошукового запиту та поточної сторінки
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // Використання TanStack Query для запиту фільмів
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['movies', query, page], // Запит перезапуститься автоматично при зміні query або page
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '', // Не робимо запит, якщо інпут порожній
    placeholderData: (previousData) => previousData, // Утримуємо старі дані на екрані, поки вантажаться нові
  });

  // Обробник відправки форми пошуку
  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); // При новому пошуку завжди скидаємо сторінку на першу
  };

  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.container}>
      <h1>04-react-query Фільми 🎬</h1>
      
      {/* Компонент форми пошуку */}
      <SearchBar onSubmit={handleSearchSubmit} />

      {/* Повідомлення про стан завантаження або помилки */}
      {isLoading && !data && <p className={css.message}>Завантаження фільмів...</p>}
      {isError && <p className={css.error}>Помилка: {(error as Error).message}</p>}

      {/* Індикатор фонового оновлення (коли сторінка змінюється, але placeholderData ще тримає старі фільми) */}
      {isFetching && data && <div className={css.loaderMini}>Оновлення даних...</div>}

{/* Список фільмів */}
{data?.results && data.results.length > 0 ? (
  <MovieGrid 
    movies={data.results} 
   onMovieClick={(movie: Movie) => console.log('Клікнули на фільм:', movie)}
  />
) : (
  query && !isLoading && <p className={css.message}>Нічого не знайдено за вашим запитом.</p>
)}

      {/* Рендер пагінації, тільки якщо сторінок більше ніж 1 */}
      {totalPages > 1 && (
        <div className={css.paginationContainer}>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)} // react-paginate рахує з 0, а API з 1
            forcePage={page - 1} // Синхронізуємо внутрішній стан пагінації з нашим стейтом
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
            nextLabel="→"
            previousLabel="←"
          />
        </div>
      )}
    </div>
  );
}