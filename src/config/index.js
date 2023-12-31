import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const Config = {
    PINATA: {
        KEY: "b79996cffde5cbf6af44",
        SECRET: "873b214c745393f1f2b4f5f6e5f67c53ad1a52ba30e191cf3b5cbe70412d78c1",
        FILE_URL: "https://gateway.pinata.cloud/ipfs/",
    },
    WEB3_STORAGE_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdGMTE3NjRkRDVCMTA0MmIyMGRmOTU1MTJkRkVhNEM1NDBkNzFmNUQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwODc1ODU2NDUsIm5hbWUiOiJQYXNzQm9vayJ9.EsfX2F-UA0uh7x86QV0NUGLAO6Mbu0WcDWwQg0fmY4k",
    IPFS_LINK: "https://dweb.link/ipfs/",
    NETWORK: WalletAdapterNetwork.Testnet,
    ENDPOINT: "http://127.0.0.1:8899",
    WALLET_SECRECT: "zebra liar frown void off siege affair blush twice cricket mesh kidney",
    VARIABLES: {
        TICKET_TYPES: [
            {
                label: "Ticket",
                value: "ticket"
            }, {
                label: "NFT",
                value: "nft"
            }
        ],
        TICKET_CATEGORIES: [
            {
                label: "Music",
                value: "music"
            }, {
                label: "Movie",
                value: "movie"
            }, {
               label: "Technology",
               value: "tech"
           }, {
            label: "Sports",
            value: "sports"
        }
        ]
    },
    MOTOKO: {
        PRICE_E8S: 1000 * 1000 * 100
    },
    IMGUR_CLIENT_ID: "4f61d80726ad8f2",
    TOKEN: {
        NAME: "PassBook Coin",
        SYMBOL: "đ"
    }
}