import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Sketch1 from "./sketches/1";
import Sketch2 from "./sketches/2";

import "./reset.css";
import "./index.css";
import "./fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sketch-1" element={<Sketch1 />} />
      <Route path="sketch-2" element={<Sketch2 />} />
    </Routes>
  </BrowserRouter>
);
