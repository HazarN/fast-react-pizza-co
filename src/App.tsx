import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// React Router functions

import { loader as menuLoader } from '@features/menu/Menu';
import { action as createOrderAction } from '@features/order/CreateOrder';
import { loader as orderLoader } from '@features/order/Order';
import { action as updateOrderAction } from '@features/order/UpdateOrderPriority';
import Loader from './ui/Loader';

// Lazy loading to improve the bundle size

const Menu = lazy(() => import('@features/menu/Menu'));
const Cart = lazy(() => import('@features/cart/Cart'));
const CreateOrder = lazy(() => import('@features/order/CreateOrder'));
const Order = lazy(() => import('@features/order/Order'));

const AppLayout = lazy(() => import('@ui/AppLayout'));
const Error = lazy(() => import('@ui/Error'));
const Home = lazy(() => import('@ui/Home'));

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: 'order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: 'order/:orderId',
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
]);

const App = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
