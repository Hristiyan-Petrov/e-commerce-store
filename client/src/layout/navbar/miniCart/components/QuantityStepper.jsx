import { Box, IconButton, TextField } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { motion, useAnimation } from "motion/react"; 
import { useEffect, useState, useRef } from "react";

export default function QuantityStepper({
    item,
    isUpdating,
    onQuantityUpdate
}) {
    const [localQuantity, setLocalQuantity] = useState(item.quantity);
    const controls = useAnimation();
    
    const debounceTimerRef = useRef(null);

    // Sync local state if the server value changes externally 
    // (e.g., after the API call finishes and returns the confirmed number)
    useEffect(() => {
        setLocalQuantity(item.quantity);
    }, [item.quantity]);

    const handleNewQuantity = (newQty) => {
        const val = parseInt(newQty, 10);
        if (isNaN(val) || val < 1) return;

        setLocalQuantity(val);

        if (val !== localQuantity) {
            controls.start({
                scale: [1, 1.2, 1],
                transition: { duration: 0.2 }
            });
        }

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            if (val !== item.quantity) {
                onQuantityUpdate(val);
            }
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const handleBlur = () => {
        if (localQuantity < 1 || isNaN(localQuantity)) {
            setLocalQuantity(item.quantity);
        } else {
             if (localQuantity !== item.quantity) {
                if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
                onQuantityUpdate(localQuantity);
            }
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
                onClick={() => handleNewQuantity(localQuantity - 1)}
                disabled={isUpdating || localQuantity <= 1}
            >
                <RemoveOutlinedIcon fontSize="small" />
            </IconButton>

            <motion.div
                animate={controls}
            >
                <TextField
                    type="number"
                    variant="standard"
                    value={localQuantity}
                    onChange={(e) => {
                        // Allow typing, handle debounce via handleNewQuantity
                        // We pass the raw value, handleNewQuantity parses it
                         const val = e.target.value;
                         if (val === '') {
                             setLocalQuantity(''); // Allow clearing input temporarily
                         } else {
                             handleNewQuantity(val);
                         }
                    }}
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
                onClick={() => handleNewQuantity(localQuantity + 1)}
                disabled={isUpdating}
            >
                <AddOutlinedIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};