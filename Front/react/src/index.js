// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./context/user.context";

ReactDOM.render(
  <BrowserRouter>
      <AuthProvider>
              <App />
      </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
