import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Cart from '@features/cart/Cart';
import Menu, { loader as menuLoader } from '@features/menu/Menu';
import CreateOrder from '@features/order/CreateOrder';
import Order from '@features/order/Order';

import AppLayout from '@ui/AppLayout';
import Error from '@ui/Error';
import Home from '@ui/Home';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu />, loader: menuLoader },
      { path: '/cart', element: <Cart /> },
      { path: 'order/new', element: <CreateOrder /> },
      { path: 'order/:orderId', element: <Order /> },

      // Any other path will render the Error component
      { path: '*', element: <Error /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
