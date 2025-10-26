import NavIcon from '../../../components/common/NavIcon';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function AccountIcon({ open, toggle }) {
    return (
        <NavIcon
            toggle={toggle}
        >
            {open
                ? <PersonIcon />
                : <PersonOutlinedIcon />
            }
        </NavIcon>
    );
};