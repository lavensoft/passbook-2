import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';

export const Token = {
    mint: async (amount) => {
      //   let hero = await actor;
      //   const { principal } = usePlug();

      //   console.log("MINTING PCB...");

      //   let res = await hero.mintToken(Principal.fromText(principal), amount);

      //   return res;
    },
    balance: async () => {
      //   let hero = await actor;

      //   const { principal } = usePlug();

      //   return await hero.balanceOf(Principal.fromText(principal));
    }
}