declare namespace NodeJS {
  interface ProcessEnv {
    /** node environment */
    NODE_ENV: "production" | "development" | undefined;

    TITAN_EXT_TX_HISTORY_BASE_URL: string;
    TITAN_EXT_CONFIG_SERVER: string;
    TITAN_EXT_EIP6963_PROVIDER_INFO_NAME: string;
    TITAN_EXT_EIP6963_PROVIDER_INFO_RDNS: string;
    TITAN_EXT_EIP6963_PROVIDER_INFO_ICON: string;
    TITAN_EXT_STARKNET_PROVIDER_INFO_ID: string;
    TITAN_EXT_STARKNET_PROVIDER_INFO_NAME: string;
    TITAN_EXT_STARKNET_PROVIDER_INFO_ICON: string;
  }
}
