// Shim ------------
require("setimmediate");
// Shim ------------

// Make sure that icon file will be included in bundle
require("./public/assets/logo-256.png");
require("./public/assets/icon/icon-16.png");
require("./public/assets/icon/icon-48.png");
require("./public/assets/icon/icon-128.png");
require("./public/assets/logo-beta-256.png");
require("./public/assets/icon/icon-beta-16.png");
require("./public/assets/icon/icon-beta-48.png");
require("./public/assets/icon/icon-beta-128.png");
require("./public/assets/svg/megaphone.svg");
require("./public/assets/img/locked-titan-logo-128.png");
require("./public/assets/icon-click-cursor.png");

import React, { FunctionComponent, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { StoreProvider, useStore } from "./stores";
import {
  GlobalPopupStyle,
  GlobalSidePanelStyle,
  GlobalStyle,
  ScrollBarStyle,
} from "./styles";
import { configure } from "mobx";
import { observer } from "mobx-react-lite";
import { Titan } from "@titan-wallet/provider";
import { InExtensionMessageRequester } from "@titan-wallet/router-extension";
import manifest from "./manifest.v2.json";
import { ModalRootProvider } from "./components/modal";
import { ConfirmProvider } from "./hooks/confirm";
import { NotificationProvider } from "./hooks/notification";
import { AppIntlProvider } from "./languages";
import { ErrorBoundary } from "./error-boundary";
import { useMatchPopupSize } from "./popup-size";
import "simplebar-react/dist/simplebar.min.css";
import { AppThemeProvider } from "./theme";
import { isRunningInSidePanel } from "./utils";
import { UntitledMainPage } from "./pages/untitled-main";
import { useAutoLockMonitoring } from "./use-auto-lock-monitoring";
import { UnlockPage } from "./pages/unlock";
import { ModularChainInfo } from "@titan-wallet/types";

configure({
  enforceActions: "always", // Make mobx to strict mode.
});

window.titan = new Titan(
  manifest.version,
  "core",
  new InExtensionMessageRequester()
);

const RoutesAfterReady: FunctionComponent = observer(() => {
  const { keyRingStore, chainStore, accountStore } = useStore();

  useAutoLockMonitoring();

  const openRegisterOnce = useRef(false);

  const _isReady: boolean = useMemo(() => {
    if (keyRingStore.status === "not-loaded") {
      return false;
    }

    if (keyRingStore.status === "empty") {
      if (!openRegisterOnce.current) {
        openRegisterOnce.current = true;
        browser.tabs
          .create({
            url: "/register.html#",
          })
          .then(() => {
            window.close();
          });
      }

      return false;
    }

    return true;
  }, [keyRingStore.status]);

  const shouldShowLockScreen = keyRingStore.status === "locked";
  const hasBeenReady = useRef(false);

  const isReady: boolean = (() => {
    if (hasBeenReady.current) {
      return true;
    }

    if (!_isReady) {
      return false;
    }

    hasBeenReady.current = true;
    return true;
  })();

  const addresses: {
    modularChainInfo: ModularChainInfo;
    bech32Address?: string;
    ethereumAddress?: string;
    starknetAddress?: string;
  }[] = chainStore.modularChainInfosInUI.map((modularChainInfo) => {
    const accountInfo = accountStore.getAccount(modularChainInfo.chainId);

    const bech32Address = (() => {
      if (!("cosmos" in modularChainInfo)) {
        return undefined;
      }

      if (modularChainInfo.chainId.startsWith("eip155")) {
        return undefined;
      }

      return accountInfo.bech32Address;
    })();
    const ethereumAddress = (() => {
      if (!("cosmos" in modularChainInfo)) {
        return undefined;
      }

      if (modularChainInfo.chainId.startsWith("injective")) {
        return undefined;
      }

      return accountInfo.hasEthereumHexAddress
        ? accountInfo.ethereumHexAddress
        : undefined;
    })();
    const starknetAddress = (() => {
      if (!("starknet" in modularChainInfo)) {
        return undefined;
      }

      return accountInfo.starknetHexAddress;
    })();

    return {
      modularChainInfo,
      bech32Address,
      ethereumAddress,
      starknetAddress,
    };
  });

  return (
    <div>
      <div>{addresses[0].bech32Address}</div>
      {!isReady || shouldShowLockScreen ? <UnlockPage /> : <UntitledMainPage />}
    </div>
  );
});

const App: FunctionComponent = () => {
  useMatchPopupSize();

  return (
    <StoreProvider>
      <AppThemeProvider>
        <AppIntlProvider>
          <ModalRootProvider>
            <ConfirmProvider>
              <NotificationProvider>
                <GlobalStyle />
                {
                  // isRunningInSidePanel()은 반응형이 아니지만 어차피 popup <-> sidePanel은 실행시점에 정해지고
                  // UI가 작동중에 변경될 수 없기 때문에 이렇게 해도 괜찮다.
                  isRunningInSidePanel() ? (
                    <GlobalSidePanelStyle />
                  ) : (
                    <GlobalPopupStyle />
                  )
                }
                <ScrollBarStyle />
                <ErrorBoundary>
                  <RoutesAfterReady />
                </ErrorBoundary>
              </NotificationProvider>
            </ConfirmProvider>
          </ModalRootProvider>
        </AppIntlProvider>
      </AppThemeProvider>
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
