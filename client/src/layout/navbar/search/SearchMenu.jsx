import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Autocomplete, Box, Container, Divider, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import TopDrawerMenu from "../../../components/common/TopDrawerMenu";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link as RouterLink } from "react-router";
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { hoverBackgroundFill } from '../../../styles/common';
import { useEffect, useState } from 'react';
import { fetchAll } from '../../../api/product';
import { ROUTES } from "../../../constants/routes";

const searchRelatedLinks = [
    { label: 'Mice', to: ROUTES.PRODUCTS.CATEGORIES.MICE },
    { label: 'Keyboards', to: ROUTES.PRODUCTS.CATEGORIES.KEYBOARDS, },
    { label: 'Monitors', to: ROUTES.PRODUCTS.CATEGORIES.MONITORS, },
    { label: 'New Arivals', to: ROUTES.PRODUCTS.NEW_ARRIVALS },
];

export default function SearchMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    // products = [],
    ...props
}) {
    useLockBodyScroll(open);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (open) {

            const loadProducts = () => fetchAll()
                .then((data) => {
                    setProducts(data);
                    console.log(data)
                }).catch(error => {
                    console.log(error);
                });

            loadProducts();
        }

    }, [open]);


    const handleSearch = () => {
        console.log('You clicked search.');
    };

    return (
        <TopDrawerMenu
            open={open}
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            {...props}
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
                            onClick={toggle}
                            aria-label="Close search menu"
                        />
                    </Box>

                    <List>
                        {searchRelatedLinks.map(link => (
                            <ListItemButton
                                key={link.label}
                                component={RouterLink}
                                to={link.to}
                                sx={{
                                    maxWidth: '95%',
                                    ...hoverBackgroundFill()
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
                        id="search-field"
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