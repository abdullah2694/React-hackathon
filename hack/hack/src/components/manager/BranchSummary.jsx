import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchBranches } from '../../store/branchSlice';

const BranchSummary = () => {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.branches.items);
  const branchesStatus = useSelector(state => state.branches.status);
  const user = useSelector(state => state.auth.user);

  const branchId = user?.role === 'branch_manager' ? user.branchId : branches[0]?.id;
  const selectedBranch = branches.find(b => b.id === branchId);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  if (branchesStatus === 'loading') return <CircularProgress />;
  if (!selectedBranch) return <Typography>No branch selected</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Typography variant="h5">Branch Summary</Typography>
      <Typography variant="h6">Name: {selectedBranch.name}</Typography>
      <Typography>Location: {selectedBranch.location}</Typography>
      <Typography>Manager: {selectedBranch.managerEmail || 'N/A'}</Typography>
      <Typography>Inventory Items: {Object.keys(selectedBranch.inventory || {}).length}</Typography>
      <Typography>Employees: {(selectedBranch.employees || []).length}</Typography>
    </Box>
  );
};

export default BranchSummary;
