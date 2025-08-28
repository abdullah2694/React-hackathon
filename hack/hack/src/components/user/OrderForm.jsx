// Updated: src/components/OrderList.jsx (renamed from OrderForm.jsx for clarity)
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { fetchOrders } from '../../store/orderSlice';

const OrderList = () => {
  const { items: orders, status, error } = useSelector(state => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>;
  }

  if (!orders.length) {
    return <Typography sx={{ mt: 2 }}>No orders placed yet.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Typography variant="h5">Your Orders</Typography>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {order.products.map(p => `${p.name} x${p.quantity}`).join(', ')}
              </TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderList;