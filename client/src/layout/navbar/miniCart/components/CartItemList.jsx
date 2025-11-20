import { Box, List, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { useState } from "react";
import { useCart } from "../../../../context/CartContext";
import { AnimatePresence, motion } from 'motion/react';

export default function CartItemList({
    items,
    toggle,
    updatingItemIds,
    onUpdateQuantity,
    onRemove,
}) {
    return (
        <Box
            component="section"
            sx={{
                flex: { sm: 5 },
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
                            // isUpdating={updatingItems.has(item.id)}
                            // onRemove={() => handleCartOperation(removeFromCart, item.id)}
                            // onQuantityUpdate={(newQuantity) => handleCartOperation(updateQuantity, item.id, newQuantity)}
                            isUpdating={updatingItemIds.has(item.id)}
                            onRemove={() => onRemove(item.id)}
                            onQuantityUpdate={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
                        />
                    ))}
                </AnimatePresence>
            </List>
        </Box>
    );
};