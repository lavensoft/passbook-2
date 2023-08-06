import Axios from 'axios';

export const IPFS = {
   uploadImage: async (file) => {
      const formData = new FormData();
      formData.append(
         "file",
         file,
         file.name
      );

      return await Axios.post(`https://orios-server.lavenes.com/api/v1/files/upload_media`, formData, {
         headers: {
            "app":"63452fa601a4792a134bf3f2", 
            "api_key":"AIzaSyAGLoe812akN97h2LVKZoUc3eHdeFGz9SI",
            "Content-Type": "application/json"
         }
      });
   }
}