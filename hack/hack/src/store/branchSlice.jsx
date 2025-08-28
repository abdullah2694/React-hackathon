import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const fetchBranches = createAsyncThunk('branches/fetch', async (_, { rejectWithValue }) => {
  try {
    const snapshot = await getDocs(collection(db, 'branches'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addBranch = createAsyncThunk('branches/add', async (branchData, { rejectWithValue }) => {
  try {
    const docRef = await addDoc(collection(db, 'branches'), branchData);
    return { id: docRef.id, ...branchData };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateInventory = createAsyncThunk('branches/updateInventory', async ({ branchId, inventory }, { rejectWithValue }) => {
  try {
    await updateDoc(doc(db, 'branches', branchId), { inventory });
    return { branchId, inventory };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addEmployee = createAsyncThunk('branches/addEmployee', async ({ branchId, employeeData }, { rejectWithValue }) => {
  try {
    const branchRef = doc(db, 'branches', branchId);
    const branchDoc = await getDoc(branchRef);
    if (!branchDoc.exists()) {
      throw new Error('Branch not found');
    }
    const currentEmployees = branchDoc.data().employees || [];
    const updatedEmployees = [...currentEmployees, { ...employeeData, employeeId: Date.now().toString() }];
    await updateDoc(branchRef, { employees: updatedEmployees });
    return { branchId, employee: updatedEmployees[updatedEmployees.length - 1] };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addBranch.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        const { branchId, inventory } = action.payload;
        const branch = state.items.find(item => item.id === branchId);
        if (branch) {
          branch.inventory = inventory;
        }
        state.error = null;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        const { branchId, employee } = action.payload;
        const branch = state.items.find(item => item.id === branchId);
        if (branch) {
          branch.employees = branch.employees || [];
          branch.employees.push(employee);
        }
        state.error = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default branchSlice.reducer;