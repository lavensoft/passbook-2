import React from 'react';
import RootStack from "@navigation/RootStack";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXACNcj5uEmum_rAfwUIuXYRcnceZ9YV4",
  authDomain: "passbook-ad273.firebaseapp.com",
  projectId: "passbook-ad273",
  storageBucket: "passbook-ad273.appspot.com",
  messagingSenderId: "559639084140",
  appId: "1:559639084140:web:48d43eae999a4c13c3ac49",
  measurementId: "G-DXE5N2NH2P",
  databaseURL: "https://passbook-ad273-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <RootStack />
  );
}

export default App;