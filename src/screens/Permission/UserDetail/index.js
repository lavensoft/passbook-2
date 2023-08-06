import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import {  UserCardDetail, Back, Button } from '@components';
import API from "@api";
import { usePlug } from '@hooks';

export const UserDetail = () => {
    // const { userId } = useParams();
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      //   // const principalId = window.ic.plug.sessionManager.sessionData.principalId;
      //   const user = await API.User.get(principal);

      //   console.log(user);
    }

    const user = {
        id: 1,
        image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
        name: "yasuo",
        permission: "pro"
    };


    // style, onClick, id, to="#", title, overlay, image, permission
    return (
        <>
            <UserCardDetail 
                overlay 
                title={user.name} 
                key={user.id} 
                to={`/user-detail/${user.id}`} 
                permission={user.permission} 
                image={user.image} 
                style={{ 
                    width: "100%",
                }}/>
            <div style={{textAlign: "center"}}>
                <Button style={{ marginTop: 20, width: "80%" }} to="/permission">Cancel</Button>
            </div>
        </>
    )
}