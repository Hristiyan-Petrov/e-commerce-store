import { IconButton } from "@mui/material";
import { underlineHoverEffect } from "../../styles/common";

export default function NavIcon({
    toggle,
    sx = {},
    children
}) {
    return (
        <IconButton
            onClick={toggle}
            disableRipple
            aria-label="account icon"
            sx={{
                ...underlineHoverEffect(2.5),
                ...sx
            }}
        >
            {children}
        </IconButton>
    );
};