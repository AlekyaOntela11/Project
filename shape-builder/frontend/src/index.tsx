import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

// root.render(
//   <h1>Test App Working</h1>
// );