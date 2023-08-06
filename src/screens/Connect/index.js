import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button } from '@components';
import { usePlug } from '@hooks';

export const Connect = ({ match, navigation }) => {
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

    useEffect(() => {
        fetch();
      }, []);
  
      const fetch = async() => {
        let b = await actor;
        let a = await b.readAccount();
        let balance = await getBalance();
  
        console.log(a);
        console.log(balance);
      }

    return (
       <>   
            <View>
                <div style={{textAlign: "center", marginTop: "200px", fontSize: "50px", lineHeight: "1.5rem", fontStyle: "normal",
                            fontFamily: "sans-serif", color: "#373A40"}}>
                    <Title
                        title="PASSBOOK"
                    />
                </div>
                <p style={{textAlign: "center", fontSize: "12px"}}>Vui lòng đăng nhập</p>

                <div style={{textAlign: "center", marginTop: "32px", backgroundImage: "linear-gradient(to right, #822ea8 0%, #d90e90 50%, #822ea8 100%)", 
                            lineHeight: "50px", borderRadius: "30px 30px 30px 30px"}}>
                    <button style={{color: "#fff", fontWeight: "500", fontSize: "18px"}} onClick={connect}>Connect Plug</button>
                </div>
            </View>
        </>
    )
}  