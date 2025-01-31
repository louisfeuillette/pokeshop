import { createBrowserRouter } from "react-router-dom";

import HeaderLayout from "../components/HeaderLayout";
import Home from "../screens/Home";
import Cart from "../screens/Cart";

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
