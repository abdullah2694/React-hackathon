import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.navigate('/');
            }}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Wrapper to inject useNavigate
const ErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate} {...props} />;
};

export default ErrorBoundaryWithNavigate;
