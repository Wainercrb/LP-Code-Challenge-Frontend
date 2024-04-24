import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { StyledEngineProvider } from "@mui/material/styles";
import AppProvider from "@/redux/provider";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AppProvider>
        <App />
      </AppProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
