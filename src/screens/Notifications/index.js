import { GridView, ScrollView, Title, View } from "@components";
import {
  AccountLayout,
  TOKEN_PROGRAM_ID,
  createMint,
  getMint,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Notifications = ({ match, navigation }) => {
  const [notifications, setNotifications] = useState({});
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const createToken = async () => {
    const payer = Keypair.generate();
    const mintAuthority = Keypair.generate();
    const freezeAuthority = Keypair.generate();

    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature);
  };

  const getTokens = async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey("8YLKoCu7NwqHNS8GzuvA2ibsvLrsg22YMfMDafxh1B15"),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    return tokenAccounts.value;
  };

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "notifications/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setNotifications(data || {});
    });
  }, []);

  return (
    <>
      <View>
        <Title title="Notifications" />

        <button onClick={createToken}>Create NFT</button>

        <ScrollView horizontal>
          <GridView
            itemCount={1}
            items={
              // eslint-disable-next-line array-callback-return
              Object.keys(notifications)?.map((key, index) => {
                let item = notifications[key];

                if (
                  item.to === JSON.parse(localStorage.getItem("@user")).email
                ) {
                  return (
                    <Link to={`/notifications/${key}`}>
                      <div
                        key={`item-notification-${index}`}
                        style={{ position: "relative" }}
                      >
                        <img
                          src={item.icon}
                          style={{ width: 54, borderRadius: "50%", height: 54 }}
                        />
                        <label
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "23%",
                            color: "#000",
                            fontSize: 15,
                          }}
                        >
                          {item.content}
                        </label>
                      </div>
                    </Link>
                  );
                }
              })
            }
          />
        </ScrollView>
      </View>
    </>
  );
};
