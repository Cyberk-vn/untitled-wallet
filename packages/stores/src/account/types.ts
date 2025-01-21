import { Any } from "@titan-wallet/proto-types/google/protobuf/any";
import { Dec } from "@titan-wallet/unit";
import {
  BroadcastMode,
  Titan,
  TitanSignOptions,
  Msg,
  StdFee,
} from "@titan-wallet/types";

export type ProtoMsgsOrWithAminoMsgs = {
  aminoMsgs?: Msg[];
  protoMsgs: Any[];

  // Add rlp types data if you need to support ethermint with ledger.
  // Must include `MsgValue`.
  rlpTypes?: Record<
    string,
    Array<{
      name: string;
      type: string;
    }>
  >;
};

export interface TitanSignOptionsWithAltSignMethods extends TitanSignOptions {
  readonly signAmino?: Titan["signAmino"];
  readonly signDirect?: Titan["signDirect"];
  readonly experimentalSignEIP712CosmosTx_v0?: Titan["experimentalSignEIP712CosmosTx_v0"];
  readonly sendTx?: (
    chainId: string,
    tx: Uint8Array,
    mode: BroadcastMode
  ) => Promise<Uint8Array>;
}

export interface MakeTxResponse {
  ui: {
    type(): string;
    overrideType(type: string): void;
  };
  msgs(): Promise<ProtoMsgsOrWithAminoMsgs>;
  simulate(
    fee?: Partial<Omit<StdFee, "gas">>,
    memo?: string
  ): Promise<{
    gasUsed: number;
  }>;
  simulateAndSend(
    feeOptions: {
      gasAdjustment: number;
      gasPrice?: {
        denom: string;
        amount: Dec;
      };
    },
    memo?: string,
    signOptions?: TitanSignOptionsWithAltSignMethods,
    onTxEvents?:
      | ((tx: any) => void)
      | {
          onBroadcasted?: (txHash: Uint8Array) => void;
          onFulfill?: (tx: any) => void;
        }
  ): Promise<void>;
  send(
    fee: StdFee,
    memo?: string,
    signOptions?: TitanSignOptionsWithAltSignMethods,
    onTxEvents?:
      | ((tx: any) => void)
      | {
          onBroadcasted?: (txHash: Uint8Array) => void;
          onFulfill?: (tx: any) => void;
        }
  ): Promise<void>;
  sendWithGasPrice(
    gasInfo: {
      gas: number;
      gasPrice?: {
        denom: string;
        amount: Dec;
      };
    },
    memo?: string,
    signOptions?: TitanSignOptionsWithAltSignMethods,
    onTxEvents?:
      | ((tx: any) => void)
      | {
          onBroadcasted?: (txHash: Uint8Array) => void;
          onFulfill?: (tx: any) => void;
        }
  ): Promise<void>;
}
