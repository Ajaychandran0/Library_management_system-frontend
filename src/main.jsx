import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserApp from "./UserApp";
import AdminApp from "./AdminApp";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/index.css";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<UserApp />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
