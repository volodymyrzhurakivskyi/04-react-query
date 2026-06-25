import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'modern-normalize';
import App from './components/App/App';
import './index.css';

// Створюємо клієнт для керування кешем та запитами
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // вимикаємо зайві запити при зміні вкладок браузера
      retry: 1,                    // якщо запит впаде, спробувати ще 1 раз перед помилкою
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);