import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "modern-normalize/modern-normalize.css";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./css/index.js";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter >
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <App />
          <GlobalStyle />
          <ToastContainer />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>
);
