import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { Principal } from '@dfinity/principal';

const { actor } = usePlug();

export const User = {
    get: async (principalId) => {
        let hero = await actor;
        const { principal } = usePlug();
        
        return await hero.getUserInfo(Principal.fromText(principalId || principal));
    },
    createUser: async (user) => {
        let hero = await actor;
        
        return await hero.createAccount(user);
    },
    getAll: async () => {
        let hero = await actor;

        return await hero.readAccount();
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