import Username from '@app/features/user/Username';
import SearchOrder from '@features/order/SearchOrder';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='flex items-center justify-between bg-yellow-500 uppercase px-4 py-3 border-b-2 border-stone-200 sm:px-6 font-semibold'>
      <Link to='/' className='tracking-widest text-xl'>
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
