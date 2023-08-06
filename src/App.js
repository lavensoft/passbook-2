import React from 'react';
import RootStack from "./navigation/RootStack";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
   return (
      <RootStack />
   );
}

export default App;