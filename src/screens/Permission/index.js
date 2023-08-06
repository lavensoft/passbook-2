import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button, Back } from '@components';
import API from "@api";

const users = [
    {
        id: 1,
        image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
        name: "yasuo",
        permission: "pro"
    },
    {
        id: 2,
        image: "https://d2vi0z68k5oxnr.cloudfront.net/50e23920-bfbb-4404-b5c1-0e3279b0010b/original.png?d=sm-cover",
        name: "yi",
        permission: "nood"
    },
];

export const Permission = ({ match, navigation }) => {

    const array = users.reduce((result, user) => {
        const Item = <UserCard overlay title={user.name} key={user.id} to={`/user-detail/${user.id}`} permission={user.permission} image={user.image} style={{ marginTop: 0, marginRight: 0, width: 160 }} />
        return result.push(Item) && result;
    }, []);

    return (
        <>
            <View>
                <Back to="/settings"/>
                <Title
                    subtitle=""
                    title="PERMISSION"
                />

                <ScrollView style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} horizontal>

                    <GridView
                        items={array}
                    />

                </ScrollView>
                <div style={{ marginBottom: "70px", display: "flex", justifyContent: "center" }}>
                    <Button style={{ width: "100%"}} to="/user/add-user">Add</Button>
                </div>
            </View>
        </>
    )
}  