import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, Title, Button, TextArea, SelectBox, Notification, Back } from '@components';
import { Config } from '@config';
import { usePlug } from '@hooks';
import API from '@api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import "./styles.scss";
import { Connection, Keypair, LAMPORTS_PER_SOL, Transaction, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js';
import { AuthorityType, TOKEN_PROGRAM_ID, createMint, createSetAuthorityInstruction, getAccount, getOrCreateAssociatedTokenAccount, mintTo, setAuthority, transfer } from '@solana/spl-token';
import { SolanaContext } from '../../../context';
import { airdropToken, getMintAccount } from '@elusiv/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { Metaplex, bundlrStorage, keypairIdentity } from '@metaplex-foundation/js';

// import * as ed from '@noble/ed25519'
// import { sha512 } from '@noble/hashes/sha512'
// ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m))

export const NFTCreateScreen = () => {
   const { principal } = usePlug();
   const navigate = useNavigate();

   const [display, setDisplay] = useState(false);

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
   const walletCtx = useContext(SolanaContext);
   const [liveStream, setLiveStream] = useState(false);
   const [loading, setLoading] = useState(false);
   //  const { wallet } = useWallet();

   useEffect(() => {
      fetchData();

      //   console.log(wallet);
   }, []);

   const fetchData = async () => {
      //*Fetch NFTs
      const NFTs = await API.NFT.getCreatedNft(walletCtx.publicKeyStr);

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
      setLoading(true);
      // await API.NFT.transferToken("AhG3uPDG65p2pTXwUawW6Tpn5s4LFwQxfn9coPnvVaST", "", "9VWpu5PWXo85RJ8vc5punn8dsYGT4rFMhV9Vx5Sy3gpd")
      if (type == "ticket") {
         await API.NFT.mintTicket(
            walletCtx.publicKey,
            name,
            imageUrl,
            place,
            date,
            time,
            price,
            description,
            gifts,
            details,
            type,
            category,
            privacy,
            preorder,
            Number(supplies),
            liveStream
         );
      } else {
         await API.NFT.mintNFT(
            walletCtx.publicKey,
            name,
            imageUrl,
            price,
            description,
            details,
            type,
            category,
            privacy,
            Number(supplies)
         );
      }

      setLoading(false);

      Swal.fire(
         'Tạo thành công!',
         '',
         'success'
      ).then(e => {
         navigate(-1);
      });
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
         <Back to="/products" />
         <Title
            title="Create NFT"
         />

         <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${imagePreview})` }}>
            <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={handleUploadImage} />
            <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!imagePreview && 'Upload image'}</label>
         </div>


         <SelectBox onChange={e => setType(e.target.value)} options={Config.VARIABLES.TICKET_TYPES} />

         <SelectBox onChange={e => setCategory(e.target.value)} options={Config.VARIABLES.TICKET_CATEGORIES} />

         <TextInput onChange={e => setName(e.target.value)} placeholder="Name" />

         {type == "ticket" && <TextInput onChange={e => setPlace(e.target.value)} placeholder="Location" />}

         {type == "ticket" && <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date" />}

         {type == "ticket" && <TextInput onChange={e => setTime(e.target.value)} placeholder="Time" type="time" />}

         <TextInput onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" />

         <TextInput onChange={e => setSupplies(Number(e.target.value))} placeholder="Supply" type="number" />

         <SelectBox options={[{ value: "public", label: "Public" }, { value: "private", label: "Private" }]} onChange={e => setPrivacy(e.target.value)} />

         <SelectBox onChange={e => handleSelectGift(e.target.value)} placeholder="Gift" options={NFTs.map(item => {
            return {
               label: item.name,
               value: item.id
            }
         })} />

         {/* <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                <label style={{
                    fontSize: "14px",
                }}>Preoder</label>
                <input type="checkbox" style={{ marginTop: "7px", marginLeft: "10px" }} onChange={check}></input>
            </div> */}

         {
            type == "ticket" &&
            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
               <label style={{
                  fontSize: "14px",
               }}>Livestream</label>
               <input type="checkbox" value={liveStream} style={{ marginTop: "7px", marginLeft: "10px" }} onChange={e => setLiveStream(e.target.value)}></input>
            </div>
         }

         {display && <div>
            <TextInput onChange={e => setPreorder({
               ...preorder,
               preorder: true,
               end: e.target.value
            })} placeholder="Date" type="date" />

            <TextInput onChange={e => setPreorder({
               ...preorder,
               preorder: true,
               endTime: e.target.value
            })} placeholder="Time" type="time" />

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
            })} placeholder="Refund" type="number" />
         </div>}

         <TextArea onChange={e => setDescription(e.target.value)} placeholder="Mô tả" />

         <TextArea onChange={e => setDetails(e.target.value)} placeholder="Chi tiết" />

         <Button style={{ marginTop: 32 }} onClick={handleSubmit} loading={loading}>Save</Button>
      </View>
   )
}