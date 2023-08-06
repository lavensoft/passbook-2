import React, { useEffect, useState } from 'react';
import { AppBar, View, Title, FeatureCard, SectionTitle, Button, SquareCard, GridView, ScrollView, GridView, ScrollView, ProductCard, TabBadge } from '@components';

import "./styles.scss";
import API from '../../api';
import { useParams } from 'react-router-dom';

export const ProfileScreen = () => {
    const { principalId } = useParams();
    const [ NFTs, setNFTs ] = useState([]);
    const [ userInfo, setUserInfo ] = useState({});
    const [ categories, setCategories ] = useState([]);
    const [ categorySelected, setCategorySelected ] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Set NFT
        let nftRes = await API.NFT.getAllOfUser(principalId);
        setNFTs(nftRes);

        //*Set categories
        //*Group by category
        let categories = nftRes.groupBy('category');
        setCategories(categories);

        //*Set User Info
        let userRes = await API.User.get(principalId);
        setUserInfo(userRes[0]);
    }

    return (
        <View style={{paddingTop: 96}}>
            <AppBar.AppBar 
                leading={
                    <AppBar.ActionBack />
                }
                title={ `${userInfo?.firstName || ""} ${userInfo?.lastName || ""}` }
                fixed
            />

            <div className="profile-view">
                <div className="profile-view__user-info-container">
                    <div className="profile-view__user-info-container__background" style={{backgroundImage: `url(${ userInfo?.background })`}}></div>
                    <div className="profile-view__user-info-container__user-info">
                        <div className="profile-view__user-info-container__user-info__avatar" style={{background: `url(${ userInfo?.avatar }) no-repeat center center / cover`}}></div>
                        <div style={{ position: "relative", width: "100%" }} className="profile-view__user-info-container__user-info__detail">
                            <span className="profile-view__user-info-container__user-info__detail__name">{userInfo?.firstName || ""} {userInfo?.lastName || ""}</span>
                            <span className="profile-view__user-info-container__user-info__detail__principal">{ userInfo?.id?.toString() }</span>
                            <Button to={`/swap/${principalId}`} style={{ marginTop: 12 }}>SWAP NFT</Button>
                        </div>
                    </div>
                </div>

                <TabBadge.Group>
                    <TabBadge.Badge active={ categorySelected == "all" } onClick={() => setCategorySelected("all")}>All</TabBadge.Badge>
                    {
                        Object.keys(categories).map((item, index) => {
                            return <TabBadge.Badge active={ categorySelected == item }  onClick={() => setCategorySelected(item)} key={`tab-badge-item-${index}`}>{ item }</TabBadge.Badge>
                        })
                    }
                </TabBadge.Group>

                <ScrollView>
                    <GridView
                        items={
                            NFTs.map((item, index) => {
                                let nft = item;

                                if(categorySelected == "all" || item.category == categorySelected) {
                                    return <ProductCard 
                                        title={ nft?.name } 
                                        owner={ "OWNER" } 
                                        price={ nft?.price } 
                                        image={ nft?.image } 
                                        to={`/items/${item.id}`}
                                        key={`item-id-${index}`}
                                    />
                                }
                            }
                        )}
                    />
                </ScrollView>
            </div>
        </View>
    )
}