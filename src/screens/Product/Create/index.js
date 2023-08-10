import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, Title, Button, TextArea, SelectBox, Notification, Back } from '@components';
import { Config } from '@config';
import { usePlug } from '@hooks';
import API from '@api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import "./styles.scss";
import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createMint, getAccount, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { SolanaContext } from '../../../context';
import { getMintAccount } from '@elusiv/sdk';

export const NFTCreateScreen = () => {
    const { principal } = usePlug();
    const navigate = useNavigate();

    const [ display, setDisplay ] = useState(false);

    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState([]);

    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [gifts, setGifts] = useState([]);
    const [type, setType] = useState(Config.VARIABLES.TICKET_TYPES[0].value);
    const [category, setCategory] = useState(Config.VARIABLES.TICKET_CATEGORIES[0].value);
    const [details, setDetails] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const [preorder, setPreorder] = useState({
        preorder: false,
        cashback: 0,
        end: "",
        endTime: "",
        gifts: []
    });
    const [privacy, setPrivacy] = useState("public");
    const [supplies, setSupplies] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const wallet = useContext(SolanaContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch NFTs
        const NFTs = await API.NFT.getCreatedNFTs();

        setNFTs(NFTs);
    }

    const handleUploadImage = async (e) => {
        //*Image Upload
        let file = e.target.files[0];
        let fileBlob = URL.createObjectURL(file);

        setImagePreview(fileBlob);

        let uploadRes = await API.IPFS.uploadImage(file);

        setImageUrl(uploadRes.data.url);
    }

    const handleSubmit = async () => {
      //   await API.NFT.mint(
      //       name,
      //       imageUrl,
      //       place,
      //       date,
      //       time,
      //       price,
      //       description,
      //       gifts,
      //       details,
      //       type,
      //       category,
      //       privacy,
      //       preorder,
      //       supplies
      //   );

      //   Swal.fire(
      //       'Tạo thành công!',
      //       '',
      //       'success'
      //   ).then(e => {
      //       navigate(-1);
      //   });

      //*========= [ CREATE FUG TOKEN ] =========
      // const payer = Keypair.generate();
      // const mintAuthority = Keypair.generate();
      // const freezeAuthority = Keypair.generate();

      // const connection = new Connection(
      //    clusterApiUrl(Config.NETWORK),
      //    'confirmed'
      // );
   
      // const airdropSignature = await connection.requestAirdrop(
      //    payer.publicKey,
      //    LAMPORTS_PER_SOL,
      // );
       
      // await connection.confirmTransaction(airdropSignature);

      // const mint = await createMint(
      //    connection,
      //    payer,
      //    mintAuthority.publicKey,
      //    freezeAuthority.publicKey,
      //    9 // We are using 9 to match the CLI decimal default exactly
      // );   

      // console.log(`NFT: ${mint.toBase58()}`)

      // //Create token account
      // const tokenAccount = await getOrCreateAssociatedTokenAccount(
      //    connection,
      //    payer,
      //    mint,
      //    wallet.publicKey
      // )

      // console.log(`TOKEN ACCOUNT: ${tokenAccount.address.toBase58()}`);

      // await mintTo(
      //    connection,
      //    payer,
      //    mint,
      //    tokenAccount.address,
      //    mintAuthority,
      //    100000000000 // because decimals for the mint are set to 9 
      // )
    }

    const handleSelectGift = async (id) => {
        let giftData = NFTs.find(item => item.id == id);

        giftData = {
            id: giftData.id,
            name: giftData.name,
            description: giftData.description,
            price: giftData.price,
            createdBy: giftData.createdBy,
            image: giftData.image
        }

        setGifts([giftData]);
    }

    // Chua viet back nha
    const check = (e) => {
        if (e.target.checked) {
            setDisplay(true)
        }
        else {
            setDisplay(false)
        }
    }

    return (
        <View>
            <Back to="/products"/>
            <Title
                title="Create NFT"
            />

            <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${imagePreview})` }}>
                <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={handleUploadImage} />
                <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!imagePreview && 'Upload ảnh'}</label>
            </div>


            <SelectBox onChange={e => setType(e.target.value)} options={Config.VARIABLES.TICKET_TYPES} />

            <SelectBox onChange={e => setCategory(e.target.value)} options={Config.VARIABLES.TICKET_CATEGORIES} />

            <TextInput onChange={e => setName(e.target.value)} placeholder="Tên" />

            {type == "ticket" && <TextInput onChange={e => setPlace(e.target.value)} placeholder="Địa chỉ" />}

            {type == "ticket" && <TextInput onChange={e => setDate(e.target.value)} placeholder="Ngày diễn ra" type="date" />}

            {type == "ticket" && <TextInput onChange={e => setTime(e.target.value)} placeholder="Thời gian" type="time" />}

            <TextInput onChange={e => setPrice(e.target.value)} placeholder="Giá" type="number" />

            <TextInput onChange={e => setSupplies(Number(e.target.value))} placeholder="Số lượng" type="number" />

            <SelectBox options={[{value: "public", label: "Công khai"}, {value: "private", label: "Ẩn"}]} onChange={e => setPrivacy(e.target.value)}/>

            <SelectBox onChange={e => handleSelectGift(e.target.value)} placeholder="Gift" options={NFTs.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })} />

            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                <label style={{
                    fontSize: "14px",
                }}>Preoder</label>
                <input type="checkbox" style={{ marginTop: "7px", marginLeft: "10px" }} onChange={check}></input>
            </div>

            {display && <div>
                <TextInput onChange={e => setPreorder({
                    ...preorder,
                    preorder: true,
                    end: e.target.value
                })} placeholder="Ngày publish" type="date" />

                <TextInput onChange={e => setPreorder({
                    ...preorder,
                    preorder: true,
                    endTime: e.target.value
                })} placeholder="Thời gian publish" type="time" />
                
                <SelectBox onChange={e => setPreorder({
                    ...preorder,
                    preorder: true,
                    gifts: [e.target.value]
                })} placeholder="Gift" options={NFTs.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })} />

                <TextInput onChange={e => setPreorder({
                    ...preorder,
                    preorder: true,
                    cashback: Number(e.target.value)
                })} placeholder="Hoàn tiền" type="number" />
            </div>}

            <TextArea onChange={e => setDescription(e.target.value)} placeholder="Mô tả" />

            <TextArea onChange={e => setDetails(e.target.value)} placeholder="Chi tiết" />

            {isLoading ? <Button style={{ marginTop: 32 }} onClick={handleSubmit}>Loading ...</Button> : <Button style={{ marginTop: 32 }} onClick={handleSubmit}>Save</Button>}
        </View>
    )
}