# Elusiv SDK w/ React + Webpack

This is a demo application to showcase using [Elusiv's SDK](https://github.com/elusiv-privacy/elusiv-sdk) with React and Webpack.

Have a look at the [webpack.config.js](https://github.com/elusiv-privacy/elusiv-webpack-demo/blob/main/webpack.config.js) to understand the polyfills required to make the SDK work in the browser. (Based on the overrides mentioned in [CRA Starter](https://github.com/solana-labs/wallet-adapter/blob/master/packages/starter/create-react-app-starter/config-overrides.js) provided by Solana)

Note: If you are using Solana Wallet Adapter, you can swap the `sign` function for signing `SEED_MESSAGE` with `signMessage` function provided by the wallet adapter.

## Usage

```
# 1. Clone the repo
git clone https://github.com/elusiv-privacy/elusiv-webpack-demo.git
# 2. Install dependencies
npm install
# 3. Add your private key and recipient key for send in src/helpers.ts and App.tsx respectively
# 4. Start the app
npm start
```
