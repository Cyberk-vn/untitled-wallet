// Shim ------------
require("setimmediate");
// Shim ------------

import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./stores";
import { GlobalStyle, ScrollBarStyle } from "./styles";
import { Titan } from "@titan-wallet/provider";
import manifest from "./manifest.v2.json";
import { InExtensionMessageRequester } from "@titan-wallet/router-extension";
import { configure } from "mobx";
import { ModalRootProvider } from "./components/modal";
import { ConfirmProvider } from "./hooks/confirm";
import { RegisterPage } from "./pages/register";
import { WelcomePage } from "./pages/register/pages/welcome";
import { AppIntlProvider } from "./languages";
import { observer } from "mobx-react-lite";
import { useLoadFonts } from "./use-load-fonts";
import { useAutoLockMonitoring } from "./use-auto-lock-monitoring";
import "simplebar-react/dist/simplebar.min.css";
import { AppThemeProvider } from "./theme";
import { RoutePageAnalytics } from "./route-page-analytics";

configure({
  enforceActions: "always", // Make mobx to strict mode.
});

window.titan = new Titan(
  manifest.version,
  "core",
  new InExtensionMessageRequester()
);

const AutoLockMonitor: FunctionComponent = observer(() => {
  useAutoLockMonitoring();

  return null;
});

const AppRouter: FunctionComponent = () => {
  useLoadFonts();

  return (
    <div
      style={{
        backgroundImage: `url(${require("./public/assets/img/register/register-main-bg.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HashRouter>
        <RoutePageAnalytics prefix="/register" />
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

const App: FunctionComponent = () => {
  return (
    <StoreProvider>
      <AppThemeProvider>
        <AppIntlProvider>
          <ModalRootProvider>
            <ConfirmProvider>
              <GlobalStyle />
              <ScrollBarStyle />
              <AutoLockMonitor />
              <AppRouter />
            </ConfirmProvider>
          </ModalRootProvider>
        </AppIntlProvider>
      </AppThemeProvider>
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
