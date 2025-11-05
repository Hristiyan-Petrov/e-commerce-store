import { Box, IconButton, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function QuantityStepper({
    item,
    isUpdating,
    onDecrement,
    onIncrement,
}) {
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
            <Typography variant="subtitle1" sx={{ minWidth: '2ch', textAlign: 'center' }}>
                {item.quantity}
            </Typography>
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