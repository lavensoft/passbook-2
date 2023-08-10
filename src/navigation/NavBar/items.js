import React from 'react';
import * as Icon from 'react-icons/bi';

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
        path: '/management',
        name: 'Management',
        icon: <Icon.BiBasket />,
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