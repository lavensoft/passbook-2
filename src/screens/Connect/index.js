import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button } from '@components';
import { usePlug } from '@hooks';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import "./styles.scss";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const AuthButton = ({ title, onSuccess, onFailure, platform, secondary, subtitle, to = "#", icon = "another" }) => {
   const providers = {
      "google": new GoogleAuthProvider()
   }

   const handleSignin = async () => {
      const auth = getAuth();
      const authProvider = providers[platform];
      authProvider.setCustomParameters({ prompt: 'select_account' });

      signInWithPopup(auth, authProvider).then(result => onSuccess(result)).catch(e => onFailure(e));
   }

   return (
      <a href={to} target="_blank" rel="noreferrer" className={`authButton`} onClick={!to ? handleSignin : null}>
         <div className={"logoContainer"} style={{
            backgroundImage: `url(https://coder.poly-bees.com/icons/google.svg.webp)`
         }}>

         </div>
         <div className={"infoContainer"}>
            <span className={"title"}>{title}</span>
            <span className={"subtitle"}>{subtitle}</span>
         </div>
      </a>
   )
}

export const Connect = ({ match, navigation }) => {
   const onSuccess = async (e) => {
      const { credential } = e;

      //Get user info
      const info = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);

      localStorage.setItem("@user", JSON.stringify(info.data));

      window.location.reload();
   }

   const onFail = () => {
      
   }

   return (
      <>
         <View>
            <div style={{
               textAlign: "center", marginTop: "200px", fontSize: "50px", lineHeight: "1.5rem", fontStyle: "normal",
               fontFamily: "sans-serif", color: "#373A40",
               alignItems: "center",
               justifyContent: "center",
               display: "flex",
               flexDirection: "column"
            }}>
               <Title
                  title="PASSBOOK"
               />
            </div>
            <p style={{ textAlign: "center", fontSize: "12px" }}>Vui lòng đăng nhập</p>

            <div style={{
               width: "100%",
               display: "flex",
               justifyContent: "center",
               marginTop: 33
            }}>
               <GoogleLogin
                  shape="circle"
                  theme="filled_blue"
                  onSuccess={onSuccess}
                  onFailure={onFail}
                  hosted_domain="fpt.edu.vn"
                  // auto_select={true}
                  useOneTap={true}
               />
            </div>
         </View>
      </>
   )
}  