import { ChainInfo, ModularChainInfo } from "@titan-wallet/types";

export const TITAN_CHAIN_ID = "titan_18888-1";

const UntitledSupportedEmbedChainInfos: (ChainInfo | ModularChainInfo)[] = [
  {
    rpc: "https://titan-rpc.titanlab.io",
    rest: "https://titan-lcd.titanlab.io",
    chainId: TITAN_CHAIN_ID,
    chainName: "Titan",
    chainSymbolImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/titan_18888/chain.png",
    nodeProvider: {
      name: "Titanlab",
      email: "info@titanlab.io",
      website: "https://titanlab.io",
    },
    bip44: {
      coinType: 60,
    },
    bech32Config: {
      bech32PrefixAccAddr: "titan",
      bech32PrefixAccPub: "titanpub",
      bech32PrefixValAddr: "titanvaloper",
      bech32PrefixValPub: "titanvaloperpub",
      bech32PrefixConsAddr: "titanvalcons",
      bech32PrefixConsPub: "titanvalconspub",
    },
    currencies: [
      {
        coinDenom: "TKX",
        coinMinimalDenom: "atkx",
        coinDecimals: 18,
        coinGeckoId: "tokenize-xchange",
        coinImageUrl:
          "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/titan_18888/tkx.png",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "TKX",
        coinMinimalDenom: "atkx",
        coinDecimals: 18,
        coinGeckoId: "tokenize-xchange",
        gasPriceStep: {
          low: 100000000000,
          average: 110000000000,
          high: 200000000000,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "TKX",
      coinMinimalDenom: "atkx",
      coinDecimals: 18,
      coinGeckoId: "tokenize-xchange",
    },
    features: ["cosmwasm", "eth-address-gen", "eth-key-sign"],
    // features: ["cosmwasm", "eth-address-gen", "eth-key-sign"],
  },
];

// The origins that are able to pass any permission that external webpages can have.
export const PrivilegedOrigins: string[] = [
  "https://wallet.keplr.app",
  "https://validator.keplr.app",
  "https://chains.keplr.app",
  "https://testnet.keplr.app",
  "https://multisig.keplr.app",
];

export const CommunityChainInfoRepo = {
  organizationName: "chainapsis",
  repoName: "keplr-chain-registry",
  branchName: "main",
  alternativeURL: process.env["keplr_EXT_CHAIN_REGISTRY_URL"]
    ? process.env["keplr_EXT_CHAIN_REGISTRY_URL"]
    : undefined,
};

export const EmbedChainInfos = UntitledSupportedEmbedChainInfos;
