import { Badge } from "@mui/material";
import NavIcon from "../../../components/common/NavIcon";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from "../../../context/CartContext";
import { Link as RouterLink } from "react-router";
import { ROUTES } from "../../../constants/routes";

export default function MiniCartIcon({
    open,
    toggle,
    onClick, // <--- Destructure this to capture the parent's toggle handler
    'aria-label': ariaLabel,
    ...props
}) {
    const { summary } = useCart();

    return (
        <NavIcon
            // We explicitly do NOT pass 'onClick' to NavIcon.
            // This prevents the icon from trying to toggle the drawer,
            // allowing the RouterLink to perform the navigation to /cart.
            aria-label={ariaLabel}
            component={RouterLink}
            to={ROUTES.CART} 
            {...props}
        >
            <Badge
                badgeContent={summary.totalQuantity}
                color="primary"
                sx={{ '& .MuiBadge-badge': { left: 10 } }}
            >
                <ShoppingCartOutlinedIcon />
            </Badge>
        </NavIcon>
    );
};