import { HomeScreen } from './Home';
import { SettingsScreen } from './Settings';
import { ProductMarket } from './Product';
import { Exchange } from './Product/Exchange'; 
import { TicketInformation } from './Product/Information/Ticket';
import { ItemInformation } from './Product/Information/Item';
import { ProductCategoryList } from './Product/Category/List';
import { NFTCreateScreen } from './Product/Create';
import { CreateSaLeEvents } from "./Product/sale";
import { SwapNFT } from "./Product/SwapNFT";
import { Permission } from "./Permission";
import { UserDetail } from "./Permission/UserDetail";
import { AddUser } from "./Permission/AddUser";
import { Connect } from "./Connect";
import { Notifications } from "./Notifications";
import { Checkin } from "./Checkin";
import { Notify } from "./Notify"

import { QRScanScreen } from './QRScan';

import { ProfileScreen } from './Profile';
import { ManagementView } from "./Product/Management"
import { FeedPage } from './Feed';
import { LivePage } from './Product/Information/Live';

const Screens =  {
    Home: HomeScreen,
    Settings: SettingsScreen,
    Feed: FeedPage,
    Product: {
        Market: ProductMarket,
        Information: {
            Ticket: TicketInformation,
            Item: ItemInformation
        },
        Category: {
            List: ProductCategoryList
        },
        NFT: {
            Create: NFTCreateScreen
        },
        Exchange: Exchange,
        CreateSaleEvents : CreateSaLeEvents,
        SwapNFT: SwapNFT,
        ManagementView
    },
    QRScan: QRScanScreen,
    Profile: ProfileScreen,
    Permission: {
        Permission: Permission,
        UserDetail: UserDetail,
        AddUser: AddUser
    },
    Connect: Connect,
    Notifications: {
        Notifications: Notifications,
        Notify: Notify,
    },
    Checkin: Checkin,
    Live: LivePage
}

export default Screens;