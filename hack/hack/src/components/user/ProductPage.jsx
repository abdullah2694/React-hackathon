
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { fetchProducts } from '../../store/productSlice';
import ProductList from './ProductList';

const ProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Products</Typography>
      <ProductList />
    </Box>
  );
};

export default ProductPage;