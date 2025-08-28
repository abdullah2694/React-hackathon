// src/components/ReviewForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, MenuItem, CircularProgress } from '@mui/material';
import { submitReviewAction } from '../../store/reviewSlice';
import { fetchBranches } from '../../store/branchSlice';

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const [branchId, setBranchId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: branches, status: branchesStatus } = useSelector(state => state.branches);

  useEffect(() => {
    if (branchesStatus === 'idle') {
      dispatch(fetchBranches());
    }
  }, [dispatch, branchesStatus]);

  const handleSubmit = async () => {
    if (!user || !branchId || !review || isSubmitting) return;

    setIsSubmitting(true); // Disable button during submission
    try {
      await dispatch(
        submitReviewAction({
          branchId,
          review: {
            user: user.email,
            review,
            createdAt: new Date().toISOString(), // Add timestamp for better tracking
          },
        })
      ).unwrap();

      setReview('');
      setBranchId('');
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  if (branchesStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Submit Review
      </Typography>

      <TextField
        select
        label="Branch"
        value={branchId}
        onChange={e => setBranchId(e.target.value)}
        fullWidth
        margin="normal"
        disabled={isSubmitting}
      >
        {Array.isArray(branches) && branches.length > 0 ? (
          branches.map(branch => (
            <MenuItem key={branch.id} value={branch.id}>
              {branch.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            No branches available
          </MenuItem>
        )}
      </TextField>

      <TextField
        label="Review"
        value={review}
        onChange={e => setReview(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
        disabled={isSubmitting}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!review || !branchId || isSubmitting}
        sx={{ mt: 2 }}
        fullWidth
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Box>
  );
};

export default ReviewForm;