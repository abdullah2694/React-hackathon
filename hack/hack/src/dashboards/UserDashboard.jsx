import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/common/Sidebar';

const menuItems = [
  { label: 'Products', path: '/user/products' },
  { label: 'Cart', path: '/user/cart' },
  { label: 'Orders', path: '/user/orders' },
  { label: 'Reviews', path: '/user/reviews' },
];

const UserDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar menuItems={menuItems} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5">User Dashboard</Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserDashboard;
