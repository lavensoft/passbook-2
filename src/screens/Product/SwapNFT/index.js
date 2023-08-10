import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, Modal, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import API from "@api";
import { usePlug } from '@hooks';
import { Back } from "@components";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2"
import { SolanaContext } from "../../../context";


export const SwapNFT = () => {
   const { pricipalId } = useParams();
   const searchParams = useSearchParams();

   const [data, setData] = useState([])
   const [userNFT, setUserNFT] = useState("");
   const [otherNFT, setOtherNFT] = useState("");
   const [ticketOfUser, setTicketOfUser] = useState([]);
   const [ticketOfOther, setTicketOfOther] = useState([]);

   const [imagePreview, setImagePreview] = useState(null);
   const [imageUrl, setImageUrl] = useState([]);

   const [showModal, setShowModal] = useState(false);
   const [index, setIndex] = useState(0);


   const userRef = useRef(null);
   const otherRef = useRef(null);
   const wallet = useContext(SolanaContext);



   // const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();
   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const array1 = await API.NFT.getOwnedNft(wallet.publicKeyStr);
      const array2 = await API.NFT.getOwnedNft(pricipalId);

      setTicketOfUser(array1);
      setTicketOfOther(array2);

      const nftParam = searchParams?.[0]?.get("nft");

      if (nftParam) {
         const nft = array2.find(i => i.id == nftParam);
         if(nft) {
            otherRef.current.style['background-image'] = `url(${nft.image})`;
            setOtherNFT(nftParam);
         }
      }
   }

   useEffect(() => {
      console.log(index);
      if (index === 0) setData(ticketOfUser);
      else setData(ticketOfOther);
   }, [index, showModal]);


   const toggleModal = () => {
      setShowModal(!showModal);
   }

   const handleClick = (ticket) => {
      if (index === 0) {
         userRef.current.style['background-image'] = `url(${ticket.image})`;
         setUserNFT(ticket.id);
      }
      else {
         otherRef.current.style['background-image'] = `url(${ticket.image})`;
         setOtherNFT(ticket.id);
      }
      toggleModal();
   }

   const image = "";


   const handleSwap = async () => {
      await API.NFT.swap(userNFT, otherNFT);

      Swal.fire(
         'Swap successfully!',
         'success'
      );
   }

   return (
      <View style={{ position: "relative", margin: 0 }}>
         {showModal &&
            <Modal>
               <div style={{ position: "relative", width: "80%", height: 300, backgroundColor: "#FFF", borderRadius: 6, padding: 20, overflow: "hidden" }}>
                  <div onClick={() => toggleModal()} style={{ position: "absolute", top: 0, right: 0, padding: 12 }}>
                     <AiFillCloseCircle size={20} />
                  </div>
                  <span style={{
                     fontSize: 27,
                     color: "#232323",
                     fontWeight: 600
                  }}>NFTs</span>
                  {/* <ScrollView>
                        {data.map((ticket, index) => {
                            return (
                                // <div style={{ marginLeft: "auto", marginTop: 4, marginRight: "auto", width: "90%", height: 40, borderRadius: 6, borderStyle: "solid", borderWidth: 0.3, borderColor: "#CCC" }}>
                                // </div>
                                <SquareCard 
                                    onClick={() => handleClick(ticket)}
                                    style={{ marginLeft: "auto", marginRight: "auto", marginTop: 12 }}
                                    title={ ticket?.name } 
                                    owner={ "OWNER" } 
                                    price={ ticket?.price } 
                                    image={ ticket?.image } 
                                    to="#"
                                />
                            )
                        })}
                    </ScrollView> */}
                  <ScrollView
                     horizontal
                  >
                     <GridView
                        horizontal
                        items={
                           data.map((ticket, index) => {

                              return <SquareCard
                                 onClick={() => handleClick(ticket)}
                                 style={{ marginLeft: "auto", marginRight: "auto", marginTop: 12 }}
                                 title={ticket?.name}
                                 owner={"OWNER"}
                                 price={ticket?.price}
                                 image={ticket?.image}
                                 to="#"
                              />
                           }
                           )}
                     />
                  </ScrollView>
               </div>
            </Modal>}
         <Back to={`/users/${pricipalId}`} />
         <div style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12 }}>
            <div
               ref={userRef}
               onClick={(e) => {
                  e.preventDefault();
                  setIndex(0);
                  toggleModal();
               }}
               className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${image})`, flex: 1, margin: 4 }}>
               <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload"></label>
               <label id="image_lb" className="" htmlFor=""></label>
            </div>

            <div
               ref={otherRef}
               onClick={e => {
                  e.preventDefault();
                  setIndex(1);
                  console.log("Click")
                  toggleModal();
               }} className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${image})`, flex: 1, margin: 4 }}>
               <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload"></label>
               <label id="image_lb" className=""></label>
            </div>
         </div>
         <div onClick={handleSwap} style={{ marginBottom: "70px", display: "flex", justifyContent: "center" }}>
            <Button style={{ width: "100%" }} to="/">Swap</Button>
         </div>
      </View>
   )
} 