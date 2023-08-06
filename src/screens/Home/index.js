import React, { useState, useEffect } from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useNavigationType, useParams } from 'react-router-dom';
import { IoScan } from 'react-icons/io5';
import { AppBar, View, Title, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ListView, BalanceCard, Button } from '@components';
import Screens from '@screens';
import { usePlug } from '@hooks';
import API from '@api';
import { Config } from '@config';

export const HomeScreen = ({ match, navigation }) => {
    let { ticketId } = useParams();
    const [ balance, setBalance ] = useState(0);
    const [ ownedTickets, setOwnedTickets ] = useState([]);
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();
    const [ userInfo, setUserInfo ] = useState({ });

    useEffect(() => {
       fetchData();
    }, []);


    const fetchData = async () => {
      //   //*Fetch balance
      let balance = 10000000;
      setBalance(balance);

      //   //*Check preorder;
      //   await API.NFT.checkPreorders();

        let ownedNFT = await API.NFT.getOwned();

        setOwnedTickets(ownedNFT);

      //   //*Fetch User
      //   let user = await API.User.get();

      //   setUserInfo(user[0]);
    }   

    return (
        <>
            {/* PRODUCT INFORMATION */}
            <AnimatePresence>
                {ticketId && <Screens.Product.Information.Ticket id={ticketId}/>}
            </AnimatePresence>

            {/* HOME SCREEN */}
            <View>
                <AppBar.AppBar 
                    leading={
                        <AppBar.ActionButton icon={<IoScan/>} to="/qr_scan"/>
                    }
                    actions={
                        <AppBar.AvatarImage image={JSON.parse(localStorage.getItem("@user")).picture}/>
                    }
                />

                <BalanceCard balance={balance}/>

                {/* <Button style={{marginTop: 32}} onClick={() => {
                    let value = 1000;

                    API.PCB.mint(value);
                    setBalance(balance + value);
                }}>Mua Coin</Button> */}

                <Title
                    subtitle={`Xin chào ${JSON.parse(localStorage.getItem("@user")).name}`}
                    title="Sự kiện nổi bật"
                />

                <FeatureCard to={`/items/${ownedTickets[0]?.id}`} id={ownedTickets[0]?.id} image={ownedTickets[0]?.image }/>

                <SectionTitle
                    title="Sự kiện sắp diễn ra"
                    readMoreUrl="/products/categories/owned/coming"
                    readMoreTitle="Xem thêm"
                />

                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={
                            ownedTickets.map((item, index) => {
                                let nft = item;

                                return <SquareCard 
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
                    title="NFTs"
                    readMoreUrl="/products/categories/owned/all"
                    readMoreTitle="Xem thêm" 
                />

                <ListView.List
                    items={
                        ownedTickets.map((item, index) => {
                            let nft = item;

                            return <ListView.ListTile
                                leading={
                                    <ListView.ListTileImage id={`${nft?.id}`} src={ nft?.image }/>
                                }
                                title={ nft?.name }
                                subtitle={ nft?.description }
                                to={`/items/${nft?.id}`}
                                id={`${nft?.id}`}
                            />
                        })
                    }
                />
            </View>
        </>
    )
}