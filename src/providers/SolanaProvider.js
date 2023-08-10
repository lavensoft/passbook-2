import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
   WalletModalProvider,
   WalletDisconnectButton,
   WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Config } from "../config";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaProvider = ({ children }) => {
   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const network = Config.NETWORK;

   // const connect = async () => {
   //    let SolflareClass;

   //    SolflareClass = (await import("@solflare-wallet/sdk")).default;

   //    let wallet;

   //    try {
   //       const config = {
   //          network: network,
   //       };

   //       wallet = new SolflareClass({ network: config.network });

   //       if (!wallet.connected) {
   //          await wallet.connect();
   //       }
   //    } catch (error) {
   //       throw new WalletConfigError(error?.message, error);
   //    }
   // };

   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

   const wallets = useMemo(
      () => [
         new UnsafeBurnerWalletAdapter(),
      ],
      [network]
   );

   return (
      <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
               {/* <WalletMultiButton />
               <WalletDisconnectButton /> */}
               {children}
            </WalletModalProvider>
         </WalletProvider>
      </ConnectionProvider>
   );
}