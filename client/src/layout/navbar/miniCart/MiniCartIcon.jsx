import { Badge } from "@mui/material";
import NavIcon from "../../../components/common/NavIcon";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../../../context/CartContext";
import { useEffect } from "react";
import { motion, useAnimation } from 'motion/react';
import IconPopTransition from "../../../components/common/IconPopTransition";

export default function MiniCartIcon({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    ...props
}) {
    const { summary, isCartIconAnimating, setIsCartIconAnimating } = useCart();
    const controls = useAnimation();

    useEffect(() => {
        if (isCartIconAnimating) {
            controls.start({
                rotate: [0, 15, -15, 15, -15, 0],
                transition: { duration: 0.4 }
            });
            setIsCartIconAnimating(false);
        }

    }, [isCartIconAnimating, controls, setIsCartIconAnimating]);

    return (
        <motion.div
            animate={controls}
        >
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
                    <ShoppingCartOutlinedIcon/>
                    {/* <IconPopTransition condition={open} defaultIcon={<ShoppingCartOutlinedIcon/>} alternateIcon={<ShoppingCartIcon/>} /> */}
                
                </Badge>
            </NavIcon>
        </motion.div>
    );
};