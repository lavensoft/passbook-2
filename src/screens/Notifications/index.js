import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button, Back } from '@components'
import { Link }  from "react-router-dom";
import { getDatabase, ref, onValue} from "firebase/database";

export const Notifications = ({ match, navigation }) => {
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'notifications/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            
            setNotifications(data || {});
        });
    }, []);

    return (
       <>   
            <View>
                <Title
                    title = "Notifications"
                />

                <ScrollView 
                    horizontal
                >
                    <GridView
                        itemCount = {1}
                        items={
                            // eslint-disable-next-line array-callback-return
                            Object.keys(notifications)?.map((key, index) => {
                                let item = notifications[key];

                                if(item.to === JSON.parse(localStorage.getItem("@user")).email) {
                                    return (
                                        <Link to={`/notifications/${key}`}>
                                            <div key={`item-notification-${index}`} style={{position: "relative"}}>
                                                <img src={item.icon} style={{width: 54, borderRadius: "50%", height: 54 }}/>
                                                <label style={{position: "absolute", top: "10px", left: "23%", color: "#000", fontSize: 15}}>{item.content}</label>
                                            </div>
                                        </Link>
                                    )
                                }
                            }
                        )}
                    />
                </ScrollView>
            </View>
        </>
    )
}  