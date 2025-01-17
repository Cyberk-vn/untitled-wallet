/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const fs = require("fs");

const isBuildManifestV2 = process.env.BUILD_MANIFEST_V2 === "true";

const isEnvDevelopment = process.env.NODE_ENV !== "production";
const isDisableSplitChunks = process.env.DISABLE_SPLIT_CHUNKS === "true";
const isEnvAnalyzer = process.env.ANALYZER === "true";
const commonResolve = (dir) => ({
  extensions: [".ts", ".tsx", ".js", ".jsx"],
  alias: {
    assets: path.resolve(__dirname, dir),
  },
});
const altResolve = () => {
  const p = path.resolve(__dirname, "./src/titan-wallet-private/index.ts");

  if (fs.existsSync(p)) {
    return {
      alias: {
        "titan-wallet-private": path.resolve(
          __dirname,
          "./src/titan-wallet-private/index.ts"
        ),
      },
    };
  }

  return {};
};
const tsRule = { test: /\.tsx?$/, loader: "ts-loader" };
const fileRule = {
  test: /\.(svg|png|webm|mp4|jpe?g|gif|woff|woff2|eot|ttf)$/i,
  type: "asset/resource",
  generator: {
    filename: "assets/[name][ext]",
  },
};

const titanLogoBase64 = `data:image/png;base64,${fs.readFileSync(
  "src/public/assets/icon/icon-128.png",
  "base64"
)}`;

module.exports = {
  name: "extension",
  mode: isEnvDevelopment ? "development" : "production",
  // In development environment, turn on source map.
  devtool: isEnvDevelopment ? "cheap-source-map" : false,
  // In development environment, webpack watch the file changes, and recompile
  watch: isEnvDevelopment,
  entry: {
    popup: ["./src/index.tsx"],
    register: ["./src/register.tsx"],
    blocklist: ["./src/pages/blocklist/index.tsx"],
    ledgerGrant: ["./src/ledger-grant.tsx"],
    background: ["./src/background/background.ts"],
    contentScripts: ["./src/content-scripts/content-scripts.ts"],
    injectedScript: ["./src/content-scripts/inject/injected-script.ts"],
  },
  output: {
    path: path.resolve(
      __dirname,
      isEnvDevelopment ? "dist" : process.env.BUILD_OUTPUT || "build/default"
    ),
    filename: "[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        if (isDisableSplitChunks) {
          return false;
        }

        const servicePackages = ["contentScripts", "injectedScript"];

        if (!isBuildManifestV2) {
          servicePackages.push("background");
        }

        return !servicePackages.includes(chunk.name);
      },
      cacheGroups: {
        ...(() => {
          const res = {
            popup: {
              maxSize: 3_000_000,
              maxInitialRequests: 100,
              maxAsyncRequests: 100,
            },
            register: {
              maxSize: 3_000_000,
              maxInitialRequests: 100,
              maxAsyncRequests: 100,
            },
            blocklist: {
              maxSize: 3_000_000,
              maxInitialRequests: 100,
              maxAsyncRequests: 100,
            },
            ledgerGrant: {
              maxSize: 3_000_000,
              maxInitialRequests: 100,
              maxAsyncRequests: 100,
            },
          };

          if (isBuildManifestV2) {
            res.background = {
              maxSize: 3_000_000,
              maxInitialRequests: 100,
              maxAsyncRequests: 100,
            };
          }

          return res;
        })(),
      },
    },
  },
  resolve: {
    ...commonResolve("src/public/assets"),
    ...altResolve(),
    fallback: {
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer/"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
  module: {
    rules: [
      tsRule,
      fileRule,
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isEnvDevelopment ? "development" : "production",
      // XXX: SC_DISABLE_SPEEDY is used for force enabling speedy mode for styled-components.
      //      According to the document, styled-components injects stylings to <style /> tag for each class name if development mode.
      //      However, on production mode, it injects stylings by using CSSOM.
      //      Probably, if development mode, this difference makes the blinking styling for transition components which changes the styling by JS code.
      //      At present, rather than fixing this for development mode, We fix this by forcing cssom to be enabled, and will fix this later when we have time.
      SC_DISABLE_SPEEDY: false,
      TITAN_EXT_ETHEREUM_ENDPOINT: "",
      TITAN_EXT_ANALYTICS_API_AUTH_TOKEN: "",
      TITAN_EXT_ANALYTICS_API_URL: "",
      TITAN_EXT_COINGECKO_ENDPOINT: "",
      TITAN_EXT_COINGECKO_GETPRICE: "",
      TITAN_EXT_COINGECKO_COIN_DATA_BY_TOKEN_ADDRESS: "",
      TITAN_EXT_TRANSAK_API_KEY: "",
      TITAN_EXT_MOONPAY_API_KEY: "",
      TITAN_EXT_KADO_API_KEY: "",
      TITAN_EXT_CHAIN_REGISTRY_URL: "",
      TITAN_EXT_GOOGLE_MEASUREMENT_ID: "",
      TITAN_EXT_GOOGLE_API_KEY_FOR_MEASUREMENT: "",
      TITAN_EXT_TOKEN_FACTORY_BASE_URL: "",
      TITAN_EXT_TOKEN_FACTORY_URI: "",
      TITAN_EXT_TX_HISTORY_BASE_URL: "",
      TITAN_EXT_CONFIG_SERVER: "",
      WC_PROJECT_ID: "",
      TITAN_EXT_EIP6963_PROVIDER_INFO_NAME: "Titan",
      TITAN_EXT_EIP6963_PROVIDER_INFO_RDNS: "app.titan",
      TITAN_EXT_EIP6963_PROVIDER_INFO_ICON: titanLogoBase64,
      TITAN_EXT_STARKNET_PROVIDER_INFO_ID: "titan",
      TITAN_EXT_STARKNET_PROVIDER_INFO_NAME: "Titan",
      TITAN_EXT_STARKNET_PROVIDER_INFO_ICON: titanLogoBase64,
      SKIP_API_KEY: "",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        ...(() => {
          if (isBuildManifestV2) {
            return [
              {
                from: "./src/manifest.v2.json",
                to: "./manifest.json",
              },
            ];
          }

          return [
            {
              from: "./src/manifest.v3.json",
              to: "./manifest.json",
            },
          ];
        })(),
        {
          from: "../../node_modules/webextension-polyfill/dist/browser-polyfill.js",
          to: "./",
        },
      ],
    }),
    // popup.html과 sidePanel.html은 사실 동일하다.
    // 단지 popup에서 실행되었는지 sidePanel에서 실행되었는지를
    // js에서 파일 이름으로 알아내기 위해서 분리했다.
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "sidePanel.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "register.html",
      chunks: ["register"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/blocklist.html",
      filename: "blocklist.html",
      chunks: ["blocklist"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "ledger-grant.html",
      chunks: ["ledgerGrant"],
    }),
    ...(() => {
      if (isBuildManifestV2) {
        return [
          new HtmlWebpackPlugin({
            template: "./src/background.html",
            filename: "background.html",
            chunks: ["background"],
          }),
        ];
      }

      return [];
    })(),
    new BundleAnalyzerPlugin({
      analyzerMode: isEnvAnalyzer ? "server" : "disabled",
    }),
  ],
};
