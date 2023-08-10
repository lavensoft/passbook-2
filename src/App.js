import React from 'react';
import RootStack from "./navigation/RootStack";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SolanaProvider } from './providers/SolanaProvider';

const firebaseConfig = {
   apiKey: "AIzaSyCSgpxNHXElnUfA5jeuS4FP0YQIAlvyK04",
   authDomain: "passbook-lavenes.firebaseapp.com",
   projectId: "passbook-lavenes",
   storageBucket: "passbook-lavenes.appspot.com",
   messagingSenderId: "830626874390",
   appId: "1:830626874390:web:128a29c7b695ebbde4e137",
   measurementId: "G-P1Y5KTLJ1G",
   databaseURL: "https://passbook-lavenes-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const googleAuth = {
   clientId: "830626874390-hb47nkacuk4cn0c6pr788lri14s28jif.apps.googleusercontent.com",
   clientSecrect: "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"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
   return (
      <SolanaProvider>
         <GoogleOAuthProvider
            clientId={googleAuth.clientId}
         >
            <RootStack />
         </GoogleOAuthProvider>
      </SolanaProvider>
   );
}

export default App;