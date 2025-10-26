import { Badge } from "@mui/material";
import NavIcon from "../../../components/common/NavIcon";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function MiniCartIcon({ open, toggle }) {
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