import React, { useState, useEffect } from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import Screens from '@screens';
import { IoSearch } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { Config } from '@config';
import API from '@api';

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export const ProductMarket = () => {
    let { itemId } = useParams();

    const [tickets, setTickets] = useState([]);
    const [categories, setCategories] = useState({});
    const [hotTickets, setHotTickets] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch NFTs
        let nfts = await API.NFT.getAll();

        
        //Filter owned
        nfts = nfts.filter(item => item.createdBy.email === item.owner.email && item.privacy === "public");

        setTickets(nfts);
        setHotTickets(shuffle(nfts));

        //*Group by category
        let categories = shuffle(nfts).groupBy('category')

        setCategories(categories);
    }
    
    return (
        <>
            {/* PRODUCT INFORMATION */}
            <AnimatePresence>
                {itemId && <Screens.Product.Information.Item id={itemId}/>}
            </AnimatePresence>

            <View>
                <Title
                    subtitle="Shop now !!!"
                    title="Marketplace"
                />

                <TextInput placeholder="Search" icon={<IoSearch/>}/>

                <Button style={{marginTop: 32}} to="/product/create">Create</Button>

                <Button style={{marginTop: 32}} to="/product/sale">Create sale events</Button>

                {/* <Button style={{marginTop: 32}} onClick={API.NFT.clearAll}>Clear All NFT</Button> */}

                {/* <SectionTitle
                    title="Categories nổi bật"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={[
                            <SquareCard overlay title="Art" to="/items/b" id={"bs"} style={{ marginTop: 0, width: 110 }} key={"sp-b"}/>,
                            <SquareCard overlay title="Art" to="/items/c" id={"cs"} style={{ marginTop: 0, width: 110 }} key={"sp-c"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"sp-ds"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"sp-d"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"sp-dd"}/>
                        ]}
                    />
                </ScrollView> */}

                <SectionTitle
                    title="Chương trình nổi bật"
                />

                <FeatureCard to={`/items/${tickets[0]?.id}`} image={tickets[0]?.image}/>

                <SectionTitle
                    title="Hot Events"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={
                            tickets.map((item, index) => {
                                let nft = item;

                                return <ProductCard 
                                    title={ nft?.name } 
                                    owner={ `${nft?.author?.firstName || ""} ${nft?.author?.lastName || ""}` } 
                                    price={ nft?.price } 
                                    image={ nft?.image } 
                                    to={`/items/${item.id}`}
                                />
                            }
                        )}
                    />
                </ScrollView>

                <SectionTitle
                    title="Hot Event Highlights"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={
                            hotTickets.map((item, index) => {
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

                <SectionTitle
                    title="Categories nổi bật"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={
                            Object.values(categories).map((item, index) => {
                                let category = Config.VARIABLES.TICKET_CATEGORIES.find(category => {
                                    let itemCategory = item[0]?.category;

                                    return category.value === itemCategory;
                                });

                                let itemImages = item.map(nft => nft.image);
                                
                                return <CollectionCard title={ category.label } subtitle="Moodie #1753" images={ itemImages } to={`/products/categories/${ category.value }`}/>
                            })
                        }
                    />
                </ScrollView>
            </View>
        </>
    );
}