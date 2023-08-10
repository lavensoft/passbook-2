import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { NavBar } from './NavBar';
import "./routes";

//*Screens
import Screens from '../screens';

//*Routes
import { routes } from './routes';


//*Stack
const RootStack = () => {
   const [authed, setAuthed] = useState(false);

   // useEffect(() => {
   //    const user = localStorage.getItem("@user");

   //    if(user) setAuthed(true);
   // }, []);

   return (
      <>
         {window.location.hash != "#/" && window.location.hash != "" && <NavBar />}
         <Routes>
            {/* <Route exact path='/articles/:categoryId/add' element={<PrivateRoute/>}>
               <Route exact path='/articles/:categoryId/add' element={<ArticleEditScreen/>}/>
            </Route> */}

            <Route exact path="/" element={<Screens.Connect />} />
            <Route exact path={routes.PROFILE} element={<Screens.Profile />} />

            <Route exact path={routes.QR_SCAN} element={<Screens.QRScan />} />

            <Route exact path={routes.NOTIFICATIONS.SHOWNOTIFY} element={<Screens.Notifications.Notify />} />
            <Route exact path={routes.NOTIFICATIONS.NOTIFICATIONS} element={<Screens.Notifications.Notifications />} />
            <Route exact path={routes.CHECKIN} element={<Screens.Checkin />} />

            <Route exact path={routes.SETTINGS} element={<Screens.Settings />} />
            <Route exact path={routes.PERMISSION.PERMISSION} element={<Screens.Permission.Permission />} />
            <Route exact path={routes.PERMISSION.USERDETAIL} element={<Screens.Permission.UserDetail />} />
            <Route exact path={routes.PERMISSION.ADDUSER} element={<Screens.Permission.AddUser />} />

            <Route exact path={routes.PRODUCT.MANAGEMENT} element={<Screens.Product.ManagementView />} />

            <Route exact path={routes.PRODUCT.EXCHANGE} element={<Screens.Product.Exchange />} />
            <Route exact path={routes.PRODUCT.SWAP} element={<Screens.Product.SwapNFT />} />
            <Route exact path={routes.PRODUCT.CATEGORY.OWNED} element={<Screens.Product.Category.List />} />
            <Route exact path={routes.PRODUCT.CATEGORY.LIST} element={<Screens.Product.Category.List />} />
            <Route exact path={routes.PRODUCT.CREATE} element={<Screens.Product.NFT.Create />} />
            <Route exact path={routes.PRODUCT.SALE} element={<Screens.Product.CreateSaleEvents />} />
            <Route exact path={routes.PRODUCT.INFORMATION.ITEM} element={<Screens.Product.Market />} />
            <Route exact path={routes.PRODUCT.MARKET} element={<Screens.Product.Market />} />

            <Route exact path={routes.PRODUCT.INFORMATION.ITEM} element={<Screens.Home />} />
            <Route exact path={routes.HOME} element={<Screens.Home />} />
         </Routes>
      </>
   )
}

export default RootStack;