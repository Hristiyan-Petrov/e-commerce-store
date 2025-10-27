import NavIcon from '../../../components/common/NavIcon';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function AccountIcon({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    ...props
}) {
    return (
        <NavIcon
            toggle={toggle}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            {...props}
        >
            {open
                ? <PersonIcon />
                : <PersonOutlinedIcon />
            }
        </NavIcon>
    );
};