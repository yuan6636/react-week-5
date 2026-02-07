import { createHashRouter } from "react-router";
import FrontendLayout from "./Front/layout/FrontendLayout";
import Home from "./Front/pages/Home";
import Products from "./Front/pages/Products";
import SingleProduct from "./Front/pages/SingleProduct";
import Cart from "./Front/pages/Cart";
import NotFound from "./Front/pages/NotFound";

export const router = createHashRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/product/:id',
        element: <SingleProduct />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);