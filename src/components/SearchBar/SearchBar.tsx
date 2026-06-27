import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  
  const handleSearchAction = (formData: FormData) => {
    // 1. МІНЯЄМО ТУТ: тепер дістаємо за ключем 'query'
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Будь ласка, введіть текст для пошуку! 🎬');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={css.searchHeader}>
      <form action={handleSearchAction} className={css.searchForm}>
        <input
          type="text"
          // 2. І МІНЯЄМО ТУТ: значення атрибута name тепер строго 'query'
          name="query" 
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