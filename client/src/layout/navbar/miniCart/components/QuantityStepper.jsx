import { Box, IconButton, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { motion, AnimatePresence } from "motion/react";

export default function QuantityStepper({
    item,
    isUpdating,
    onDecrement,
    onIncrement,
}) {
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
                px: 1,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <IconButton
                size="small"
                onClick={onDecrement}
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

                    <Typography variant="subtitle1">
                        {item.quantity}
                    </Typography>
                </motion.div>
            </AnimatePresence>

            <IconButton
                size="small"
                onClick={onIncrement}
                disabled={isUpdating}
            >
                <AddOutlinedIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};