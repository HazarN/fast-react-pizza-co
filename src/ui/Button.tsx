import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;

  type: 'primary' | 'small' | 'secondary';
  disabled?: boolean;
  to?: string;
};
function Button({ children, disabled, to, type }: Props) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: `${base} px-4 py-3 sm:px-6 sm:py-4`,
    small: `${base} text-xs px-3 py-2 sm:px-4 sm:py-2.5`,

    secondary: `inline-block text-sm rounded-full border-2 border-stone-300 text-stone-400 hover:text-stone-800 hover:border-stone-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-200 focus:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 sm:px-6 sm:py-4`,
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
