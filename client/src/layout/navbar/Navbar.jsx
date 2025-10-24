import { AppBar, Autocomplete, Avatar, Badge, Box, Button, Chip, Container, Drawer, IconButton, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from "react-router";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalOffer from '@mui/icons-material/LocalOffer';
import { HIDE_MOBILE, SHOW_MD_DOWN, SHOW_MD_UP, SHOW_MOBILE_ONLY } from "../../constants/breakpoints";
import { useEffect, useState } from "react";
import { fetchAll } from '../../api/product';
import TopDrawerMenu from "./TopDrawerMenu";
import NavIcon from "../../components/common/NavIcon";
import { underlineHoverEffect } from '../../styles/common'

import Account from "../../features/account/Account.jsx";

const navigationLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

const searchRelatedLinks = [
    { label: 'Mice', to: '/shop/mice' },
    { label: 'Keyborads', to: '/shop/keyboards' },
    { label: 'Monitors', to: '/shop/monitors' },
    { label: 'New Arivals', to: '/shop/new-arrivals' },
];

const Navbar = () => {
    const [products, setProducts] = useState([]);

    const [activeMenu, setActiveMenu] = useState(null);
    const handleMenuToggle = (menuName) => {
        console.log(menuName);
        setActiveMenu(prevMenu => prevMenu === menuName ? null : menuName);
    }

    const handleSearch = () => {
        console.log('You clicked search.');
    };

    useEffect(() => {
        const getProducts = async () => {
            fetchAll()
                .then(products => {
                    setProducts(products);
                    console.log(products);

                })
                .catch(err => {
                    console.log('ERROR' + err);
                })
        };

        getProducts();
    }, []);


    return (
        <AppBar sx={{ position: 'static', backgroundColor: 'white' }}>
            <Toolbar sx={{
                justifyContent: { xs: "space-between", xl: 'space-evenly' },
            }}>

                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    gap: 5,
                }}>
                    <IconButton aria-label="mini shopping cart">
                        <HomeRoundedIcon fontSize="large" />
                    </IconButton>

                    <Box
                        sx={{
                            display: HIDE_MOBILE,
                            gap: 5,
                            alignItems: 'center',
                            component: 'header',
                        }}>
                        {navigationLinks.map(link => (
                            <Link
                                key={link.label}
                                to={link.to}
                                component={RouterLink}
                                sx={{
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    position: 'relative',
                                    ...underlineHoverEffect()
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>
                </Box>

                {/* Nav Icons */}
                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: 'center'
                }}>
                    <Chip
                        sx={{
                            display: SHOW_MD_UP,
                            pl: 10,
                            '& .MuiChip-icon': {
                                color: 'secondary.main'
                            },
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '2.25rem',
                                left: 0,
                                right: 0,
                                height: '5px',
                                backgroundColor: 'primary.main',
                                transform: 'scaleX(0)',
                                transformOrigin: 'right',
                                transition: 'transform 0.2s',
                            },
                            '&:hover::after': {
                                transform: 'scaleX(1)',
                                transformOrigin: 'left',
                            }
                        }}
                        onClick={() => handleMenuToggle('search')}
                        icon={activeMenu === 'search' ? <SearchOffIcon /> : <SearchOutlinedIcon />}
                    />

                    <SearchMenuIcon open={activeMenu === 'search'} toggle={() => handleMenuToggle('search')} />

                    <Account
                        open={activeMenu === 'account'}
                        toggle={() => handleMenuToggle('account')}
                    />
                    {/* // <AccountMenuIcon open={activeMenu === 'account'} toggle={() => handleMenuToggle('account')} /> */}

                    <MiniCartIcon open={activeMenu === 'miniCart'} toggle={() => handleMenuToggle('miniCart')} />

                    <MobileMenuIcon open={activeMenu === 'mobile'} toggle={() => handleMenuToggle('mobile')} />


                </Box>

                {/* Menus */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        // top: 0,
                        left: 0,
                        right: 0,
                        height: 'calc(100vh - 56px)', // 56px is the default Toolbar height on mobile - only place where the mobile menu is visible
                        overflow: 'hidden',
                        pointerEvents: activeMenu ? 'auto' : 'none',
                    }}
                >
                    <MobileMenu
                        open={activeMenu === 'mobile'}
                        toggleMenu={() => handleMenuToggle('mobile')}
                    />
                    {/* <AccountMenu
                        open={activeMenu === 'account'}
                        toggleMenu={() => handleMenuToggle('account')}
                    /> */}
                    <SearchMenu
                        open={activeMenu === 'search'}
                        toggleMenu={() => handleMenuToggle('search')}
                        products={products}
                    />
                    <MiniCartMenu
                        open={activeMenu === 'miniCart'}
                        toggle={() => handleMenuToggle('miniCart')}
                    />
                </Box>
            </Toolbar>

        </AppBar >
    );
};

