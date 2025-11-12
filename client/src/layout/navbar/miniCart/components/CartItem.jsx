import { Avatar, Box, duration, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import LocalOffer from '@mui/icons-material/LocalOffer';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Link as RouterLink } from 'react-router';
import { hoverBackgroundFill } from '../../../../styles/common';
import { memo, useEffect, useRef } from "react";
import QuantityStepper from "./QuantityStepper";
import { AnimatePresence, motion, useAnimation } from 'motion/react';

const cartItemVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: {
        opacity: 0,
        x: -200, // Slide to the left
        // heigth: 0, // Animate to height 0
        transition: { duration: 0.3 }
    }
};

function CartItem({
    item,
    toggle,
    isUpdating,
    onIncrement,
    onDecrement,
    onRemove
}) {
    const isOnSale = item.product.salePrice && item.product.salePrice < item.product.price;

    const deleteControls = useAnimation();
    const startShake = () => {
        deleteControls.start({
            rotate: [0, 10, -10, 1, -10, 0],
            transition: { duration: 0.3 }
        });
    };

    const subtotalControls = useAnimation();
    const isSummaryInitailMount = useRef(true);

    useEffect(() => {
        // Skip animation on initial component mount
        if (isSummaryInitailMount.current) {
            isSummaryInitailMount.current = false;
            return;
        }

        // Play a "pop" animation on the subtotal
        subtotalControls.start({
            scale: [1, 1.15, 1],
            color: ["#000000", "#1976d2", "#000000"],
            transition: { duration: 0.5, times: [0, 0.2, 1] }
        });
    }, [item.subtotal, subtotalControls]);

    return (
        // <motion.li
        //     variants={cartItemVariants}
        //     initial="initial"
        //     animate="animate"
        //     exit="exit"
        //     layout
        // >
            <ListItem
                component={motion.li}
                variants={cartItemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
                disablePadding
                sx={{
                    my: 2,
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    opacity: isUpdating ? 0.6 : 1,
                    // overflow: "hidden"
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 2,
                        width: '100%',
                    }}
                >
                    {/* Product Info */}
                    <ListItemButton
                        component={RouterLink}
                        to={`/shop/${item.product.id}`}
                        onClick={toggle}
                        sx={{
                            maxWidth: 'fit-content',
                            ...hoverBackgroundFill(),
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                src={item.product.imageUrl}
                                alt={item.product.name}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            primaryTypographyProps={{ component: 'div' }}
                            secondaryTypographyProps={{ component: 'div' }}
                            primary={
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontWeight="bold">
                                        {item.product.name}
                                    </Typography>
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
                                            ${Number(item.product.price).toFixed(2)}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" color="text.primary">
                                        {Number(item.finalPrice).toFixed(2)}
                                    </Typography>
                                </Stack>
                            }
                        />
                    </ListItemButton>

                    {/* Quantity Controls & Subtotal */}
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Quantity Stepper */}
                        <QuantityStepper
                            item={item}
                            isUpdating={isUpdating}
                            onDecrement={onDecrement}
                            onIncrement={onIncrement}
                        />

                        {/* Item Subtotal */}
                        <motion.div animate={subtotalControls}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="text.primary"
                            >
                                ${item.subtotal.toFixed(2)}
                            </Typography>
                        </motion.div>

                        {/* Remove Button */}
                        <motion.div
                            animate={deleteControls}
                            onMouseEnter={startShake}
                        >

                            <IconButton
                                onClick={onRemove}
                                disabled={isUpdating}
                            >
                                <DeleteOutlineRoundedIcon />
                            </IconButton>
                        </motion.div>
                    </Box>
                </Box>
            </ListItem>
        // </motion.li >
    );
};

// By wrapping with React.memo, this component will only re-render if its props
// (item, isUpdating, etc.) have actually changed. This prevents the entire list
// from re-rendering when only one item is updated.
export default memo(CartItem);