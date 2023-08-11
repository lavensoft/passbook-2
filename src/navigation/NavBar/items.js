import React from 'react';
import * as Icon from 'react-icons/bi';
import { IoEarthOutline } from 'react-icons/io5';

export const MENU_ITEMS = [
    {
        path: '/',
        name: 'Home',
        icon: <Icon.BiHomeAlt />,
    },
    {
        path: '/products',
        name: 'Store',
        icon: <Icon.BiBasket />,
    },
    {
        path: '/feed',
        name: 'Feed',
        icon: <Icon.BiNews />,
    },
    {
        path: '/notifications',
        name: 'Notification',
        icon: <Icon.BiBell />,
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: <Icon.BiCog />,
    },
]