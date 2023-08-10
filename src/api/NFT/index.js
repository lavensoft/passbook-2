import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { getDatabase, set, ref, get, child, push, update } from 'firebase/database';
import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, setAuthority, transfer, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey, TokenAndMintDoNotMatchError } from '@metaplex-foundation/js';

export const NFT = {
   transferToken: async (tokenId, fromWalletPublicKey, toWalletPublicKey) => {
      // Connect to cluster
      var connection = new Connection(clusterApiUrl(Config.NETWORK));
      // Construct wallet keypairs
      var fromWallet = Keypair.fromSecretKey(Config.WALLET_SECRECT);
      var toWallet = Keypair.generate();
      // Construct my token class
      var myMint = new PublicKey(tokenId);
      var myToken = new TokenAndMintDoNotMatchError(
         connection,
         myMint,
         TOKEN_PROGRAM_ID,
         fromWallet
      );

      // Create associated token accounts for my token if they don't exist yet
      var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
         fromWallet.publicKey
      )
      var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
         toWalletPublicKey
      )
      // Add token transfer instructions to transaction
      var transaction = new web3.Transaction()
         .add(
            splToken.createTransferInstruction(
            splToken.TOKEN_PROGRAM_ID,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet.publicKey,
            [],
            0
            )
         );
      // Sign transaction, broadcast, and confirm
      var signature = await sendAndConfirmTransaction(
         connection,
         transaction,
         [fromWallet]
      );
      console.log("SIGNATURE", signature);
      console.log("SUCCESS");
   },
   mint: async (walletPublicKey, supplies = 1) => {
      console.log("Mining Ticket...");
      const connection = new Connection(
         clusterApiUrl(Config.NETWORK),
         "confirmed"
      );

      const fromWallet = Keypair.generate();

      const airdropSignature = await connection.requestAirdrop(
         fromWallet.publicKey,
         LAMPORTS_PER_SOL,
      );

      await connection.confirmTransaction(airdropSignature);

      const mint = await createMint(
         connection,
         fromWallet,
         fromWallet.publicKey,
         null,
         0
      );

      console.log(`NFT: ${mint.toBase58()}`);

      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
         connection,
         fromWallet,
         mint,
         fromWallet.publicKey
      );

      // Generate a new wallet to receive the newly minted token

      // Get the token account of the "toWallet" Solana address. If it does not exist, create it.
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
         connection,
         fromWallet,
         mint,
         walletPublicKey
      );

      // Minting 1 new token to the "fromTokenAccount" account we just returned/created.
      let nft = await mintTo(
         connection,
         fromWallet,               // Payer of the transaction fees 
         mint,                     // Mint for the account 
         fromTokenAccount.address, // Address of the account to mint to 
         fromWallet.publicKey,     // Minting authority
         supplies                         // Amount to mint 
      );

      // console.log(mint.);

      await setAuthority(
         connection,
         fromWallet,            // Payer of the transaction fees
         mint,                  // Account 
         fromWallet.publicKey,  // Current authority 
         0,                     // Authority type: "0" represents Mint Tokens 
         null                   // Setting the new Authority to null
      );

      await transfer(
         connection,
         fromWallet,               // Payer of the transaction fees 
         fromTokenAccount.address, // Source account 
         toTokenAccount.address,   // Destination account 
         fromWallet.publicKey,     // Owner of the source account 
         1                         // Number of tokens to transfer 
      );

      console.log(fromWallet.publicKey.toBase58());

      console.log("DONE!!!");

      return mint;
   },
   mintTicket: async (walletPublicKey, name, imageUrl, place, date, time, price, description, gifts = [], details, type, category, privacy, preorder, supplies = 1) => {
      let mint = await NFT.mint(walletPublicKey, supplies);
      //*Upload metadata
      let metadata = {
         id: mint.toBase58(),
         name,
         image: imageUrl,
         place,
         date: date.toString(),
         time: time.toString(),
         price: Number(price),
         description,
         gifts,
         details,
         nftType: type,
         category,
         privacy,
         preorder,
         supplies,
         owner: JSON.parse(localStorage.getItem("@user")),
         createdBy: JSON.parse(localStorage.getItem("@user")),
         dateCreated: new Date().toISOString(),
         checkin: false
      }

      return set(ref(getDatabase(), "tickets/" + metadata.id), metadata);
   },
   mintNFT: async (walletPublicKey, name, imageUrl, price, description, details, type, category, privacy, supplies) => {
      let mint = await NFT.mint(walletPublicKey, supplies);
      //*Upload metadata
      let metadata = {
         id: mint.toBase58(),
         name,
         image: imageUrl,
         price: Number(price),
         description,
         details,
         nftType: type,
         category,
         privacy,
         supplies,
         owner: JSON.parse(localStorage.getItem("@user")),
         createdBy: JSON.parse(localStorage.getItem("@user")),
         dateCreated: new Date().toISOString(),
         checkin: false
      }

      return set(ref(getDatabase(), "nfts/" + metadata.id), metadata);
   },
   getAll: async () => {
      let res = await get(child(ref(getDatabase()), "tickets"));

      res = Object.keys(res.val()).map(key => ({
         ...res.val()[key]
      }));

      return res.reverse();
   },
   getAllOfUser: async (principalId) => {
      let res = await get(child(ref(getDatabase()), "tickets"));

      res = Object.keys(res.val()).map(key => ({
         ...res.val()[key]
      }));

      res = res.filter(item => item.owner.email === principalId);

      return res.reverse();
   },
   getAllTickets: async () => {
      //   let hero = await actor;

      //   let users = await hero.readAccount();

      // let res = await hero.getAllTokens();

      //   res = res.map(item => {
      //       item.price = Math.round(Number(item.price) * 1000)/1000;
      //       item.author = users.find(u => u.id?.toString() == item.createdBy?.toString());

      //       return item;
      //   });

      //   res = res.filter(item => {
      //       if(item.type === "ticket") {
      //           item.price = Math.round(Number(item.price) * 1000)/1000;

      //           return item;
      //       }

      //       return false;
      //   })

      //   return res.reverse();
   },
   getAllNFTs: async () => {
      //   let hero = await actor;

      //   let users = await hero.readAccount();

      // let res = await hero.getAllTokens();

      //   res = res.map(item => {
      //       item.price = Math.round(Number(item.price) * 1000)/1000;
      //       item.author = users.find(u => u.id?.toString() == item.createdBy?.toString());

      //       return item;
      //   });

      //   res = res.filter(item => {
      //       if(item.type === "nft") {
      //           item.price = Math.round(Number(item.price) * 1000)/1000;

      //           return item;
      //       }

      //       return false;
      //   })

      //   return res.reverse();
   },
   getOwnedTicket: async (ownerPublicKey) => {
      let res = await get(child(ref(getDatabase()), "tickets"));

      res = Object.keys(res.val() || {}).map(key => ({
         ...res.val()[key],
         author: res.val()[key]["createdBy"]
      }));

      res = res.filter((i) => i.owner.publicKey === ownerPublicKey);

      return res.reverse();
   },
   getOwnedNft: async (ownerPublicKey) => {
      let res = await get(child(ref(getDatabase()), "nfts"));

      res = Object.keys(res.val() || {}).map(key => ({
         ...res.val()[key],
         author: res.val()[key]["createdBy"]
      }));

      res = res.filter((i) => i.owner.publicKey === ownerPublicKey);

      return res.reverse();
   },
   getCreatedNft: async (ownerPublicKey) => {
      let res = await get(child(ref(getDatabase()), "nfts"));

      res = Object.keys(res.val() || {}).map(key => ({
         ...res.val()[key]
      }));

      res = res.filter(item => item.createdBy.publicKey === ownerPublicKey);

      return res.reverse();
   },
   get: async (id) => {
      let res = await get(child(ref(getDatabase()), `tickets/${id}`));
      res = res.val();

      res.author = res.createdBy;
      res.owned = res.owner.email === JSON.parse(localStorage.getItem("@user")).email;

      return res;
      //   res.gifts = res.gifts.map(item => {
      //       item.image = new Uint8Array(item?.image);
      //       item.image = URL.createObjectURL(new Blob([item?.image]));

      //       return item;
      //   });
   },
   clearAll: async () => {
      //   console.log("CLEARING...")
      //   let hero = await actor;

      //   const res = await hero.clearAllTokens();

      //   console.log(res);

      //   return res;
   },
   purchase: async (ticket, supplies) => {
      let metadata = {
         ...ticket,
         id: ticket.id + randomStr(5),
         supplies,
         owner: JSON.parse(localStorage.getItem("@user")),
         nftType: "ticket",
         checkin: false
      }

      set(ref(getDatabase(), "tickets/" + metadata.id), metadata);
   },
   checkinTicket: async (ticketCode) => {
      //   console.log("VERIFYING...");
      //   let hero = await actor;

      //   let ticketId = ticketCode.split("#")[0];
      //   let principalId = Principal.fromText(ticketCode.split("#")[1]);

      //   console.log(ticketCode.split("#")[1]);

      //   return await hero.checkinTicket(ticketId, principalId);

      let ticketId = ticketCode.split("#")[0];
      let ticket = await NFT.get(ticketId);

      const updates = {
         [`tickets/${ticketId}`]: {
            ...ticket,
            checkin: true
         },
      };

      return update(ref(getDatabase()), updates);
   },
   checkPreorders: async () => {
      //   let hero = await actor;
      //   const { principal } = usePlug();

      //   //Filter user
      //   let orders = await hero.getAllTokenPreorders();

      //   orders = orders.filter(item => {
      //       return item.owner.toString() === principal && item.available;
      //   });

      //   let dateNow = new Date();

      //   //Fetch token info
      //   for(var item of orders) {
      //       try {
      //           let token = await hero.getTokenInfo(item.nftId);
      //           let preorder = token.preorder;
      //           let endTime = new Date(`${preorder.end} ${preorder.endTime}`);

      //           if(dateNow >= endTime) {
      //               for(var i = 1; i <= item.supplies; i++) {
      //                   await hero.mintCloneNFT(item.nftId, randomStr(5), Principal.fromText(principal));
      //               }

      //               await hero.removeTokenPreorder(item.id);
      //           }
      //       }catch(e) {
      //           console.log(e);
      //       };
      //   }
   },
   swap: async (from, to) => {
      let fromTicket = await NFT.get(from);
      let toTicket = await NFT.get(to);

      const updates = {
         [`tickets/${from}`]: {
            ...fromTicket,
            owner: toTicket.owner
         },
         [`tickets/${to}`]: {
            ...toTicket,
            owner: fromTicket.owner
         }
      };

      return update(ref(getDatabase()), updates);
   },
   transfer: async (from, to, tokenId) => {
      //   let hero = await actor;

      //   let res = await hero.transferNFT(from, to, tokenId, 0);

      //   return res;
   }
}