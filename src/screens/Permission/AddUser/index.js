import React from "react";
import { useState } from "react";
import { View, Title, ScrollView, GridView, UserCard, Button, TextInput, View, Back } from '@components';

import "./styles.scss";

export const AddUser = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState([]);

    const handleUploadImage = async (e) => {
        //*Image Upload
        let file = e.target.files[0];
        let fileBlob = URL.createObjectURL(file);
        let imageBuffer = [...new Uint8Array(await file.arrayBuffer())];

        setImagePreview(fileBlob);

        let uploadRes = await API.IPFS.uploadImage(file);

        setImageUrl(uploadRes);
    }
    
    return (
        <>
            <View>
                <Back/>
                <Title
                    subtitle=""
                    title="Add User"
                >
                </Title>
                
                <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${imagePreview})` }}>
                    <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={handleUploadImage} />
                    <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!imagePreview && 'Upload image'}</label>
                </div>
                <div>
                    <TextInput type="text" className="nft-create__name" placeholder="First name"></TextInput>
                </div>
                <div>
                    <TextInput type="text" className="nft-create__name" placeholder="Last name"></TextInput>
                </div>
                <div>
                    <div style={{marginTop: "10px", marginLeft: "10px"}}>
                        <label style={{fontSize: "14px"}}>Male:</label>
                        <input type="radio" id="male" name="radioButton" value="male" style={{marginLeft: "5px"}}></input>
                        <label style={{fontSize: "14px", marginLeft: "5px"}}>Female:</label>
                        <input type="radio" id="female" name="radioButton" value="female" style={{marginLeft: "5px"}}></input>
                    </div>
                </div>
                <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date" />
                <TextInput placeholder="Phonenumber" type="text" />
                <TextInput placeholder="Address" type="text" />
                <Button style={{ marginTop: 32 }}>Save</Button>
            </View>
        </>
    );
};