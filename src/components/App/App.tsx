import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 1. Імпорт та типізація react-paginate згідно з вимогами ТЗ для Vite 8+
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

import { fetchMovies } from '../../services/api';
import css from './App.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

export default function App() {
  // Стейт для пошукового запиту та поточної сторінки
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // 2. Використання TanStack Query для запиту фільмів
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', query, page], // Ключ залежить від query та page, щоб автоматично перезапускати запит
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '', // Запит не виконується, якщо рядок пошуку порожній
    placeholderData: (previousData) => previousData, // Утримує старі фільми на екрані, поки вантажаться нові
  });

  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.container}>
      <h1>04-react-query Фільми 🎬</h1>
      
      {/* Тимчасова заглушка для перевірки (ми замінимо її на твою форму пошуку) */}
      <button onClick={() => { setQuery('Batman'); setPage(1); }}>
        Шукати "Batman"
      </button>

      {isLoading && <p>Завантаження фільмів...</p>}
      {isError && <p>Помилка: {(error as Error).message}</p>}

      {/* Список фільмів (заглушка для перевірки кількості) */}
      {data && <p>Знайдено фільмів на сторінці: {data.results.length}</p>}

      {/* 3. Рендер пагінації, тільки якщо сторінок більше ніж 1 */}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
}