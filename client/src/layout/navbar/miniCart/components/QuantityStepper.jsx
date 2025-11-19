import { Box, IconButton, TextField, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function QuantityStepper({
    item,
    isUpdating,
    onQuantityUpdate
}) {
    const [inputValue, setInputValue] = useState(item.quantity);
    useEffect(() => {
        setInputValue(item.quantity);
    }, [item.quantity]);

    const handleBlur = () => {
        const newQuantity = parseInt(inputValue, 10);

        if (isNaN(newQuantity) || newQuantity < 1) {
            setInputValue(item.quantity);
        } else if (newQuantity !== item.quantity) {
            onQuantityUpdate(newQuantity);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
            e.target.blur();
        }
    };

    const popAnimation = {
        variants: {
            hidden: {
                scale: 0.5, opacity: 0,
                transition: {
                    duration: 0.1,
                },
            },
            visible: {
                scale: 1, opacity: 1,
                transition: {
                    duration: 0.1,
                },
            },
        }
    };

    return (
        <Box
            sx={{
                borderRadius: 10,
                borderColor: 'secondary.light',
                borderStyle: 'solid',
                borderWidth: 2,
                // px: 0,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <IconButton
                size="small"
                onClick={() => onQuantityUpdate(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
            >
                <RemoveOutlinedIcon fontSize="small" />
            </IconButton>

            {/* <Typography variant="subtitle1" sx={{ minWidth: '2ch', textAlign: 'center' }}>
                {item.quantity}
            </Typography> */}

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={item.quantity}
                    variants={popAnimation.variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={popAnimation.transition}
                >
                    <TextField
                        type="number"
                        variant="standard"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        disabled={isUpdating}
                        sx={{
                            width: '3ch', // Adjusted width for a snug fit
                            // Remove default number input arrows
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                'WebkitAppearance': 'none',
                                margin: 0,
                            },
                            '& input[type=number]': {
                                'MozAppearance': 'textfield',
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                                fontWeight: 'bold',
                                padding: '4px 0', // Adjusted padding
                            },
                        }}
                        InputProps={{ disableUnderline: true }}
                    />
                </motion.div>
            </AnimatePresence>

            <IconButton
                size="small"
                onClick={() => onQuantityUpdate(item.quantity + 1)}
                disabled={isUpdating}
            >
                <AddOutlinedIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};