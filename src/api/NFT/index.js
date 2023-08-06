import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';

export const NFT = {
    mint: async (name, imageUrl, place, date, time, price, description, gifts, details, type, category, privacy, preorder, supplies) => {
        //*Upload metadata
        let metadata = {
            id: stringToSlug(name + '-' + randomStr(5)),
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
            owner: "",
            createdBy: "",
            dateCreated: new Date().toISOString(),
            checkin: false
        }

        //*Upload
      //   let hero = await actor;
        
		// const res = await hero.mintNFT(metadata);

      //   console.log(res);

      //   return res;
    },
    getAll: async() => {
      //   let hero = await actor;

      //   //*Fetch Users
      //   let users = await hero.readAccount();

		// let res = await hero.getAllTokens();

      //   res = res.map(item => {
      //       item.price = Math.round(Number(item.price) * 1000)/1000;
      //       item.author = users.find(u => u.id?.toString() == item.createdBy?.toString());

      //       return item;
      //   });

      //   return res.reverse();
    },
    getAllOfUser: async( principalId ) => {
      //   let hero = await actor;
      //   const { principal } = usePlug();
      //   const id = principalId || principal;
      //   let users = await hero.readAccount();

		// let res = await hero.getAllTokens();

      //   res = res.map(item => {
      //       item.price = Math.round(Number(item.price) * 1000)/1000;
      //       item.author = users.find(u => u.id?.toString() == item.createdBy?.toString());

      //       return item;
      //   });

      //   res = res.filter(item => {
      //       if(item.createdBy.toString() == id && item.owner.toString() == id) {
      //           item.price = Math.round(Number(item.price) * 1000)/1000;

      //           return item;
      //       }

      //       return false;
      //   })

      //   return res.reverse();
    },
    getAllTickets: async() => {
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
    getAllNFTs: async() => {
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
    getOwned: async() => {
      //   let hero = await actor;

      //   let users = await hero.readAccount();

		// let res = await hero.getAllTokens();

      //   res = res.map(item => {
      //       item.price = Math.round(Number(item.price) * 1000)/1000;
      //       item.author = users.find(u => u.id?.toString() == item.createdBy?.toString());

      //       return item;
      //   });

      //   res = res.filter(item => {
      //       let itemOwner = item.owner.toString();
      //       let principal = window.ic?.plug?.sessionManager?.sessionData?.principalId;

      //       if(itemOwner == principal) {
      //           item.price = Math.round(Number(item.price) * 1000)/1000;

      //           return item;
      //       }else{
      //           return false;
      //       }
      //   })
        
      //   return res.reverse();
    },
    getCreatedNFTs: async() => {
      //   let hero = await actor;

      //   let users = await hero.readAccount();

		// let res = await hero.getAllTokens();

      //   res = res.map(item => {
      //       item.price = Math.round(Number(item.price) * 1000)/1000;
      //       item.author = users.find(u => u.id?.toString() == item.createdBy?.toString());

      //       return item;
      //   });

      //   res = res.filter(item => {
      //       let itemCreated = item.createdBy.toString();
      //       let principal = window.ic?.plug?.sessionManager?.sessionData?.principalId;

      //       if(item.nftType === "nft" && itemCreated == principal) {
      //           item.price = Math.round(Number(item.price) * 1000)/1000;

      //           return item;
      //       }

      //       return false;
      //   })

      //   return res.reverse();
    },
    get: async(id) => {
      //   let hero = await actor;
      //   let { principal } = usePlug();

      //   let res = await hero.getTokenInfo(id);

      //   let userRes = await hero.getUserInfo(res.createdBy);

      //   res.price = Math.round(Number(res?.price) * 1000)/1000;
      //   res.author = userRes[0];


      //   res.gifts = res.gifts.map(item => {
      //       item.image = new Uint8Array(item?.image);
      //       item.image = URL.createObjectURL(new Blob([item?.image]));

      //       return item;
      //   });

      //   res.owned = (res.owner.toString() === principal);

      //   return res;
    },
    clearAll: async() => {
      //   console.log("CLEARING...")
      //   let hero = await actor;

      //   const res = await hero.clearAllTokens();

      //   console.log(res);

      //   return res;
    },
    purchase: async(tokenId, supplies) => {
      //   const { requestTransfer } = usePlug();
      //   let hero = await actor;

      //   const res = await hero.purchaseNFT(tokenId, supplies, randomStr(5));

      //   return res;
    },
    checkinTicket: async(ticketCode) => {
      //   console.log("VERIFYING...");
      //   let hero = await actor;

      //   let ticketId = ticketCode.split("#")[0];
      //   let principalId = Principal.fromText(ticketCode.split("#")[1]);

      //   console.log(ticketCode.split("#")[1]);

      //   return await hero.checkinTicket(ticketId, principalId);
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
    swap: async(from, to) => {
      //   let hero = await actor;

      //   let res = await hero.swapNFT(from, to);

      //   return res;
    },
    transfer: async (from, to, tokenId) => {
      //   let hero = await actor;

      //   let res = await hero.transferNFT(from, to, tokenId, 0);

      //   return res;
    }
}