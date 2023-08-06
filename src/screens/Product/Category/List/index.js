import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { useNavigationType, useParams } from 'react-router-dom';
import { Config } from '@config';
import { AppBar, View, Title, ProductCard, ScrollView, GridView } from '@components';
import API from '@api';
import Screens from '@screens';

import "./styles.scss";

export const ProductCategoryList = ({ title, id }) => {
    let { categoryId } = useParams();
    const [ NFTs, setNFTs ] = useState([]);
    const [ categoryTitle, setCategoryTitle ] = useState("");
    const [ categorySubtitle, setCategorySubtitle ] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        switch(categoryId) {
            case 'coming' : {
                //*Fetch NFTs
                let nfts = await API.NFT.getOwned();

                nfts = nfts.filter(item => {
                    let nftDate = new Date(item.date);
                    let dateNow = new Date();

                    return (
                        nftDate.getDate() == dateNow.getDate() &&
                        nftDate.getMonth() == dateNow.getMonth() &&
                        nftDate.getFullYear() == dateNow.getFullYear()
                    )
                })

                setNFTs(nfts);
                setCategoryTitle("Sự kiện");
                setCategorySubtitle("Sự kiện sắp diễn ra");
            } break;
            case 'all' : {
                //*Fetch NFTs
                let nfts = await API.NFT.getOwned();

                setNFTs(nfts);
                setCategoryTitle("NFTs");
                setCategorySubtitle("NFTs và Vé của bạn");
            } break;
            default : {
                //*Fetch NFTs
                let nfts = await API.NFT.getAll();

                //*Filter by category 
                nfts = nfts.filter(item => item.category == categoryId && item.createdBy.toString() == item.owner.toString());
        
                setNFTs(nfts);
        
                //*Set titles
                let categoryTitle = Config.VARIABLES.TICKET_CATEGORIES.find(item => item.value === categoryId).label;
        
                setCategoryTitle(categoryTitle);
                setCategorySubtitle("Category");
            } break;
        }
    }

    return (
        <>
            {/* PRODUCT INFORMATION */}
            {/* <AnimatePresence>
                {categoryId && <Screens.Product.Information id={categoryId}/>}
            </AnimatePresence> */}

            <View headerPadding>
                <AppBar.AppBar 
                    leading={
                        <AppBar.ActionBack />
                    }
                    title={ categoryTitle }
                    fixed
                />

                <Title
                    subtitle={ categorySubtitle }
                    title={ categoryTitle }
                />

                <ScrollView
                    horizontal
                >
                    <GridView
                        items={
                            NFTs.map((item, index) => {
                                let nft = item;

                                return <ProductCard 
                                    title={ nft?.name } 
                                    owner={ "OWNER" } 
                                    price={ nft?.price } 
                                    image={ nft?.image } 
                                    to={`/items/${item.id}`}
                                />
                            }
                        )}
                    />
                </ScrollView>
            </View>
        </>
    )
}