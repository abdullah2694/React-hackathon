import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/common/Sidebar';

const menuItems = [
  { label: 'Branches', path: '/admin/branches' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Inventory', path: '/admin/inventory' },
  { label: 'Employees', path: '/admin/employees' },
  { label: 'Offers', path: '/admin/offers' },
];

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar menuItems={menuItems} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5">Admin Dashboard</Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;