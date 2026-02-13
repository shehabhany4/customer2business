import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { AuthProvider } from "./context/AuthContext";

import { ProjectsProvider } from "./context/ProjectsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
  </React.StrictMode>
);

