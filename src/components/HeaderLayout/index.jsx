import { useLocation, Outlet } from "react-router-dom";

import Header from "../Header";
import Bottom from "../Bottom";

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

export default HeaderLayout;
