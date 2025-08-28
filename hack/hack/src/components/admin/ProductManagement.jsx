import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { addProduct, fetchProducts } from '../../store/productSlice';

const ProductManagement = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  const { items: products = [], status } = useSelector(state => state.products); // Fixed access to state
  const loading = status === 'loading';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!name || !price) return alert('Please fill all fields');
    try {
      await dispatch(addProduct({ name, price: Number(price) })).unwrap();
      setName('');
      setPrice('');
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('Error adding product');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Manage Products</Typography>

      <Box component="form" sx={{ maxWidth: 400, mt: 2 }} onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} /> : 'Add Product'}
        </Button>
      </Box>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2}>Loading...</TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>No products available</TableCell>
            </TableRow>
          ) : (
            products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductManagement;
