import { Box, List, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { useState } from "react";
import { useCart } from "../../../../context/CartContext";

export default function CartItemList({
    items,
    toggle
}) {
    const [updatingItems, setUpdatingItems] = useState(new Set());
    const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    const handleCartOperation = async (operation, cartItemId) => {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        try {
            await operation(cartItemId);
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
                flex: { sm: 5 },
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                }}
            >
                Your shopping cart
            </Typography>

            <List>
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        toggle={toggle}
                        isUpdating={updatingItems.has(item.id)}
                        onIncrement={() => handleCartOperation(incrementQuantity, item.id)}
                        onDecrement={() => handleCartOperation(decrementQuantity, item.id)}
                        onRemove={() => handleCartOperation(removeFromCart, item.id)}
                    />
                ))}
            </List>
        </Box>
    );
};