const MobileMenuIcon = ({ open, toggle }) => {
    return (
        <NavIcon
            open={open}
            toggle={toggle}
            sx={{
                display: SHOW_MOBILE_ONLY
            }}
        >

            <Box sx={{
                width: 24,
                height: 24,
            }}>
                <MenuIcon sx={{
                    position: 'absolute',
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate and fade out
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    opacity: open ? 0 : 1,
                }} />
                <CloseRoundedIcon sx={{
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate in and fade in
                    transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                    opacity: open ? 1 : 0,
                }} />
            </Box>
        </NavIcon>
    );
};

const MobileMenu = ({ open, toggleMenu }) => {
    return (
        <TopDrawerMenu
            open={open}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {
                    navigationLinks.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            component={RouterLink}
                            onClick={toggleMenu}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: '500',
                                p: 2,
                                borderBottomWidth: '2px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: 'secondary.light'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))
                }
            </Box>
        </TopDrawerMenu>
    );
};

// const AccountMenuIcon = ({ open, toggle }) => {
//     return (
//         <NavIcon
//             open={open}
//             toggle={toggle}
//         >
//             {open
//                 ? <PersonIcon />
//                 : <PersonOutlinedIcon />
//             }
//         </NavIcon>
//     );
// };

// const AccountMenu = ({ open, toggleMenu }) => {
//     const isAuth = false;

//     return (
//         <TopDrawerMenu
//             open={open}
//             sx={{
//                 width: { xs: '100%', sm: '50%', md: '30%', lg: '25%' },
//                 right: { sm: 0, xl: '15%' }
//             }}
//         >

//             {isAuth && <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                 }}>
//                 {
//                     accountMenuItems.map(link => (
//                         <Link
//                             key={link.label}
//                             to={link.to}
//                             component={RouterLink}
//                             onClick={toggleMenu}
//                             sx={{
//                                 textDecoration: 'none',
//                                 fontWeight: '500',
//                                 p: 2,
//                                 borderBottomWidth: '2px',
//                                 borderBottomStyle: 'solid',
//                                 borderBottomColor: 'secondary.light'
//                             }}
//                         >
//                             {link.label} {link.label === 'logout' && <LogoutOutlinedIcon />}
//                         </Link>
//                     ))
//                 }
//             </Box>}


//             {!isAuth && <Box sx={{
//                 p: 3,
//                 textAlign: 'center',
//             }}>
//                 <Typography variant="h6" gutterBottom>
//                     Your Account Awaits
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                     Get access to your account and unlock exclusive offers.
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                     <Button component={RouterLink} to="/register" variant="contained">
//                         Login
//                     </Button>
//                     <Button component={RouterLink} to="/login" variant="contained" color="secondary">
//                         Create Account
//                     </Button>
//                 </Box>
//             </Box>}
//         </TopDrawerMenu>

//     );
// };

