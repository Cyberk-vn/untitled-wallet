import {
  Titan,
  Key,
  SettledResponse,
  SettledResponses,
} from "@titan-wallet/types";
import { DebounceActionTimer } from "@titan-wallet/mobx-utils";

export class AccountSharedContext {
  protected suggestChainDebounceTimer = new DebounceActionTimer<
    [fn: () => Promise<void>],
    void
  >(0, async (requests) => {
    const responses: SettledResponses<void> = [];
    for (const req of requests) {
      try {
        await req.args[0]();
        responses.push({
          status: "fulfilled",
          value: undefined,
        });
      } catch (e) {
        responses.push({
          status: "rejected",
          reason: e,
        });
      }
    }

    return responses;
  });
  protected enableDebounceTimer = new DebounceActionTimer<
    [chainId: string],
    void
  >(0, async (requests) => {
    const titan = await this.getTitan();

    if (!titan) {
      return requests.map(() => {
        return {
          status: "rejected",
          reason: new Error("Titan is not installed"),
        };
      });
    }

    const chainIdSet = new Set<string>(requests.map((req) => req.args[0]));
    const chainIds = Array.from(chainIdSet);
    try {
      await titan.enable(chainIds);

      return requests.map(() => {
        return {
          status: "fulfilled",
          value: undefined,
        };
      });
    } catch (e) {
      return requests.map(() => {
        return {
          status: "rejected",
          reason: e,
        };
      });
    }
  });
  protected getKeyDebounceTimer = new DebounceActionTimer<
    [chainId: string],
    Key
  >(0, async (requests) => {
    const titan = await this.getTitan();

    if (!titan) {
      return requests.map(() => {
        return {
          status: "rejected",
          reason: new Error("Titan is not installed"),
        };
      });
    }

    const chainIdSet = new Set<string>(requests.map((req) => req.args[0]));
    const chainIds = Array.from(chainIdSet);

    const settled = await titan.getKeysSettled(chainIds);

    const settledMap = new Map<string, SettledResponse<Key>>();
    for (let i = 0; i < chainIds.length; i++) {
      const chainId = chainIds[i];
      const res = settled[i];
      settledMap.set(chainId, res);
    }

    return requests.map((req) => settledMap.get(req.args[0])!);
  });
  protected getKeyMixedDebounceTimer = new DebounceActionTimer<
    [chainId: string, isStarknet: boolean],
    | Key
    | {
        name: string;
        hexAddress: string;
        pubKey: Uint8Array;
        address: Uint8Array;
        isNanoLedger: boolean;
      }
  >(0, async (requests) => {
    const titan = await this.getTitan();

    if (!titan) {
      return requests.map(() => {
        return {
          status: "rejected",
          reason: new Error("Titan is not installed"),
        };
      });
    }

    const cosmosReqs = requests.filter((req) => !req.args[1]);
    const starknetReqs = requests.filter((req) => req.args[1]);
    const cosmosChainIdSet = new Set<string>(
      cosmosReqs.map((req) => req.args[0])
    );
    const cosmosChainIds = Array.from(cosmosChainIdSet);
    const starknetChainIdSet = new Set<string>(
      starknetReqs.map((req) => req.args[0])
    );
    const starknetChainIds = Array.from(starknetChainIdSet);

    const settledMap = new Map<
      string,
      SettledResponse<
        | Key
        | {
            name: string;
            hexAddress: string;
            pubKey: Uint8Array;
            address: Uint8Array;
            isNanoLedger: boolean;
          }
      >
    >();

    if (cosmosChainIds.length > 0) {
      const cosmosSettled = await titan.getKeysSettled(cosmosChainIds);
      for (let i = 0; i < cosmosChainIds.length; i++) {
        const chainId = cosmosChainIds[i];
        const res = cosmosSettled[i];
        settledMap.set(chainId, res);
      }
    }

    if (starknetChainIds.length > 0) {
      const starknetSettled = await titan.getStarknetKeysSettled(
        starknetChainIds
      );
      for (let i = 0; i < starknetChainIds.length; i++) {
        const chainId = starknetChainIds[i];
        const res = starknetSettled[i];
        settledMap.set(chainId, res);
      }
    }

    return requests.map((req) => settledMap.get(req.args[0])!);
  });

  protected promiseGetTitan?: Promise<Titan | undefined>;

  constructor(protected readonly _getTitan: () => Promise<Titan | undefined>) {}

  async getTitan(): Promise<Titan | undefined> {
    if (this.promiseGetTitan) {
      return this.promiseGetTitan;
    }

    const promise = new Promise<Titan | undefined>((resolve, reject) => {
      this._getTitan()
        .then((titan) => {
          this.promiseGetTitan = undefined;
          resolve(titan);
        })
        .catch((e) => {
          this.promiseGetTitan = undefined;
          reject(e);
        });
    });
    return (this.promiseGetTitan = promise);
  }

  suggestChain(fn: () => Promise<void>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.suggestChainDebounceTimer.call([fn], (res) => {
        if (res.status === "fulfilled") {
          resolve();
        } else {
          reject(res.reason);
        }
      });
    });
  }

  enable(chainId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.enableDebounceTimer.call([chainId], (res) => {
        if (res.status === "fulfilled") {
          resolve();
        } else {
          reject(res.reason);
        }
      });
    });
  }

  getKey(
    chainId: string,
    action: (res: SettledResponse<Key>) => void
  ): Promise<void> {
    return this.getKeyDebounceTimer.call([chainId], action);
  }

  getKeyMixed(
    chainId: string,
    isStarknet: boolean,
    action: (
      res: SettledResponse<
        | Key
        | {
            name: string;
            hexAddress: string;
            pubKey: Uint8Array;
            address: Uint8Array;
            isNanoLedger: boolean;
          }
      >
    ) => void
  ): Promise<void> {
    return this.getKeyMixedDebounceTimer.call([chainId, isStarknet], action);
  }
}
