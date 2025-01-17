import { AminoSignResponse, StdSignDoc } from "@titan-wallet/types";

export interface TitanCoreTypes {
  __core__getAnalyticsId(): Promise<string>;
  __core__privilageSignAminoWithdrawRewards(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse>;
  __core__privilageSignAminoDelegate(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse>;

  __core__webpageClosed(): Promise<void>;
}
