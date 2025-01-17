const path = require('path');
const fs = require('fs');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          ...(() => {
            const p = path.resolve(
              __dirname,
              './src/titan-wallet-mobile-private/index.ts',
            );

            if (fs.existsSync(p)) {
              return {
                'titan-wallet-mobile-private': path.resolve(
                  __dirname,
                  './src/titan-wallet-mobile-private/index.ts',
                ),
              };
            }

            return {};
          })(),
        },
      },
    ],
    'react-native-reanimated/plugin',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: [
          'TITAN_EXT_ETHEREUM_ENDPOINT',
          'TITAN_EXT_ANALYTICS_API_AUTH_TOKEN',
          'TITAN_EXT_ANALYTICS_API_URL',
          'TITAN_EXT_COINGECKO_ENDPOINT',
          'TITAN_EXT_COINGECKO_GETPRICE',
          'TITAN_EXT_TRANSAK_API_KEY',
          'TITAN_EXT_MOONPAY_API_KEY',
          'TITAN_EXT_KADO_API_KEY',
          'TITAN_EXT_CHAIN_REGISTRY_URL',
          'TITAN_EXT_TOKEN_FACTORY_BASE_URL',
          'TITAN_EXT_TOKEN_FACTORY_URI',
          'TITAN_EXT_TX_HISTORY_BASE_URL',
          'TITAN_EXT_CONFIG_SERVER',
          'WC_PROJECT_ID',
          'SKIP_API_KEY',
        ],
      },
    ],
  ],
};