const SearchMenuIcon = ({ open, toggle }) => {
    return (
        <NavIcon
            open={open}
            toggle={toggle}
            sx={{
                display: SHOW_MD_DOWN,
            }}
        >
            {open
                ? <SearchOffIcon />
                : <SearchOutlinedIcon />
            }
        </NavIcon>
    );
};

const SearchMenu = ({ open, toggleMenu, products }) => {
    return (
        <TopDrawerMenu
            open={open}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'fit-content',
                    height: '100vh'
                }}>
                <Container
                    component='section'
                    sx={{
                        m: { md: '0 auto' },
                        maxWidth: { md: '75%', lg: '50%' },
                        textAlign: "center",
                        pt: 2,
                        pb: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                pb: 2
                            }}
                        >
                            Suggested searches
                        </Typography>
                        <CancelOutlinedIcon
                            onClick={toggleMenu}
                        />
                    </Box>

                    <List>
                        {searchRelatedLinks.map(link => (
                            <ListItemButton
                                key={link.label}
                                component={RouterLink}
                                to={link.to}
                                sx={{
                                    maxWidth: '90%',
                                    transition: 'background-color 0.7s',
                                    borderRadius: 5,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'primary.light',
                                        transition: 'background-color 0.2s',
                                    }
                                }}
                            >
                                <KeyboardArrowRightRoundedIcon sx={{
                                    mr: 5,
                                    transition: 'opacity 0.2s'
                                }}
                                />
                                <ListItemText>
                                    {link.label}
                                </ListItemText>
                            </ListItemButton>
                        ))}

                    </List>
                </Container>
                <Divider />
                <Container
                    component='section'
                    sx={{
                        maxWidth: { md: '75%', lg: '50%' },
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 3
                    }}>

                    <Autocomplete
                        component='input'
                        id="searcg-field"
                        freeSolo
                        options={products.map(p => p.name)}
                        renderInput={params => (
                            <TextField
                                {...params} label="What are you looking for?"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '50px', // Set the desired radius here
                                        // color: 'primary.light',
                                        '&.Mui-focused fieldset': {
                                            // color: 'primary.light',
                                            borderColor: 'secondary.main', // Example: keep border color consistent
                                        },
                                    },
                                }}
                            />
                        )}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Container>
            </Box>
        </TopDrawerMenu>

    );
};

const MiniCartIcon = ({ open, toggle }) => {
    const miniCartItems = [
        {
            productId: '123',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            productId: '456',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        }
    ];

    return (
        <NavIcon
            open={open}
            toggle={toggle}
        >
            <Badge
                badgeContent={miniCartItems.length}
                color="primary"
                sx={{
                    '& .MuiBadge-badge': {
                        left: 10
                    }
                }}
            >
                {open
                    ? <ShoppingCartIcon />
                    : <ShoppingCartOutlinedIcon />
                }
            </Badge>
        </NavIcon>
    );
};

