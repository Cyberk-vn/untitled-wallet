import {
  Titan,
  OfflineDirectSigner,
  OfflineAminoSigner,
  AccountData,
  AminoSignResponse,
  StdSignDoc,
  DirectSignResponse,
  SignDoc,
  TitanSignOptions,
} from "@titan-wallet/types";

export class CosmJSOfflineSignerOnlyAmino implements OfflineAminoSigner {
  constructor(
    protected readonly chainId: string,
    protected readonly titan: Titan,
    protected readonly signOptions?: TitanSignOptions
  ) {}

  async getAccounts(): Promise<AccountData[]> {
    const key = await this.titan.getKey(this.chainId);

    return [
      {
        address: key.bech32Address,
        // Currently, only secp256k1 is supported.
        algo: "secp256k1",
        pubkey: key.pubKey,
      },
    ];
  }

  async signAmino(
    signerAddress: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse> {
    if (this.chainId !== signDoc.chain_id) {
      throw new Error("Unmatched chain id with the offline signer");
    }

    const key = await this.titan.getKey(signDoc.chain_id);

    if (key.bech32Address !== signerAddress) {
      throw new Error("Unknown signer address");
    }

    return await this.titan.signAmino(
      this.chainId,
      signerAddress,
      signDoc,
      this.signOptions
    );
  }

  // Fallback function for the legacy cosmjs implementation before the stargate.
  async sign(
    signerAddress: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse> {
    return await this.signAmino(signerAddress, signDoc);
  }
}

export class CosmJSOfflineSigner
  extends CosmJSOfflineSignerOnlyAmino
  implements OfflineAminoSigner, OfflineDirectSigner
{
  constructor(chainId: string, titan: Titan, signOptions?: TitanSignOptions) {
    super(chainId, titan, signOptions);
  }

  async signDirect(
    signerAddress: string,
    signDoc: SignDoc
  ): Promise<DirectSignResponse> {
    if (this.chainId !== signDoc.chainId) {
      throw new Error("Unmatched chain id with the offline signer");
    }

    const key = await this.titan.getKey(signDoc.chainId);

    if (key.bech32Address !== signerAddress) {
      throw new Error("Unknown signer address");
    }

    return await this.titan.signDirect(
      this.chainId,
      signerAddress,
      signDoc,
      this.signOptions
    );
  }
}
