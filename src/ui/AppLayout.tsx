import { Outlet, useNavigation } from 'react-router-dom';

import CartOverview from '@features/cart/CartOverview';

import Header from '@ui/Header';
import Loader from '@ui/Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <Loader />}

      <Header />

      <div className='overflow-scroll'>
        <main>
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
