export const routes = {
    HOME: '/',
    QR_SCAN: '/qr_scan',
    FEED: "/feed",
    SETTINGS: '/settings',
    LIVE: '/live',
    PRODUCT: {
        CREATE: '/product/create',
        SALE: '/product/sale',
        MARKET: '/products',
        MANAGEMENT: "/management",
        INFORMATION: {
            TICKET: '/tickets/:ticketId',
            ITEM: '/items/:itemId',
        },
        CATEGORY: {
            OWNED: '/products/categories/owned/:categoryId',
            LIST: '/products/categories/:categoryId',
        },
        EXCHANGE: '/exchange/:ticketIdParam',
        SWAP: '/swap/:pricipalId',
    },
    PROFILE: '/users/:principalId',
    PERMISSION: {
        PERMISSION: '/permission',
        USERDETAIL: '/user-detail/:userId',
        ADDUSER: '/user/add-user',
    },
    CONNECT: '/connect',
    NOTIFICATIONS: {
        NOTIFICATIONS: '/notifications',
        SHOWNOTIFY: '/notifications/:id',
    },
    CHECKIN: 'checkin'
};