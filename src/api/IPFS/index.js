import Axios from 'axios';
import { Config } from '@config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const IPFS = {
    uploadImage: async (file) => {
        let formData = new FormData();

        formData.append('file', file);

        let pinRes = await Axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                pinata_api_key: Config.PINATA.KEY,
                pinata_secret_api_key: Config.PINATA.SECRET
            }
        });

        return `${Config.PINATA.FILE_URL}${pinRes.data.IpfsHash}`;
    }
}