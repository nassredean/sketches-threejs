import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Page from "./shared/components/Page";

import "./App.css";

function App() {
  return (
    <Page>
      <ul>
        <li>
          <Link to="/sketch-1">sketch-1</Link>
        </li>
        <li>
          <Link to="/sketch-2">sketch-2</Link>
        </li>
      </ul>
    </Page>
  );
}

export default App;
