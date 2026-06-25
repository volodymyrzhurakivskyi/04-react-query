interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message = 'Щось пішло не так. Спробуйте пізніше!' }: ErrorMessageProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <p style={{ color: '#e53e3e', fontSize: '16px', fontWeight: '500' }}>
        ❌ Помилка: {message}
      </p>
    </div>
  );
}