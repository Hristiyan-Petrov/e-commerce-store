import MobileMenu from "./mobileMenu/MobileMenu.jsx";
import AccountIcon from "./account/AccountIcon.jsx";
import AccountMenu from "./account/AccountMenu.jsx";
import MobileMenuIcon from "./mobileMenu/MobileMenuIcon.jsx";
import MiniCartMenu from "./miniCart/MiniCartMenu.jsx";
import MiniCartIcon from "./miniCart/MiniCartIcon.jsx";
import SearchMenuIcon from "./search/SearchMenuIcon.jsx";
import SearchMenu from "./search/SearchMenu.jsx";
import { SHOW_MD_DOWN, SHOW_MOBILE_ONLY } from "../../constants/breakpoints.js";
import { fetchAll } from "../../api/product.js";

export const NAV_LINKS = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

export const NAV_FEATURES = [
    {
        id: 'search',
        Icon: SearchMenuIcon,
        Menu: SearchMenu,
        iconProps: {
            'aria-label': 'Open search menu',
            'aria-expanded': false,
            sx: {
                display: SHOW_MD_DOWN,
            },
        },
        menuProps: {
            'aria-label': 'Search products',
            products: await fetchAll()
            // role: 'dialog'
        }
    },
    {
        id: 'account',
        Icon: AccountIcon,
        Menu: AccountMenu,
        iconProps: {
            'aria-label': 'Open account menu',
            'aria-expanded': false
        },
        menuProps: {
            'aria-label': 'Account options',
            // role: 'dialog'
        }
    },
    {
        id: 'miniCart',
        Icon: MiniCartIcon,
        Menu: MiniCartMenu,
        iconProps: {
            'aria-label': 'Open shopping cart',
            'aria-expanded': false
        },
        menuProps: {
            'aria-label': 'Shopping cart items',
            // role: 'dialog'
        }
    },
    {
        id: 'mobile',
        Icon: MobileMenuIcon,
        Menu: MobileMenu,
        iconProps: {
            sx: {
                display: SHOW_MOBILE_ONLY
            },
            'aria-label': 'Open mobile menu',
            'aria-expanded': false
        },
        menuProps: {
            'aria-label': 'Mobile navigation menu',
            // role: 'dialog'
        }
    },
];