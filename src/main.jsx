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
import { StyleSheetManager } from "styled-components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyleSheetManager>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <App />
            <GlobalStyle />
            <ToastContainer />
          </Provider>
        </PersistGate>
      </BrowserRouter>
    </StyleSheetManager>
  </React.StrictMode>
);
