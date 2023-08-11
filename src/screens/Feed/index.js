import API from "@api";
import { Button, FeedCard, FeedForm, GridView, Modal, ScrollView, SquareCard, Title, View } from "@components"
import { SolanaContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const FeedPage = () => {
   const [showModal, setShowModal] = useState(false);
   const [ownNfts, setOwnNfts] = useState([]);
   const wallet = useContext(SolanaContext);
   const [nftSelected, setNftSelected] = useState("");
   const [image, setImage] = useState("");
   const [content, setContent] = useState("");
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const nfts = await API.NFT.getOwnedNft(wallet.publicKeyStr);
      const posts = await API.NFT.getAllFeed();

      console.log(nfts);

      setOwnNfts(nfts);
      setPosts(posts);
   }

   const handleClick = async (nft) => {
      setNftSelected(nft);
      setImage(nft.image);
      setShowModal(false);
   }

   const handleSend = async () => {
      await API.NFT.mintFeed(content, image, nftSelected.id);
      console.log("FEED DONE");

      setPosts(posts => [{
         content, image, owner: JSON.parse(localStorage.getItem("@user"))
      }, ...posts]);

      setImage("");
      setContent("");
   }

   const handleSwap = async (userKey, nftId) => {
      window.location.href=`/#/swap/${userKey}?nft=${nftId}`
   } 

   return (
      <View>
         <Title
            subtitle="What's hot?"
            title="Newsfeed"
         />
         <FeedForm
            onChangeText={e => setContent(e)}
            image={image}
            onClickMedia={() => setShowModal(true)}
            onSend={() => handleSend()}
         />
         {
            posts?.map((item) => {
               return (
                  <FeedCard
                     avatar={item?.owner?.picture}
                     username={item.owner.name}
                     content={item.content}
                     image={item.image}
                     onSwap={() => handleSwap(item.owner.publicKey, item.nft)}
                  />
               )
            })
         }
         {showModal && 
            <Modal>
                <div style={{ position: "relative", width: "80%", height: 300, backgroundColor: "#FFF", borderRadius: 6, padding: 20, overflow: "hidden" }}>
                    <div onClick={() => setShowModal(false)} style={{ position: "absolute", top: 0, right: 0, padding: 12 }}>
                        <AiFillCloseCircle size={20}/>
                    </div>
                     <span style={{
                        fontSize: 27,
                        color: "#232323",
                        fontWeight: 600
                     }}>NFTs</span>
                    <ScrollView
                        horizontal
                    >
                        <GridView
                            horizontal
                            items={
                              ownNfts.map((nft, index) => {

                                    return <SquareCard 
                                        onClick={() => handleClick(nft)}
                                        style={{ marginLeft: "auto", marginRight: "auto", marginTop: 12 }}
                                        title={ nft?.name } 
                                        owner={ "OWNER" } 
                                        price={ nft?.price } 
                                        image={ nft?.image } 
                                        to="#"
                                    />
                                }
                            )}
                        />

                        <Button style={{
                           marginTop: 30
                        }}>Upload your media</Button>
                        </ScrollView>
                </div>
            </Modal>}
      </View>
   )
}