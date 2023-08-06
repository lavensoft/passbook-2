import React from "react";
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';

//  <Button style={{marginTop: 32, backgroundColor : "red" }} to="">Create sale events</Button>
const image = "https://d2vi0z68k5oxnr.cloudfront.net/b6ed8c16-cfe5-4c28-a23b-8bef0715972e/original.png?d=sm-cover";

export const Notify = () => {
    return (
        <>
            <View>
                <Title
                    subtitle=""
                    title="Notify"
                />
                <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${image})` }}>
                    <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={() => {}} />
                    <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!image && 'Upload ảnh'}</label>
                </div>
                <Title
                    title="Vé xem phim"
                    className = "Notify__nameTicket"
                    style ={{textAlign: 'center', fontSize: '20px'}}
                />
                <Title
                    subtitle="Bạn đã được nhận 1 vé xem phim từ Min Kiên"
                    className = "Notify__Describe"
                    style ={{textAlign: 'center', fontSize: 14 }}
                />
                <Button style={{marginTop: 32, backgroundColor : "red" }} to="">Từ chối</Button>  
                <Button style={{marginTop: 32, backgroundColor : "green" }} to="">Chấp nhận</Button>  
            </View>
        </>
    )
}