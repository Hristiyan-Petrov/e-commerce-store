import { createContext, useContext } from "react";
import { useCartContextState } from "../hooks/useCartContextState";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const cartState = useCartContextState();

    return (
        <CartContext.Provider value={cartState}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};