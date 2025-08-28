import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/common/Sidebar';

const menuItems = [
  { label: 'Summary', path: '/manager/summary' },
  { label: 'Inventory', path: '/manager/inventory' },
  { label: 'Employees', path: '/manager/employees' },
  { label: 'Reviews', path: '/manager/reviews' },
];

const ManagerDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar menuItems={menuItems} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5">Manager Dashboard</Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ManagerDashboard;