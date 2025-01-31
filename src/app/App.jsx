import { useEffect, useState, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import router from "./routes";
import { setUser } from "../features/user/userSlice";

const google = window.google;

function App() {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCallbackResponse = useCallback(
    (response) => {
      const decoded = jwtDecode(response.credential);
      dispatch(setUser(decoded));
      setIsLoggedIn(true);
    },
    [dispatch]
  );

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("sign-in-button"), {
      theme: "outline",
      size: "large",
    });
  }, [handleCallbackResponse]);

  return (
    <>
      {isLoggedIn ? (
        <RouterProvider router={router} />
      ) : (
        <div
          id="sign-in-button"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        />
      )}
    </>
  );
}

export default App;
