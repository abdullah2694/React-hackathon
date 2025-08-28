import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import { fetchBranches } from '../../store/branchSlice';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.branches.items);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Employee List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Branch</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map(branch => 
            (branch.employees || []).map(employee => (
              <TableRow key={`${branch.id}-${employee.employeeId}`}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.contact}</TableCell>
                <TableCell>{employee.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EmployeeList;
