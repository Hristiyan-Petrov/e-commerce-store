import { Box } from '@mui/material';
import MainNavigation from '../home/MainNavigation';
import { Outlet } from 'react-router';
import Navbar from './navbar/Navbar';

const Layout = () => {
    return (
        <Box>
            <Navbar />
            {/* <MainNavigation /> */}
            <Outlet />
        </Box>
        // <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        //   <MainNavigation />
        //   <Box component="main" sx={{ flexGrow: 1 }}>
        //     {/* The Outlet component renders the matched child route component */}
        //     <Outlet />
        //   </Box>
        //   {/* <Footer /> */}
        // </Box>
    );
};

export default Layout;