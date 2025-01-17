import { InjectedTitan } from "@titan-wallet/provider";
import { injectTitanToWindow } from "@titan-wallet/provider";
import { RpcProvider, WalletAccount } from "starknet";

import manifest from "../../manifest.v2.json";

const titan = new InjectedTitan(
  manifest.version,
  "extension",
  (state) => {
    // XXX: RpcProvider와 Account를 starknetjs에서 바로 가져와서 씀으로 인해서
    //      injected script의 크기가 커지는 문제가 있다.
    //      일단 webpack의 tree shaking 덕분에 아직은 어느정도 허용할만한 수준의 용량이다.
    //      이 코드에 의한 용량 문제에 대해서 고려해서 개발해야한다.
    if (state.rpc) {
      if (!titan.starknet.provider) {
        titan.starknet.provider = new RpcProvider({
          nodeUrl: state.rpc,
        });
      } else {
        titan.starknet.provider.channel.nodeUrl = state.rpc;
      }
    }

    if (titan.starknet.provider) {
      if (state.selectedAddress) {
        if (!titan.starknet.account) {
          titan.starknet.account = new WalletAccount(
            titan.starknet.provider,
            titan.generateStarknetProvider()
          );
          titan.starknet.account.address = state.selectedAddress;
        } else {
          titan.starknet.account.address = state.selectedAddress;
        }
      } else {
        titan.starknet.account = undefined;
      }
    } else {
      titan.starknet.account = undefined;
    }
  },
  (state) => {
    if (state.selectedAddress) {
      if (titan.starknet.account) {
        titan.starknet.account.address = state.selectedAddress;
      }
    }
  },
  {
    addMessageListener: (fn: (e: any) => void) =>
      window.addEventListener("message", fn),
    removeMessageListener: (fn: (e: any) => void) =>
      window.removeEventListener("message", fn),
    postMessage: (message) =>
      window.postMessage(message, window.location.origin),
  },
  undefined,
  {
    uuid: crypto.randomUUID(),
    name: process.env.TITAN_EXT_EIP6963_PROVIDER_INFO_NAME,
    icon: process.env.TITAN_EXT_EIP6963_PROVIDER_INFO_ICON,
    rdns: process.env.TITAN_EXT_EIP6963_PROVIDER_INFO_RDNS,
  },
  {
    id: "titan",
    name: "Titan",
    icon: process.env.TITAN_EXT_STARKNET_PROVIDER_INFO_ICON,
  }
);
injectTitanToWindow(titan);

window.addEventListener("beforeunload", () => {
  titan.__core__webpageClosed();
});
