import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Sketch1 from "./Sketch1";

import "./reset.css";
import "./index.css";
import "./fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sketch-1" element={<Sketch1 />} />
    </Routes>
  </BrowserRouter>
);
