import { ChainGetter, HasMapStore } from "@titan-wallet/stores";
import { EthereumAccountBase } from "./base";
import { Titan } from "@titan-wallet/types";

export class EthereumAccountStore extends HasMapStore<EthereumAccountBase> {
  constructor(
    protected readonly chainGetter: ChainGetter,
    protected readonly getTitan: () => Promise<Titan | undefined>
  ) {
    super((chainId: string) => {
      return new EthereumAccountBase(chainGetter, chainId, getTitan);
    });
  }

  getAccount(chainId: string): EthereumAccountBase {
    // chain identifier를 통한 접근도 허용하기 위해서 chainGetter를 통해 접근하도록 함.
    return this.get(this.chainGetter.getChain(chainId).chainId);
  }
}
