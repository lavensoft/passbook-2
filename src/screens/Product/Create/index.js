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
import { getMintAccount } from '@elusiv/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { Metaplex, bundlrStorage, keypairIdentity } from '@metaplex-foundation/js';

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
    const walletCtx = useContext(SolanaContext);
   //  const { wallet } = useWallet();

    useEffect(() => {
        fetchData();

      //   console.log(wallet);
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

      console.log("Mining...");
      const connection = new Connection(
         clusterApiUrl(Config.NETWORK),
         'confirmed'
      );

      const fromWallet = Keypair.generate();

      console.log("Generate...");

      const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(fromWallet))
      .use(bundlrStorage());

      console.log("Plex...");
   
      const airdropSignature = await connection.requestAirdrop(
         fromWallet.publicKey,
         LAMPORTS_PER_SOL,
      );

      console.log("Airdrop...");
       
      await connection.confirmTransaction(airdropSignature);

      // // //*========= [ CREATE NFT ] ===============
      // const mint = await createMint(
      //    connection,
      //    fromWallet,
      //    fromWallet.publicKey,
      //    null,
      //    0
      // );

      // console.log(`NFT: ${mint.toBase58()}`);

      const { nft } = await metaplex.nfts().create({
         uri: "https://passbook.com/nhatsnfthehe",
         image: "https://i.imgur.com/K8gaTha.png",
         name: "My NFT 2",
         description: "My description 2",
         sellerFeeBasisPoints: 500, // Represents 5.00%.
     });

     console.log(nft);

     const mint = nft.mint.address;

     console.log(mint.toBase58());

      // Get the token account of the "fromWallet" Solana address. If it does not exist, create it.
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
         connection,
         fromWallet,
         mint,
         fromWallet.publicKey
      );

      console.log("CREATED");

      // Get the token account of the "toWallet" Solana address. If it does not exist, create it.
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
         connection,
         fromWallet,
         mint,
         walletCtx.publicKey
      );

      console.log("TO ACCOUNT");

      // Minting 1 new token to the "fromTokenAccount" account we just returned/created.
      let signature = await mintTo(
         connection,
         fromWallet,               // Payer of the transaction fees 
         mint,                     // Mint for the account 
         fromTokenAccount.address, // Address of the account to mint to 
         fromWallet.publicKey,     // Minting authority
         1                         // Amount to mint 
      );

      console.log("MITING 1");
      
      await setAuthority(
         connection,
         fromWallet,            // Payer of the transaction fees
         mint,                  // Account 
         fromWallet.publicKey,  // Current authority 
         0,                     // Authority type: "0" represents Mint Tokens 
         null                   // Setting the new Authority to null
      );

      console.log("AUTH");
      
      signature = await transfer(
         connection,
         fromWallet,               // Payer of the transaction fees 
         fromTokenAccount.address, // Source account 
         toTokenAccount.address,   // Destination account 
         fromWallet.publicKey,     // Owner of the source account 
         1                         // Number of tokens to transfer 
      );

      console.log(fromWallet.publicKey.toBase58());

      console.log("DONE!!!");

      // const nft = await metaplex.nfts().findByMint({ mintAddress: mint });
      // console.log(nft);

      // const { uri } = await metaplex.nfts().uploadMetadata({
      //    name: "My NFT",
      //    description: "My description",
      //    image: "https://i.imgur.com/K8gaTha.png",
      // });

      // console.log(uri);

      // await metaplex.nfts().update({ 
      //    nftOrSft: nft,
      //    name: "My Updated Name"
      // });
      // console.log("TRANSFERED");

      //*========= [ CREATE FUG TOKEN ] =========
      // const payer = Keypair.generate();
      // const mintAuthority = Keypair.generate();
      // const freezeAuthority = Keypair.generate();
   
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

      // console.log(`TOKEN: ${mint.toBase58()}`)

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