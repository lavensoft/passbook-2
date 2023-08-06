import React, { useState, useEffect } from 'react';
import { TextInput, View, Title, Button, TextArea, SelectBox, Back } from '@components';

import "./styles.scss";

export const CreateSaLeEvents = () => {

    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [NFT, setNFT] = useState("");
    const [priceSale, setPriceSale] = useState(0);
    const [suplies, setSuplies] = useState(0);

    const handleSubmit = () => {
        console.log({ 
            dateStart,
            dateEnd,
            NFT,
            priceSale,
            suplies, 
            NFT
        })
    }

    return(
        <View>
            <Back/>
            <Title
                title="Create sale events"
            />
            <div style={{marginTop: "30px", marginLeft: "10px", fontWeight: 600}}>Ngày bắt đầu</div>
                <TextInput onChange={e => setDateStart(e.target.value)} placeholder="Date" type="date" />
            <div style={{marginTop: "20px", marginLeft: "10px", fontWeight: 600}}>Ngày kết thúc</div>
            
            <TextInput onChange={e => setDateEnd(e.target.value)} placeholder="Date" type="date" />
             
            <SelectBox onChange={(e) => {
                setNFT(e.target.value);
            }} options={[{ id:1, value: "nft", label: "nft" }, { id:2, value: "nhat", label: "nhat" }]}/>
            
            <TextInput onChange={e => setPriceSale(e.target.value)} placeholder="Price sale" type="number"/>
            
            <TextInput onChange={e => setSuplies(e.target.value)} placeholder="Suplies" type="number"/>
            
            <Button onClick={handleSubmit} style={{ marginTop: 32 }}>Save</Button>
        </View>
    )
}