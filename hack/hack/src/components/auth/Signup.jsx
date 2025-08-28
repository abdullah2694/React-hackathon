import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { signup } from '../../store/authSlice';
import { fetchBranches } from '../../store/branchSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [branchId, setBranchId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector(state => state.auth);
  const branches = useSelector(state => state.branches.items);
  const branchesLoading = useSelector(state => state.branches.status === 'loading');

  useEffect(() => {
    if (role === 'branch_manager') {
      dispatch(fetchBranches());
    }
  }, [role, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupData = { email, password, role, ...(role === 'branch_manager' && branchId && { branchId }) };
      const result = await dispatch(signup(signupData)).unwrap();
      if (result) {
        navigate(`/${role === 'branch_manager' ? 'manager' : role}`);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5">Sign Up</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading || branchesLoading}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading || branchesLoading}
        />
        <FormControl fullWidth margin="normal" disabled={loading || branchesLoading}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="branch_manager">Branch Manager</MenuItem>
          </Select>
        </FormControl>
        {role === 'branch_manager' && (
          <FormControl fullWidth margin="normal" disabled={loading || branchesLoading}>
            <InputLabel>Branch</InputLabel>
            <Select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              label="Branch"
            >
              {branchesLoading ? (
                <MenuItem disabled>Loading branches...</MenuItem>
              ) : branches.length > 0 ? (
                branches.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>
                ))
              ) : (
                <MenuItem disabled>No branches available</MenuItem>
              )}
            </Select>
          </FormControl>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={loading || branchesLoading || (role === 'branch_manager' && !branchId)}
          sx={{ mt: 1 }}
        >
          {loading || branchesLoading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;