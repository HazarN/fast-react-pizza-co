import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const input = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery('');
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'enter':
          input.current?.focus();
          break;
        case 'escape':
          input.current?.blur();
          break;
        default:
          return;
      }
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Search order #'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={input}
        className='w-36 rounded-full bg-yellow-100 px-4 py-2 text-xs transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72 sm:text-sm'
      />
    </form>
  );
}

export default SearchOrder;
