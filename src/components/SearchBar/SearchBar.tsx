import { useState, type FormEvent } from 'react';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Будь ласка, введіть текст для пошуку!');
      return;
    }
    onSubmit(value); // Передаємо значення в App.tsx
  };

  return (
    <header className={css.searchHeader}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Шукати фільми..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Пошук
        </button>
      </form>
    </header>
  );
}