import CartOverview from '@features/cart/CartOverview';

import Header from '@ui/Header';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
