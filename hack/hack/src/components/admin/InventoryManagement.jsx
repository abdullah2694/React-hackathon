import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, MenuItem } from '@mui/material';
import { fetchBranches, updateInventory } from '../../store/branchSlice';
import { fetchProducts } from '../../store/productSlice';

const InventoryManagement = () => {
  const [branchId, setBranchId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const branches = useSelector(state => state.branches.items);
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const branch = branches.find(b => b.id === branchId);
    const updatedInventory = { ...(branch.inventory || {}), [productId]: Number(quantity) };
    try {
      await dispatch(updateInventory({ branchId, inventory: updatedInventory })).unwrap();
      setBranchId('');
      setProductId('');
      setQuantity('');
      alert('Inventory updated successfully!');
    } catch (err) {
      console.error('Failed to update inventory:', err);
      alert('Error updating inventory: ' + err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Manage Inventory</Typography>

      <Box component="form" sx={{ maxWidth: 400, mt: 2 }} onSubmit={handleSubmit}>
        <TextField
          select
          label="Branch"
          value={branchId}
          onChange={e => setBranchId(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          {branches.map(branch => (
            <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Product"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          {products.map(product => (
            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!branchId || !productId || !quantity}
        >
          Update Inventory
        </Button>
      </Box>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Branch</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map(branch =>
            Object.entries(branch.inventory || {}).map(([prodId, qty]) => (
              <TableRow key={`${branch.id}-${prodId}`}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{products.find(p => p.id === prodId)?.name || 'Unknown Product'}</TableCell>
                <TableCell>{qty}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default InventoryManagement;
