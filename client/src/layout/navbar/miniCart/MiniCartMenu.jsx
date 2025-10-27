import { Avatar, Box, Button, Container, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import TopDrawerMenu from "../../../components/common/TopDrawerMenu";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import LocalOffer from '@mui/icons-material/LocalOffer';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Link as RouterLink } from "react-router";

export default function MiniCartMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
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
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            {...props}
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