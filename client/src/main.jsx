import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import  AuthProvider  from "./context/authContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      {/* <AuthProvider> */}
        <App />
    </HelmetProvider>
  </StrictMode>
);
