import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { MENU_ITEMS } from './items';

import "./styles.scss";

export const NavBar = () => {
    const [location, setLocation] = useState(window.location.hash.replace("#", ""));

    return (
        <nav className="nav-bar">
            {
                MENU_ITEMS.map((item, index) => {
                    return (
                        <Link to={item.path} onClick={() => setLocation(item.path)} className="nav-bar__item" key={`nav-bar-item-${index}`}>
                            <div className={`nav-bar__item__icon ${location === item.path ? 'active' : ''}`}>
                                {item.icon}
                            </div>
                            <span className={`nav-bar__item__name ${location === item.path ? 'active' : ''}`}>{ item.name }</span>
                            <AnimatePresence>
                                {location === item.path && (
                                    <motion.div
                                        layoutId="navlink"
                                        className="nav-bar__item__backdrop-active"
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    )
                })
            }
        </nav>
    )
};