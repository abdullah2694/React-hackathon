import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { fetchBranches } from '../../store/branchSlice';
import { fetchReviews } from '../../store/reviewSlice';

const ReviewList = () => {
  const dispatch = useDispatch();

  const branches = useSelector(state => state.branches.items || []);
  const branchesStatus = useSelector(state => state.branches.status);

  const reviews = useSelector(state => state.reviews.items || []);
  const reviewsStatus = useSelector(state => state.reviews.status);

  const user = useSelector(state => state.auth.user);

  // Determine branch to show
  const branchId = useMemo(() => {
    if (user?.role === 'branch_manager') return user.branchId;
    if (branches.length > 0) return branches[0].id;
    return null;
  }, [user, branches]);

  const selectedBranch = useMemo(() => branches.find(b => b.id === branchId), [branches, branchId]);

  // Fetch branches on mount
  useEffect(() => {
    if (branchesStatus === 'idle') dispatch(fetchBranches());
  }, [dispatch, branchesStatus]);

  // Fetch reviews when branchId changes
  useEffect(() => {
    if (branchId) dispatch(fetchReviews(branchId));
  }, [dispatch, branchId]);

  // Loading state
  if (branchesStatus === 'loading' || reviewsStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedBranch) {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>No branch selected</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Branch Reviews</Typography>
      <Typography variant="h6" gutterBottom>Branch: {selectedBranch.name}</Typography>

      {reviewsStatus === 'succeeded' && reviews.length === 0 ? (
        <Typography>No reviews available</Typography>
      ) : (
        <List>
          {reviews.map(review => (
            <ListItem key={review.id} divider>
              <ListItemText primary={review.comment} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ReviewList;
