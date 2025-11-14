import NavIcon from "../../../components/common/NavIcon";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SHOW_MD_DOWN, SHOW_MD_UP } from "../../../constants/breakpoints";
import { Chip } from "@mui/material";
import IconPopTransition from "../../../components/common/IconPopTransition";

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
                <IconPopTransition condition={open} defaultIcon={<SearchOutlinedIcon/>} alternateIcon={<SearchOffIcon/>} />
            </NavIcon >

            <Chip
                sx={{
                    display: SHOW_MD_UP,
                    pl: 10,
                    '& .MuiChip-icon': {
                        color: 'secondary.main'
                    },
                }}
                onClick={toggle}
                icon={<IconPopTransition condition={open} defaultIcon={<SearchOutlinedIcon/>} alternateIcon={<SearchOffIcon/>} />}
            />
        </>

    );
};