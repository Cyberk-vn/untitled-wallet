import { ChainGetter, HasMapStore } from "@titan-wallet/stores";
import { StarknetAccountBase } from "./base";
import { Titan } from "@titan-wallet/types";

export class StarknetAccountStore extends HasMapStore<StarknetAccountBase> {
  constructor(
    protected readonly chainGetter: ChainGetter,
    protected readonly getTitan: () => Promise<Titan | undefined>
  ) {
    super((chainId: string) => {
      return new StarknetAccountBase(chainGetter, chainId, getTitan);
    });
  }

  getAccount(chainId: string): StarknetAccountBase {
    const modularChainInfo = this.chainGetter.getModularChain(chainId);
    if (!("starknet" in modularChainInfo)) {
      throw new Error(`${chainId} is not starknet chain`);
    }
    return this.get(modularChainInfo.chainId);
  }
}
