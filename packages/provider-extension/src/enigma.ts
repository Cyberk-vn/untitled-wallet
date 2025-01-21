import { Titan, SecretUtils } from "@titan-wallet/types";

/**
 * TitanEnigmaUtils duplicates the public methods that are supported on secretjs's EnigmaUtils class.
 */
export class TitanEnigmaUtils implements SecretUtils {
  constructor(
    protected readonly chainId: string,
    protected readonly titan: Titan
  ) {}

  async getPubkey(): Promise<Uint8Array> {
    return await this.titan.getEnigmaPubKey(this.chainId);
  }

  async getTxEncryptionKey(nonce: Uint8Array): Promise<Uint8Array> {
    return await this.titan.getEnigmaTxEncryptionKey(this.chainId, nonce);
  }

  async encrypt(
    contractCodeHash: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    msg: object
  ): Promise<Uint8Array> {
    return await this.titan.enigmaEncrypt(this.chainId, contractCodeHash, msg);
  }

  async decrypt(
    ciphertext: Uint8Array,
    nonce: Uint8Array
  ): Promise<Uint8Array> {
    return await this.titan.enigmaDecrypt(this.chainId, ciphertext, nonce);
  }
}
