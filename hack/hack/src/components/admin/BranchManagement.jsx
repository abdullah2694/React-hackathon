import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { addBranch } from '../../store/branchSlice';

const BranchManagement = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    managerEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const branchError = useSelector(state => state.branches.error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addBranch(formData)).unwrap();
      setFormData({ name: '', location: '', managerEmail: '' });
      alert('Branch added successfully!');
    } catch (err) {
      console.error('Failed to add branch:', err);
      alert('Error adding branch: ' + err);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Add New Branch</Typography>
      {branchError && <Typography color="error">{branchError}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Branch Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Manager Email"
          name="managerEmail"
          value={formData.managerEmail}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Branch'}
        </Button>
      </form>
    </Box>
  );
};

export default BranchManagement;
