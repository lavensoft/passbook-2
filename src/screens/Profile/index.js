import React, { useEffect, useState } from 'react';
import { AppBar, View, Title, FeatureCard, SectionTitle, Button, SquareCard, GridView, ScrollView, ProductCard, TabBadge, FeedCard } from '@components';

import "./styles.scss";
import API from '../../api';
import { useParams } from 'react-router-dom';

export const ProfileScreen = () => {
   const { principalId } = useParams();
   const [NFTs, setNFTs] = useState([]);
   const [userInfo, setUserInfo] = useState({});
   const [categories, setCategories] = useState([]);
   const [categorySelected, setCategorySelected] = useState("nfts");
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      //*Set NFT
      let nftRes = await API.NFT.getOwnedNft(principalId);
      setNFTs(nftRes);

      //*Set categories
      //*Group by category
      //   let categories = nftRes.groupBy('category');
      //   setCategories(categories);

      //*Set User Info
      let userRes = nftRes[0].createdBy;
      setUserInfo(userRes);

      const posts = await API.NFT.getOwnedFeed(principalId);
      setPosts(posts);
   }

   return (
      <View style={{ paddingTop: 96 }}>
         <AppBar.AppBar
            leading={
               <AppBar.ActionBack />
            }
            title={`${userInfo?.name || ""}`}
            fixed
         />

         <div className="profile-view">
            <div className="profile-view__user-info-container">
               <div className="profile-view__user-info-container__background" style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/132/837/HD-wallpaper-mac-os-ventura-light-8k-macos-ventura-macbook-apple-computer.jpg)` }}></div>
               <div className="profile-view__user-info-container__user-info">
                  <div className="profile-view__user-info-container__user-info__avatar" style={{ background: `url(${userInfo?.picture}) no-repeat center center / cover` }}></div>
                  <div style={{ position: "relative", width: "100%" }} className="profile-view__user-info-container__user-info__detail">
                     <span className="profile-view__user-info-container__user-info__detail__name">{userInfo?.firstName || ""} {userInfo?.lastName || ""}</span>
                     <span className="profile-view__user-info-container__user-info__detail__principal">{userInfo?.id?.toString()}</span>
                     <Button to={`/swap/${principalId}`} style={{ marginTop: 12 }}>SWAP NFT</Button>
                  </div>
               </div>
            </div>

            <TabBadge.Group>
               <TabBadge.Badge active={categorySelected == "nfts"} onClick={() => setCategorySelected("nfts")}>NFTs</TabBadge.Badge>
               <TabBadge.Badge active={categorySelected == "posts"} onClick={() => setCategorySelected("posts")}>Posts</TabBadge.Badge>
            </TabBadge.Group>

            <ScrollView>
               {
                  categorySelected == "nfts" &&
                  <GridView
                        items={
                            NFTs.map((item, index) => {
                                let nft = item;

                                if(categorySelected == "nfts") {
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
               }
               {
                  categorySelected == "posts" &&
                  <div style={{
                     marginTop: 24
                  }}>
                     {
                        posts?.map((item) => {
                           return (
                              <FeedCard
                                 avatar={item.owner.picture}
                                 username={item.owner.name}
                                 content={item.content}
                                 image={item.image}
                                 onSwap={() => handleSwap(item.owner.publicKey, item.nft)}
                              />
                           )
                        })
                     }
                  </div>
               }
            </ScrollView>
         </div>
      </View>
   )
}