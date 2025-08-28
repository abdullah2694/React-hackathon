import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Table, TableHead, TableRow, TableBody, TableCell, CircularProgress } from '@mui/material';
import { fetchBranches, addEmployee } from '../../store/branchSlice';

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.branches.items);
  const branchesStatus = useSelector(state => state.branches.status);
  const user = useSelector(state => state.auth.user);

  const branchId = user?.role === 'branch_manager' ? user.branchId : branches[0]?.id;
  const selectedBranch = branches.find(b => b.id === branchId);

  const [formData, setFormData] = useState({ name: '', role: '', email: '' });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branchId) return;
    try {
      await dispatch(addEmployee({ branchId, employeeData: formData })).unwrap();
      setFormData({ name: '', role: '', email: '' });
      alert('Employee added successfully!');
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  if (branchesStatus === 'loading') return <CircularProgress />;
  if (!selectedBranch) return <Typography>No branch selected</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Typography variant="h5">Manage Employees</Typography>
      <Typography variant="h6">Branch: {selectedBranch.name}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>Add Employee</Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Current Employees</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(selectedBranch.employees || []).map(emp => (
              <TableRow key={emp.employeeId}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>{emp.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default EmployeeManagement;
