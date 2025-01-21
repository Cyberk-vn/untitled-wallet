import {
  ChainGetter,
  CosmosAccount,
  CosmwasmAccount,
  IAccountStoreWithInjects,
  IQueriesStore,
} from "@titan-wallet/stores";
import {
  useFeeConfig,
  useGasConfig,
  useMemoConfig,
  useSenderConfig,
} from "@titan-wallet/hooks";
import { useIBCSwapAmountConfig } from "./amount";
import { SkipQueries } from "@titan-wallet/stores-internal";
import { AppCurrency } from "@titan-wallet/types";
import { EthereumAccountStore } from "@titan-wallet/stores-eth";

export const useIBCSwapConfig = (
  chainGetter: ChainGetter,
  queriesStore: IQueriesStore,
  accountStore: IAccountStoreWithInjects<[CosmosAccount, CosmwasmAccount]>,
  ethereumAccountStore: EthereumAccountStore,
  skipQueries: SkipQueries,
  chainId: string,
  sender: string,
  initialGas: number,
  outChainId: string,
  outCurrency: AppCurrency,
  swapFeeBps: number
) => {
  const senderConfig = useSenderConfig(chainGetter, chainId, sender);
  const amountConfig = useIBCSwapAmountConfig(
    chainGetter,
    queriesStore,
    accountStore,
    ethereumAccountStore,
    skipQueries,
    chainId,
    senderConfig,
    outChainId,
    outCurrency,
    swapFeeBps
  );

  const memoConfig = useMemoConfig(chainGetter, chainId);
  const gasConfig = useGasConfig(chainGetter, chainId, initialGas);
  const feeConfig = useFeeConfig(
    chainGetter,
    queriesStore,
    chainId,
    senderConfig,
    amountConfig,
    gasConfig
  );

  amountConfig.setFeeConfig(feeConfig);

  return {
    amountConfig,
    memoConfig,
    gasConfig,
    feeConfig,
    senderConfig,
  };
};
