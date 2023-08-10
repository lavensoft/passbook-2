import React, { FC, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletContext, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletConfigError } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
   WalletModalProvider,
   WalletDisconnectButton,
   WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Config } from "../config";
import SolflareClass from "@solflare-wallet/sdk";
import { SolanaContext } from '../context';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaProvider = ({ children }) => {
   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const [authed, setAuthed] = useState(false);
   const network = Config.NETWORK;
   const [wallet, setWallet] = useState({});

   useEffect(() => {
      connect();
   }, []);

   const connect = async () => {
      let solflare;

      try {
         solflare = new SolflareClass({ network });

         if (!solflare.connected) {
            await solflare.connect();

            localStorage.setItem("@user", '{"iss":"https://accounts.google.com","azp":"830626874390-hb47nkacuk4cn0c6pr788lri14s28jif.apps.googleusercontent.com","aud":"830626874390-hb47nkacuk4cn0c6pr788lri14s28jif.apps.googleusercontent.com","sub":"110196887894405140549","email":"nhatsdev@gmail.com","email_verified":"true","nbf":"1691402076","name":"Quang Nhật","picture":"https://lh3.googleusercontent.com/a/AAcHTtdo9WT6Ys6iwTVuZ2R_yDvrWNHFOt7-4MnHxNNABEHADQ=s96-c","given_name":"Quang","family_name":"Nhật","locale":"vi","iat":"1691402376","exp":"1691405976","jti":"c95b6d7264d7088b8c4f5108937ea6834e3b39f4","alg":"RS256","kid":"911e39e27928ae9f1e9d1e21646de92d19351b44","typ":"JWT"}');
            setAuthed(true);

            setWallet(wallet => (
               {
                  ...wallet,
                  publicKey: solflare.publicKey,
                  publicKeyStr: solflare.publicKey.toBase58()
               }
            ))
            // window.location.href = "/#/home";
         }
      } catch (error) {
         throw new WalletConfigError(error?.message, error);
      }
   };

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
               {
                  authed  &&
                  <SolanaContext.Provider value={wallet}>
                     {children}
                  </SolanaContext.Provider>
               }
            </WalletModalProvider>
         </WalletProvider>
      </ConnectionProvider>
   );
}