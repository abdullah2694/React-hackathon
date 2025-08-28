import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, CircularProgress } from '@mui/material';
import { fetchBranches, updateInventory } from '../../store/branchSlice';
import { fetchProducts } from '../../store/productSlice';

const BranchInventory = () => {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.branches.items);
  const branchesStatus = useSelector(state => state.branches.status);
  const products = useSelector(state => state.products.items);
  const productsStatus = useSelector(state => state.products.status);
  const user = useSelector(state => state.auth.user);

  const branchId = user?.role === 'branch_manager' ? user.branchId : branches[0]?.id;
  const selectedBranch = branches.find(b => b.id === branchId);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBranch) setInventory(selectedBranch.inventory || {});
  }, [selectedBranch]);

  const handleChange = (productId, value) => {
    setInventory(prev => ({ ...prev, [productId]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branchId) return;
    try {
      await dispatch(updateInventory({ branchId, inventory })).unwrap();
      alert('Inventory updated successfully!');
    } catch (error) {
      console.error('Failed to update inventory:', error);
    }
  };

  if (branchesStatus === 'loading' || productsStatus === 'loading') return <CircularProgress />;
  if (!selectedBranch) return <Typography>No branch selected</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Typography variant="h5">Manage Inventory</Typography>
      <Typography variant="h6">Branch: {selectedBranch.name}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={inventory[product.id] ?? 0}
                    onChange={e => handleChange(product.id, e.target.value)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Update Inventory</Button>
      </Box>
    </Box>
  );
};

export default BranchInventory;