const MiniCartMenu = ({ open, toggle }) => {
    const miniCartItems = [
        {
            id: '123',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '45116',
            name: 'Mouse Pad',
            price: 29.99,
            salePrice: 19.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '1234',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '4564',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        }, {
            id: '43356',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        },
        {
            id: '12e34',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '4563334',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        }

    ];

    const QuantityStepper = () => (
        <Box>
        </Box>
    );

    return (
        <TopDrawerMenu
            open={open}
        >
            <Stack
                py={3}
                component='section'
                sx={{

                    backgroundColor: 'secondary.light',
                    maxHeight: 'calc(100vh - 56px)',
                    overflowY: 'auto',
                }}
            >
                {miniCartItems.length === 0
                    ? (
                        <Container>
                            <Typography

                                sx={{
                                    letterSpacing: 1.5,
                                    textAlign: 'center'
                                }}
                            >
                                Your shopping cart is empty.
                            </Typography>
                            <Button
                                variant="contained"
                                to='/shop'
                                sx={{
                                    maxWidth: 'fit-content',
                                    fontSize: '0.8rem',
                                    letterSpacing: 2.5,
                                    px: 3
                                }}
                            >
                                Explore products
                            </Button>
                        </Container>
                    )
                    // Has items
                    : (
                        <Stack
                            component='section'
                            mx={3}
                            sx={{
                                flexDirection: { sm: 'row' },
                                gap: { sm: 2 },
                                justifyContent: { sm: "space-between" },
                                alignItems: { sm: 'flex-start' },
                                m: { lg: '0 auto' },
                                minWidth: { lg: '75%', xl: '70%' },
                            }}
                        >
                            <Box
                                component='section'
                                sx={{
                                    flex: { sm: 5 }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: 'center'
                                    }}
                                >
                                    Your shopping cart
                                </Typography>

                                <List>
                                    {miniCartItems.map(product => {
                                        const isOnSale = product.salePrice && product.salePrice < product.price;
                                        const finalPrice = isOnSale ? product.salePrice : product.price;
                                        const itemSubtotal = (finalPrice * product.quantity).toFixed(2);

                                        return (
                                            <ListItem
                                                key={product.id}
                                                disablePadding
                                                sx={{
                                                    my: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: 'background.paper',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 2,
                                                        p: 2,
                                                        width: '100%'
                                                    }}
                                                >
                                                    <ListItemButton
                                                        to={`/shop/${product.id}`}
                                                        sx={{
                                                            maxWidth: 'fit-content',
                                                            borderRadius: 5,
                                                            transition: 'background-color 0.5s',
                                                            '&:hover': {
                                                                transition: 'background-color 0.2s',
                                                                backgroundColor: 'primary.light'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                variant="rounded"
                                                                src={product.image}
                                                                alt={product.name}
                                                            />
                                                        </ListItemAvatar>

                                                        <ListItemText
                                                            primaryTypographyProps={{ component: 'div' }}
                                                            secondaryTypographyProps={{ component: 'div' }}
                                                            primary={
                                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                                    <Typography fontWeight='bold'>{product.name}</Typography>
                                                                    {isOnSale && <LocalOffer color="primary" />}
                                                                </Stack>
                                                            }
                                                            secondary={
                                                                <Stack direction="row" spacing={1} alignItems="center">
                                                                    {isOnSale && (
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{ textDecoration: 'line-through', mr: 1 }}
                                                                        >
                                                                            ${product.price.toFixed(2)}
                                                                        </Typography>
                                                                    )}
                                                                    <Typography
                                                                        variant="body2"
                                                                        color='text.primary'
                                                                    >
                                                                        ${finalPrice.toFixed(2)}
                                                                    </Typography>
                                                                </Stack>
                                                            }
                                                        />
                                                    </ListItemButton>

                                                    {/* Section 2: Quantity Setter and Subtotal */}
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: "center",
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        {/* Quatity Setter (Omitted for brevity, assumed unchanged) */}
                                                        <Box
                                                            sx={{
                                                                borderRadius: 10,
                                                                borderColor: 'secondary.light',
                                                                borderStyle: 'solid',
                                                                borderWidth: 2,
                                                                px: 1,
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <IconButton size="small">
                                                                <RemoveOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                            <Typography variant='subtitle1'>
                                                                {product.quantity}
                                                            </Typography>
                                                            <IconButton size="small">
                                                                <AddOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>

                                                        {/* Item Subtotal Calculation */}
                                                        <Typography
                                                            variant='subtitle1'
                                                            fontWeight='bold'
                                                            color='text.primary'
                                                        >
                                                            ${itemSubtotal}
                                                        </Typography>

                                                        <IconButton>
                                                            <DeleteOutlineRoundedIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>

                            {/* Summary */}
                            <Box
                                component='section'
                                sx={{
                                    flex: { sm: 3 },
                                    position: { sm: 'sticky' },
                                    top: 0
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: 'center',
                                        letterSpacing: 1.5,
                                    }}
                                >
                                    Summary
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 3,
                                        p: 3,
                                        backgroundColor: 'background.paper',
                                        borderRadius: 3,
                                    }}>

                                    <Box
                                        sx={{
                                            // mt: 3,
                                            display: 'flex',
                                            justifyContent: "space-between"
                                        }}>

                                        <Typography>
                                            Total Savings:
                                        </Typography>
                                        <Typography

                                        >
                                            ${miniCartItems
                                                .filter(i => i.salePrice)
                                                .reduce((acc, i) => {
                                                    return acc + (i.price - i.salePrice) * i.quantity;
                                                }, 0).toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                            mt: 3
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            mt: 3,
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>

                                        <Typography
                                            fontWeight="bold"

                                        >
                                            Total:
                                        </Typography>
                                        <Typography
                                            fontWeight="bold"

                                        >
                                            ${miniCartItems.reduce((acc, curr) => {
                                                const price = curr.salePrice ? curr.salePrice : curr.price;
                                                return acc + price * curr.quantity;
                                            }, 0).toFixed(2)}
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box
                                    mt={3}
                                    mb={7}
                                    sx={{
                                        px: { xs: 4, sm: 0 }
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        to="/checkout"
                                        component={RouterLink} // Use RouterLink if available
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Box>
                            </Box>

                        </Stack>
                    )}

            </Stack>
        </TopDrawerMenu>

    );
};

export default Navbar;


---

You are absolutely right. Apologies, in refactoring the logic, a few key details that made the original work were missed. This is a very common part of the refactoring process—getting the abstraction right, then fixing the implementation details.

Let's debug this. There are two main problems:
1.  **The Menu Doesn't Open:** This is because the new `<Account>` feature is being rendered *inside* the `Toolbar`, but the `<TopDrawerMenu>` needs to be rendered *outside* of it to overlay everything correctly.
2.  **Layout is Broken:** The original code had a clever `Box` wrapper that positioned all the menus correctly. We need to re-introduce that.

Here is the step-by-step fix.

---

### The Core Problem: The Rendering Location

The issue is how the final feature components are rendered.

In your old `Navbar.jsx`, you had this structure:
```jsx
<Toolbar>
    {/* ... All the icons ... */}
</Toolbar>

{/* THIS BOX IS CRUCIAL */}
<Box sx={{ position: 'absolute', top: '100%', ... }}>
    <MobileMenu ... />
    <SearchMenu ... />
    <MiniCartMenu ... />
</Box>
```

When we moved to the encapsulated feature `<Account />`, it now renders both its icon and its menu from the *same spot* inside the `Toolbar`. The `Drawer` component (inside `TopDrawerMenu`) is now trapped inside the `Toolbar`'s layout context, which prevents it from displaying as a full overlay.

### The Solution: The "Portal" or "Slot" Pattern

The solution is to have the `Navbar` provide two distinct rendering "slots": one for the **icons** and one for the **menus**. Each feature component will be smart enough to render its parts into the correct slot.

This sounds complex, but it's surprisingly simple to implement using React's `children` prop or by passing renderable elements as props.

Let's refactor `Navbar` and `Account` to work this way.

---

### Step 1: Update `Navbar.jsx` to Provide Slots

The `Navbar` will now define a `menus` array and render them in the correct location outside the `Toolbar`.

**`src/layout/navbar/Navbar.jsx` (Corrected Logic)**

```jsx
import { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, /*... other imports*/ } from '@mui/material';
// ... other imports

// --- Import the feature components ---
import Account from "../../features/account/Account";
// ... import Search, MiniCart, MobileMenu when ready

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenuToggle = (menuName) => {
        setActiveMenu(prevMenu => (prevMenu === menuName ? null : menuName));
    };

    // This array will hold the menu part of each feature
    const featureMenus = [];

    return (
        // Use a wrapper Box to establish a positioning context for the menus
        <Box sx={{ position: 'relative' }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ justifyContent: { xs: "space-between", xl: 'space-evenly' } }}>
                    {/* ... Left side of Navbar (unchanged) ... */}

                    {/* Right Side - ICONS SLOT */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
                        {/*
                            The Account component will now be "headless".
                            It will return an object with its icon and menu parts.
                        */}
                        <Account
                            open={activeMenu === 'account'}
                            toggle={() => handleMenuToggle('account')}
                            // This function lets the Account feature "register" its menu with the Navbar
                            addMenu={(menu) => featureMenus.push(menu)}
                        />

                        {/* Repeat for other features when they are ready */}
                        {/* <Search open={...} addMenu={...} /> */}
                        {/* <MiniCart open={...} addMenu={...} /> */}
                        {/* <MobileMenu open={...} addMenu={...} /> */}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* MENUS SLOT */}
            {/* This is the crucial part that was missing. It's the same logic as your original code. */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    // Use a fixed height or a more dynamic approach if needed
                    height: 'calc(100vh - 64px)', // Adjust 64px to your toolbar's height
                    overflow: 'hidden',
                    // This ensures clicks go "through" this container when no menu is active
                    pointerEvents: activeMenu ? 'auto' : 'none',
                }}
            >
                {/* Render all the menus that were registered by the features */}
                {featureMenus}
            </Box>
        </Box>
    );
};

export default Navbar;

```

### Step 2: Update `Account.jsx` to Return Its Parts

The `Account` feature component will no longer render its menu directly. Instead, it will call the `addMenu` function prop to give its menu JSX back to the `Navbar` to render in the correct "slot".

**`src/features/account/Account.jsx` (Corrected Logic)**

```jsx
import { useState } from 'react';
import { Box, Typography, Link, Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
// ... other imports

import AccountIcon from './AccountIcon';
import TopDrawerMenu from '../../components/common/TopDrawerMenu'; // Assuming you moved this

const accountMenuItems = [ /* ... unchanged ... */ ];

// The component now accepts an `addMenu` prop
export default function Account({ open, toggle, addMenu }) {
    const [isAuth, setIsAuth] = useState(false);

    const handleLogout = () => { /* ... unchanged ... */ };

    // 1. Define the menu JSX as a variable
    const accountMenu = (
        <TopDrawerMenu
            key="account-menu" // React needs a key when rendering an array of elements
            open={open}
            sx={{
                width: { xs: '100%', sm: '50%', md: '30%', lg: '25%' },
                right: { sm: 0 },
                left: { xs: 0, sm: 'auto' },
            }}
        >
            {!isAuth ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    {/* ... Unauthenticated View (unchanged) ... */}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* ... Authenticated View (unchanged, but fix onClick) ... */}
                    {accountMenuItems.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            component={RouterLink}
                            // Pass the correct toggle function here
                            onClick={link.label === 'Logout' ? handleLogout : toggle}
                            sx={{ /* ... styles ... */ }}
                        >
                            {link.label} {/* {link.icon} */}
                        </Link>
                    ))}
                </Box>
            )}
        </TopDrawerMenu>
    );

    // 2. Register the menu with the Navbar parent
    // This will only run once on the initial render
    if (addMenu) {
        addMenu(accountMenu);
    }

    // 3. The component's return value is now ONLY the icon
    return (
        <AccountIcon open={open} toggle={toggle} />
    );
};
```

### Summary of Changes and Why It Works

1.  **Centralized Rendering:** The `Navbar` is once again in charge of *where* the menus are rendered (in the absolute-positioned `Box`), which fixes the layout and overlay problem.
2.  **Decentralized Logic:** The `Account` feature is still in charge of *what* is inside its menu and *how* it works (the `isAuth` state).
3.  **Communication via Props:** The `addMenu` prop is a simple but powerful communication channel. The child feature tells the parent layout, "Here is my menu UI, please render it in the correct place for me."

This pattern maintains the excellent separation of concerns while fixing the practical implementation issue. Now, your account menu should open correctly, and the layout will be preserved. You can apply this exact same `addMenu` pattern when you refactor the other features.