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
            icon:  <Icon.IoSendOutline/>
        },
        {
            name: "Save",
            icon:  <Icon.IoBookmarkOutline/>
        },
        {
            name: "Star",
            icon:  <Icon.IoStarOutline/>
        },
        {
            name: "Share",
            icon:  <Icon.IoShareOutline/>
        },
    ]

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      //   //*Fetch NFTs
      //   let nft = await API.NFT.get(id);

      //   setItemData(nft);
      //   setIsOwned(nft.owned);
      //   setIsTicket(nft.nftType === "ticket");

      //   console.log("A");

      //   //*Generate QR Ticket
      //   if(nft.nftType === "ticket" && nft.owned && ( nft.owner.toString() != nft.createdBy.toString() )) setQRValue(`${nft.id}#${nft.owner}`)
    
      //   //*Get category
      //   console.log(Config.VARIABLES.TICKET_CATEGORIES);
      //   let category = Config.VARIABLES.TICKET_CATEGORIES.find(item => item?.value == nft.category)?.label;
      //   setCategory(category);
    }

    const handlePurchase = async () => {
        const db = getDatabase();

        await API.NFT.purchase(id, amount).then(async res => {
            Swal.fire(
                'Đã mua thành công!',
                'Vé đã nằm trong ví của bạn',
                'success'
            );

            let fromData = await API.User.get();

            set(ref(db, 'notifications/' + randomStr(20)), {
                from:" window.ic.plug.sessionManager.sessionData.principalId",
                to: res.createdBy.toString(),
                content: "Hello From Nhats",
                icon: fromData[0]?.avatar
            });
        });
    }


    const ticketMeta = itemData;

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


    return (
        <View className="item-information-screen" overlay layoutId={`card-container-${id}`} backdropImage={ ticketMeta?.image } style={{backgroundColor: '#f5f5f5', paddingTop: 86}}>
            <AppBar.AppBar 
                leading={
                    <AppBar.ActionBack />
                }
                title={ `${ticketMeta?.name}` }
                fixed
            />
            <motion.div className="card-content" style={{width: '100%'}} animate>
                <motion.div
                    className="card-image-container"
                    layoutId={`card-image-container-${id}`}
                    style={{
                        backgroundImage: `url(${ticketMeta?.image})`
                    }}
                >
                </motion.div>
                <motion.div
                    className="title-container"
                    layoutId={`title-container-${id}`}
                >
                    <span className="category"></span>
                    <h2>Meebit #15326</h2>
                </motion.div>
                <motion.div className="content-container" animate>
                    <motion.span className="title">{ ticketMeta?.name }</motion.span>
                    <PriceTitle price={ ticketMeta?.price } currency={ Config.TOKEN.SYMBOL } />
                    <CreatorCard to={`/users/${ticketMeta?.createdBy}`} image={ticketMeta?.author?.avatar} name={ `${ticketMeta?.author?.firstName || ""} ${ticketMeta?.author?.lastName || ""}` }/>
                    <ActionsGroup.Group>
                        {actions.map((action, index) => {
                            return <ActionsGroup.Button key={index} onClick={() => handleClick(action)} name={action.name} icon={action.icon}/>
                        })}

                        {/* <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Send" icon={<Icon.IoSendOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Save" icon={<Icon.IoBookmarkOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Star" icon={<Icon.IoStarOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Share" icon={<Icon.IoShareOutline/>}/> */}
                    </ActionsGroup.Group>

                    { !isOwned && <h4>Số lượng</h4> }

                    {
                        !isOwned && 
                        <TextInput defaultValue={1} onChange={e => setAmount(Number(e.target.value))} type="number"/>
                    }

                    <SectionDivider/>

                    { !isOwned && 
                        <Button onClick={handlePurchase}>Buy</Button> }

                    <SectionTitle title="Description" style={{ marginTop: 40 }}/>

                    <p style={{ margin: 0, marginTop: 16, fontSize: 14}}>{ ticketMeta?.description }</p>

                    <SectionTitle title="Details" style={{ marginTop: 40 }}/>

                    <InformationGroup.Group>
                        {
                            ticketMeta?.details?.split("\n").map((item, index) => {
                                let title = item?.split(":")[0];
                                let value = item?.split(":")[1];

                                return <InformationGroup.Item 
                                    title={ title } 
                                    value={ value } 
                                    key={`information-group-item-${index}`}
                                />
                            })
                        }
                        {
                            ticketMeta?.gifts?.map((item, index) => {
                                return <InformationGroup.Item 
                                    title= { item?.name } 
                                    subtitle={ item?.description } 
                                    image={ item?.image }
                                    key={`information-group-gift-item-${index}`}
                                />
                            })
                        }
                    </InformationGroup.Group>

                    {
                        !isTicket && (
                            <>
                                <SectionTitle title="Information" style={{ marginTop: 40 }}/>

                                <InformationGroup.Group>
                                    <InformationGroup.Item 
                                        title = "Created At"
                                        value = { ticketMeta?.dateCreated }
                                    />
                                    <InformationGroup.Item 
                                        title = "Token ID"
                                        value = { ticketMeta?.id }
                                    />
                                </InformationGroup.Group>
                            </>
                        )
                    }

                    { isTicket && <Ticket
                        title={ ticketMeta?.name }
                        description={ ticketMeta?.description }
                        place={ ticketMeta?.place }
                        date={ ticketMeta?.date }
                        time={ ticketMeta?.time }
                        datePre={ ticketMeta?.date }
                        timePre={ ticketMeta?.time }
                        price={ ticketMeta?.price }
                        section={ ticketMeta?.section }
                        seat={ ticketMeta?.seat }
                        order={ ticketMeta?.order }
                        qrValue={ qrValue }
                        preorder={`${(ticketMeta?.preorder.preorder || null) && `${ticketMeta?.preorder.end} ${ticketMeta?.preorder.endTime}`}`}
                        supplies={ ticketMeta?.supplies.toString() }
                        checkin={ ticketMeta?.checkin }
                        category={ category }
                    /> } 
                    {/* <Button style={{ marginTop: 32 }} to={'/checkin'}>Check in</Button> */}
                </motion.div>
            </motion.div>
        </View>
    )
}