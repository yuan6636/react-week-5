import { createHashRouter } from "react-router";
import FrontendLayout from "./assets/Front/layout/FrontendLayout";
import Home from "./assets/Front/pages/Home";
import Products from "./assets/Front/pages/Products";
import SingleProduct from "./assets/Front/pages/SingleProduct";
import Cart from "./assets/Front/pages/Cart";
import NotFound from "./assets/Front/pages/NotFound";

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