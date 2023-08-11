import React, { useEffect, useState } from 'react';
import { View, Ticket, ActionsGroup, CreatorCard, PriceTitle, SectionDivider, Button, SectionTitle, InformationGroup, TextInput, AppBar } from '@components';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Config } from "@config";
import * as Icon from 'react-icons/io5';
import API from '@api';
import Swal from 'sweetalert2';
import { getDatabase, ref, set } from "firebase/database";
import { randomStr } from '@utils';

import "./styles.scss";

export const ItemInformation = ({ title, id }) => {
   const [itemData, setItemData] = useState({});
   const [isOwned, setIsOwned] = useState(false);
   const [isTicket, setIsTicket] = useState(false);
   const [qrValue, setQRValue] = useState(null);
   const [amount, setAmount] = useState(1);
   const [category, setCategory] = useState(null);

   const actions = [
      {
         name: "Send",
         icon: <Icon.IoSendOutline />
      },
      {
         name: "Save",
         icon: <Icon.IoBookmarkOutline />
      },
      {
         name: "Star",
         icon: <Icon.IoStarOutline />
      },
      {
         name: "Share",
         icon: <Icon.IoShareOutline />
      },
   ]

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      //*Fetch NFTs
      let nft = await API.NFT.get(id);

      console.log(nft);

      setItemData(nft);
      setIsOwned(nft.owned);
      setIsTicket(nft.nftType === "ticket");

      //*Generate QR Ticket
      if (nft.nftType === "ticket" && nft.owned && (nft.owner.publicKey != nft.createdBy.publicKey)) setQRValue(`${nft.id}#${nft.owner.publicKey}`)

      //*Get category
      let category = Config.VARIABLES.TICKET_CATEGORIES.find(item => item?.value == nft.category)?.label;
      setCategory(category);
   }

   const handlePurchase = async () => {
      const db = getDatabase();

      await API.NFT.purchase(itemData, amount).then(async res => {
         Swal.fire(
            'Đã mua thành công!',
            'Vé đã nằm trong ví của bạn',
            'success'
         );

         let fromData = JSON.parse(localStorage.getItem("@user"));

         set(ref(db, 'notifications/' + randomStr(20)), {
            from: fromData.email,
            to: itemData.createdBy.email,
            content: `${fromData.name} đã mua vé sự kiện của bạn`,
            icon: fromData.picture
         });
      });
   }


   const handleClick = (action) => {
      switch (action.name) {
         case "Send":
            console.log(itemData);
            window.location.href = `#/exchange/${itemData.id}`;
            break;
         default:
            break;
      }
   }

   if (!itemData.createdBy) return null;


   return (
      <View className="item-information-screen" overlay layoutId={`card-container-${id}`} backdropImage={itemData?.image} style={{ backgroundColor: '#f5f5f5', paddingTop: 86 }}>
         <AppBar.AppBar
            leading={
               <AppBar.ActionBack />
            }
            title={`${itemData?.name}`}
            fixed
         />
         <motion.div className="card-content" style={{ width: '100%' }} animate>
            <motion.img
               className="card-image-container"
               layoutId={`card-image-container-${id}`}
               src={itemData?.image}
               style={{
                  marginTop: 0
               }}
            />
            <motion.div
               className="title-container"
               layoutId={`title-container-${id}`}
            >
               <span className="category"></span>
               {
                  itemData?.liveStream && isOwned &&
                  <Button style={{ marginTop: 32 }} to="/live">Watch livestream</Button>
               }
            </motion.div>
            <motion.div className="content-container" animate>
               <motion.span className="title">{itemData?.name}</motion.span>
               <PriceTitle price={itemData?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} currency={Config.TOKEN.SYMBOL} />
               <CreatorCard to={`/users/${itemData?.createdBy.publicKey}`} image={itemData?.author?.picture} name={`${itemData?.author?.name || ""} ${itemData?.author?.lastName || ""}`} />
               <ActionsGroup.Group>
                  {actions.map((action, index) => {
                     return <ActionsGroup.Button key={index} onClick={() => handleClick(action)} name={action.name} icon={action.icon} />
                  })}

                  {/* <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Send" icon={<Icon.IoSendOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Save" icon={<Icon.IoBookmarkOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Star" icon={<Icon.IoStarOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Share" icon={<Icon.IoShareOutline/>}/> */}
               </ActionsGroup.Group>

               {!isOwned && <h4>Supply</h4>}

               {
                  !isOwned &&
                  <TextInput defaultValue={1} onChange={e => setAmount(Number(e.target.value))} type="number" />
               }

               <SectionDivider />

               {!isOwned &&
                  <Button onClick={handlePurchase}>Buy</Button>}

               <SectionTitle title="Description" style={{ marginTop: 40 }} />

               <p style={{ margin: 0, marginTop: 16, fontSize: 14 }}>{itemData?.description}</p>

               <SectionTitle title="Details" style={{ marginTop: 40 }} />

               <InformationGroup.Group>
                  {
                     itemData?.details?.split("\n").map((item, index) => {
                        let title = item?.split(":")[0];
                        let value = item?.split(":")[1];

                        return <InformationGroup.Item
                           title={title}
                           value={value}
                           key={`information-group-item-${index}`}
                        />
                     })
                  }
                  {
                     itemData?.gifts?.map((item, index) => {
                        return <InformationGroup.Item
                           title={item?.name}
                           subtitle={item?.description}
                           image={item?.image}
                           to={`/items/${item.id}`}
                           key={`information-group-gift-item-${index}`}
                        />
                     })
                  }
               </InformationGroup.Group>

               {
                  !isTicket && (
                     <>
                        <SectionTitle title="Information" style={{ marginTop: 40 }} />

                        <InformationGroup.Group>
                           <InformationGroup.Item
                              title="Created At"
                              value={itemData?.dateCreated}
                           />
                           <InformationGroup.Item
                              title="Token ID"
                              value={itemData?.id}
                           />
                        </InformationGroup.Group>
                     </>
                  )
               }

               {isTicket && <Ticket
                  title={itemData?.name}
                  description={itemData?.description}
                  place={itemData?.place}
                  date={itemData?.date}
                  time={itemData?.time}
                  datePre={itemData?.date}
                  timePre={itemData?.time}
                  price={itemData?.price}
                  section={itemData?.section}
                  seat={itemData?.seat}
                  order={itemData?.order}
                  qrValue={qrValue}
                  preorder={`${(itemData?.preorder.preorder || null) && `${itemData?.preorder.end} ${itemData?.preorder.endTime}`}`}
                  supplies={itemData?.supplies.toString()}
                  checkin={itemData?.checkin}
                  category={category}
               />}
               {/* <Button style={{ marginTop: 32 }} to={'/checkin'}>Check in</Button> */}
            </motion.div>
         </motion.div>
      </View>
   )
}