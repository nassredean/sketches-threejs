import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import PostEffect from "./object3d/PostEffect";

import "./App.css";

function Page({ children }) {
  return <div className="page">{children}</div>;
}

function App() {
  return (
    <Page>
      <ul>
        <li>
          <Link to="/sketch-1">sketch-1</Link>
        </li>
      </ul>
    </Page>
  );
}

export default App;
