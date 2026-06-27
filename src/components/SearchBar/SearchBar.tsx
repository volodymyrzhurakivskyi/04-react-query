import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  
  // 1. Функція обробника тепер приймає безпосередньо об'єкт FormData
  const handleSearchAction = (formData: FormData) => {
    // 2. Отримуємо значення інпуту за його атрибутом name
    const query = formData.get('movieQuery')?.toString().trim();

    // 3. Замість сивого alert використовуємо красивий toast.error
    if (!query) {
      toast.error('Будь ласка, введіть текст для пошуку! 🎬');
      return;
    }

    // 4. Передаємо валідне значення в App.tsx
    onSubmit(query);
  };

  return (
    <header className={css.searchHeader}>
      {/* 5. Замість onSubmit використовуємо атрибут action */}
      <form action={handleSearchAction} className={css.searchForm}>
        <input
          type="text"
          // 6. ОБОВ'ЯЗКОВО: додаємо атрибут name, щоб FormData могла зчитати текст
          name="movieQuery" 
          autoComplete="off"
          autoFocus
          placeholder="Шукати фільми..."
          className={css.searchInput}
          // Прибираємо value та onChange, вони більше не потрібні!
        />
        <button type="submit" className={css.searchButton}>
          Пошук
        </button>
      </form>
    </header>
  );
}