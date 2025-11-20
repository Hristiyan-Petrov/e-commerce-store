import { Box, List, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { useState } from "react";
import { useCart } from "../../../../context/CartContext";
import { AnimatePresence, motion } from 'motion/react';

export default function CartItemList({
    items,
    toggle
}) {
    const [updatingItems, setUpdatingItems] = useState(new Set());
    const { removeFromCart, updateQuantity } = useCart();

    const handleCartOperation = async (operation, cartItemId, ...args) => {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        try {
            await operation(cartItemId, ...args);
        } finally {
            setUpdatingItems(prev => {
                const next = new Set(prev);
                next.delete(cartItemId);
                return next;
            });
        }
    };

    return (
        <Box
            component="section"
            sx={{
                // flex: { sm: 5 },
                width: '100%'
            }}
        >
            <List>
                <AnimatePresence>
                    {items.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            toggle={toggle}
                            isUpdating={updatingItems.has(item.id)}
                            onRemove={() => handleCartOperation(removeFromCart, item.id)}
                            onQuantityUpdate={(newQuantity) => handleCartOperation(updateQuantity, item.id, newQuantity)}
                        />
                    ))}
                </AnimatePresence>
            </List>
        </Box>
    );
};