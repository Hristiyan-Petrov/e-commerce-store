import { Badge } from "@mui/material";
import NavIcon from "../../../components/common/NavIcon";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../../../context/CartContext";

export default function MiniCartIcon({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    ...props
}) {
    const { summary } = useCart();

    return (
        <NavIcon
            toggle={toggle}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            {...props}
        >
            <Badge
                badgeContent={summary.totalQuantity}
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