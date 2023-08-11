import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { child, getDatabase, ref, set, get } from 'firebase/database';

export const User = {
    get: async (userId) => {
      let res = await get(child(ref(getDatabase()), `users/${userId}`));
      res = res.val();

      return res;
    },
    createUser: async (user) => {
      //   let hero = await actor;

      set(ref(getDatabase(), "users/" + user.id), user);
        
      //   return await hero.createAccount(user);
    },
    getAll: async () => {
      //   let hero = await actor;

      //   return await hero.readAccount();
    }
//     updateAccount: async (user) => {
//         let hero = await actor;
//         return await hero.updateAccount(user.firstName, user.lastName, user.sex, user.dateOfBirth, user.phone, user.liveIn, user.permission);
//     },
//     deleteAccount: async () => {
//         let hero = await actor;
//         return await hero.de(user.firstName, user.lastName, user.sex, user.dateOfBirth, user.phone, user.liveIn, user.permission);
//     }
}