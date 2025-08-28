// Updated: src/components/ProductList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { addToCart } from '../../store/cartSlice';

const ProductList = () => {
  const { items: products, status } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status === 'loading') return <CircularProgress />;
  if (products.length === 0) return <Typography>No products found</Typography>;

  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ${product.price}</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 }));
                  navigate('/user/cart');
                }}
              >
                Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;