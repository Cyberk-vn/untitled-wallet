import { Titan, TitanSignOptions } from "./wallet";
import { OfflineAminoSigner, OfflineDirectSigner } from "./cosmjs";
import { SecretUtils } from "./secretjs";

export interface Window {
  titan?: Titan;
  getOfflineSigner?: (
    chainId: string,
    signOptions?: TitanSignOptions
  ) => OfflineAminoSigner & OfflineDirectSigner;
  getOfflineSignerOnlyAmino?: (
    chainId: string,
    signOptions?: TitanSignOptions
  ) => OfflineAminoSigner;
  getOfflineSignerAuto?: (
    chainId: string,
    signOptions?: TitanSignOptions
  ) => Promise<OfflineAminoSigner | OfflineDirectSigner>;
  getEnigmaUtils?: (chainId: string) => SecretUtils;
}
