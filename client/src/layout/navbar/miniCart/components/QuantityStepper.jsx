import { Box, IconButton, TextField } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";

export default function QuantityStepper({
    item,
    isUpdating,
    onQuantityUpdate
}) {
    const [inputValue, setInputValue] = useState(item.quantity);
    const controls = useAnimation();

    useEffect(() => {
        setInputValue(item.quantity);
        
        controls.start({
            scale: [1, 1.2, 1],
            transition: { duration: 0.2 }
        });
    }, [item.quantity, controls]);

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
            e.target.blur();
        }
    };

    return (
        <Box
            sx={{
                borderRadius: 10,
                borderColor: 'secondary.light',
                borderStyle: 'solid',
                borderWidth: 2,
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

            {/* Use motion.div wrapper for animation, but NO 'key' to prevent unmounting */}
            <motion.div
                animate={controls}
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
                        width: '3ch',
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
                            padding: '4px 0',
                        },
                    }}
                    InputProps={{ disableUnderline: true }}
                />
            </motion.div>

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