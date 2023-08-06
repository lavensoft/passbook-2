import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextInput, View, Title, Button, TextArea, SelectBox, Back } from '@components';
import API from '@api';
import { usePlug } from '@hooks';
import Swal from "sweetalert2";
import { Principal } from '@dfinity/principal';

export const Exchange = () => {
    const { ticketIdParam } = useParams();
    const { principal, accountId, getBalance, actor } = usePlug();

    const [ticket, setTicket] = useState("");
    const [principalIdUserSend, setPrincipalIdUserSend] = useState("");
    const [principalIdUserRecieve, setPrincipalIdUserRecieve] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const ticket = await API.NFT.get(ticketIdParam);
        const tokens = await API.NFT.getAll();

        let ownedNFT = await API.NFT.getOwned();
        
        setTicket(ticket);
    }

    const handleExchange = async () => {
        const principalId = window.ic.plug.sessionManager.sessionData.principalId;
        console.log({
            principalIdUserSend,
            principalIdUserRecieve,
        });

        try {

            await API.NFT.transfer(Principal.fromText(principalId.trim()), Principal.fromText(principalIdUserRecieve.trim()), parseFloat(ticket.price));
        } catch (error) {
            
        }


        

        Swal.fire(
            'Cập nhật thành công!',
            'Thông tin của bạn đã được cập nhật',
            'success'
        );
    }

    const image = "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover";

    return (
        <View>
            <Back to={`/items/${ticketIdParam}`}/>
            <Title
                title="Exchange NFT"
            />

            <TextInput onChange={(e) => setPrincipalIdUserRecieve(e.target.value)} placeholder="Enter id to user" type="text"/>

            <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${ ticket.image })`, width: '100%', height: 300, marginTop: 12 }}></div>

            <TextInput disabled onChange={(e) => setPrincipalIdUserSend(e.target.value)} value={ticket.price} placeholder={ticket.price} type="number"/>
            
            <Button style={{ marginTop: 32 }} onClick={handleExchange}>Send</Button>
        </View>
    )
}