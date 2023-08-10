import Axios from 'axios';
//d17bdb82e4e1a73db692366e4e04e040e5f505a2
export const IPFS = {
   uploadImage: async (file) => {
      const formData = new FormData();
      formData.append(
         "image",
         file,
         file.name
      );

      return await Axios.post(`https://api.imgur.com/3/image`, formData, {
         headers: {
            // "app":"63452fa601a4792a134bf3f2", 
            // "api_key":"AIzaSyAGLoe812akN97h2LVKZoUc3eHdeFGz9SI",
            "Content-Type": "application/json",
            "Authorization": "Client-ID 774070ae15678a2"
         }
      });
   }
}