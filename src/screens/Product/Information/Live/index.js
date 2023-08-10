import { AppBar, View } from "@components"

export const LivePage = () => {
   return (
      <View style={{
         backgroundColor: "black",
         height: "100vh"
      }}>
         <AppBar.AppBar 
            black
            leading={
               <AppBar.ActionBack color={"white"}/>
            }
            title={ `Watch livestream` }
            fixed
         />

         <div style={{
            width: "100%",
            marginTop: 63,
            position: "relative"
         }}>
            <span style={{
               padding: 3,
               borderRadius: 3,
               backgroundColor: "red",
               position: "absolute",
               top: 9,
               left: 9,
               color: "white",
               zIndex: 9,
               fontSize: 12,
               fontWeight: 500
            }}>LIVE</span>
            <video autoPlay muted loop style={{
               width: "100%"
            }}>
               <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"/>
            </video>
         </div>

         <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 21,
            marginTop: 21
         }}>
            <div style={{
               width: "100%",
               display: "flex",
               gap: 12
            }}>
               <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `url(https://forkast.news/wp-content/uploads/2022/03/NFT-Avatar.png) no-repeat center center / cover`
               }}></div>
               <div style={{
                  flex: 1
               }}>
                  <span style={{
                     fontSize: 12,
                     color: "white",
                     fontWeight: 600,
                     marginBottom: 6,
                     display: "block"
                  }}>Anonymous</span>
                  <p style={{
                     padding: 6,
                     backgroundColor: "rgba(255,255,255,.15)",
                     borderRadius: 6,
                     fontSize: 14,
                     color: "white",
                     margin: 0
                  }}>नमस्ते</p>
               </div>
            </div>
            <div style={{
               width: "100%",
               display: "flex",
               gap: 12
            }}>
               <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `url(https://www.playtoearn.online/wp-content/uploads/2021/10/Clone-X-NFT-avatar.png) no-repeat center center / cover`
               }}></div>
               <div style={{
                  flex: 1
               }}>
                  <span style={{
                     fontSize: 12,
                     color: "white",
                     fontWeight: 600,
                     marginBottom: 6,
                     display: "block"
                  }}>99up</span>
                  <p style={{
                     padding: 6,
                     backgroundColor: "rgba(255,255,255,.15)",
                     borderRadius: 6,
                     fontSize: 14,
                     color: "white",
                     margin: 0
                  }}>สวัสดี</p>
               </div>
            </div>
            <div style={{
               width: "100%",
               display: "flex",
               gap: 12
            }}>
               <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `url(https://www.upwork.com/catalog-images-resized/d1b365f8a883438e9de16033bff83cc9/large) no-repeat center center / cover`
               }}></div>
               <div style={{
                  flex: 1
               }}>
                  <span style={{
                     fontSize: 12,
                     color: "white",
                     fontWeight: 600,
                     marginBottom: 6,
                     display: "block"
                  }}>Anonymous</span>
                  <p style={{
                     padding: 6,
                     backgroundColor: "rgba(255,255,255,.15)",
                     borderRadius: 6,
                     fontSize: 14,
                     color: "white",
                     margin: 0
                  }}>Bonjour</p>
               </div>
            </div>
            <div style={{
               width: "100%",
               display: "flex",
               gap: 12
            }}>
               <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `url(https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp) no-repeat center center / cover`
               }}></div>
               <div style={{
                  flex: 1
               }}>
                  <span style={{
                     fontSize: 12,
                     color: "white",
                     fontWeight: 600,
                     marginBottom: 6,
                     display: "block"
                  }}>Akutar</span>
                  <p style={{
                     padding: 6,
                     backgroundColor: "rgba(255,255,255,.15)",
                     borderRadius: 6,
                     fontSize: 14,
                     color: "white",
                     margin: 0
                  }}>Good morning !!!</p>
               </div>
            </div>
            <div style={{
               width: "100%",
               display: "flex",
               gap: 12
            }}>
               <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `url(https://mpost.io/wp-content/uploads/image-7-17.jpg) no-repeat center center / cover`
               }}></div>
               <div style={{
                  flex: 1
               }}>
                  <span style={{
                     fontSize: 12,
                     color: "white",
                     fontWeight: 600,
                     marginBottom: 6,
                     display: "block"
                  }}>Anonymous</span>
                  <p style={{
                     padding: 6,
                     backgroundColor: "rgba(255,255,255,.15)",
                     borderRadius: 6,
                     fontSize: 14,
                     color: "white",
                     margin: 0
                  }}>안녕하세요</p>
               </div>
            </div>
            <div style={{
               width: "100%",
               display: "flex",
               gap: 12
            }}>
               <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `url(https://nftcrypto.io/wp-content/uploads/2023/05/2023-05-18-17_57_18-The-Journey-of-an-NFT-Avatar-Word-Product-Activation-Failed.png) no-repeat center center / cover`
               }}></div>
               <div style={{
                  flex: 1
               }}>
                  <span style={{
                     fontSize: 12,
                     color: "white",
                     fontWeight: 600,
                     marginBottom: 6,
                     display: "block"
                  }}>Anonymous</span>
                  <p style={{
                     padding: 6,
                     backgroundColor: "rgba(255,255,255,.15)",
                     borderRadius: 6,
                     fontSize: 14,
                     color: "white",
                     margin: 0
                  }}>Γειά σου</p>
               </div>
            </div>
         </div>
      </View>
   )
}