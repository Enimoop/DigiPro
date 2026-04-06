import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TourProvider } from "@reactour/tour";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import "./index.css";
import "./styles/dashkit/theme.scss";
import { ModulesProvider } from "./contexts/ModulesProvider";

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
            <TourProvider
              steps={[]}
              disableInteraction={true}
              disableKeyboardNavigation={true as any}
              onClickMask={() => { }}
              styles={{
                popover: (base) => ({
                  ...base,
                  background: "#7C3AED",
                  color: "white",
                  borderRadius: 18,
                  padding: 22,
                  fontSize: "17px",
                }),
                badge: (base) => ({
                  ...base,
                  background: "white",
                  color: "#7C3AED",
                  fontWeight: 700,
                }),
              }}
            >
              <App />
            </TourProvider>
          </SettingsProvider>
        </AuthProvider>
      </ModulesProvider>
    </BrowserRouter>
  </React.StrictMode>
);