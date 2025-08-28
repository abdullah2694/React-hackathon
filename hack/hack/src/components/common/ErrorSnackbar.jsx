import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const ErrorSnackbar = () => {
  const [open, setOpen] = useState(false);
  const error = useSelector(state => state.auth.error || state.branches.error || state.products.error || state.orders.error || state.reviews.error);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={!!error && (open || setOpen(true))} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error || 'An error occurred'}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;