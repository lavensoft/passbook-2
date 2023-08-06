import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button, Back } from '@components';

export const Checkin = ({ match, navigation }) => {

    return (
       <>   
            <View>
                <Back/>
                <img src={'https://i.pinimg.com/736x/ea/95/5c/ea955c9ad298d181298025ee877b823f.jpg'}
                    style={{width: "100%"}}
                />
                <Button style={{ marginTop: 32 }}>Checkin NFC</Button>
            </View>
        </>
    )
}  