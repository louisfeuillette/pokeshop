import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Header from "../components/Header";
import Bottom from "../components/Bottom";

const HeaderLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {pathname !== "/cart" && <Bottom />}
    </>
  );
};

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
