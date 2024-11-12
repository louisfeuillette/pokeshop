import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Header from "../components/Header";

const HeaderLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
