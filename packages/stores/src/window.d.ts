import { Window as TitanWindow } from "@titan-wallet/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends TitanWindow {}
}
