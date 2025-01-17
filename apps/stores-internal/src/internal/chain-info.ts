import { IChainStore } from "@titan-wallet/stores";
import { ChainInfo } from "@titan-wallet/types";

export interface InternalChainStore<C extends ChainInfo = ChainInfo>
  extends IChainStore<C> {
  isInChainInfosInListUI(chainId: string): boolean;
}
