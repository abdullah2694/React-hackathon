// Updated: src/components/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Typography } from '@mui/material';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import { placeOrder } from '../../store/orderSlice';

const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!items.length || !user) return;
    try {
      await dispatch(placeOrder({ products: items, status: 'pending' })).unwrap();
      dispatch(clearCart());
      navigate('/user/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">Your Cart</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.productId}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={e =>
                    dispatch(updateQuantity({ productId: item.productId, quantity: Number(e.target.value) }))
                  }
                  inputProps={{ min: 1 }}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => dispatch(removeFromCart(item.productId))}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleCheckout} disabled={!items.length}>
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;