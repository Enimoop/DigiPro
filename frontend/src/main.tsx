import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { SettingsProvider } from "./settings/SettingsContext";
import "./index.css";
import "./styles/dashkit/theme.scss";
import { ModulesProvider } from "./modules/ModulesProvider";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModulesProvider>
        <AuthProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </AuthProvider>
      </ModulesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
