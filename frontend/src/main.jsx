import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Notification from "./utility/Notification.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { HelmetProvider } from 'react-helmet-async';

// boilerplate code for react-helmet-async
const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
    <AuthContextProvider>
      <App />
      <Notification />
    </AuthContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);
