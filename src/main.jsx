import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { Provider } from "react-redux";
import store from "./app/store.js";

import App from "./app/App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": { padding: 0, margin: 0, maxWidth: "none", width: "100vw" },
        }}
      />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
