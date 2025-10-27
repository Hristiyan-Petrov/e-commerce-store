import NavIcon from "../../../components/common/NavIcon";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SHOW_MD_DOWN, SHOW_MD_UP } from "../../../constants/breakpoints";
import { underlineHoverEffect } from "../../../styles/common";
import { Chip } from "@mui/material";

export default function SearchMenuIcon({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    ...props
}) {
    return (
        <>
            <NavIcon
                toggle={toggle}
                aria-label={ariaLabel}
                aria-expanded={ariaExpanded}
                aria-controls={ariaControls}
                {...props}
            >
                {
                    open
                        ? <SearchOffIcon />
                        : <SearchOutlinedIcon />
                }


            </NavIcon >

            <Chip
                sx={{
                    display: SHOW_MD_UP,
                    pl: 10,
                    '& .MuiChip-icon': {
                        color: 'secondary.main'
                    },
                    ...underlineHoverEffect(2.5),
                }}
                onClick={toggle}
                icon={open ? <SearchOffIcon /> : <SearchOutlinedIcon />}
            />
        </>

    );
};