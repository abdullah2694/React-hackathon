import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitReview, getReviews } from '../firebase/firestore';

// Fetch all reviews for a branch
export const fetchReviews = createAsyncThunk(
  'reviews/fetch',
  async (branchId, { rejectWithValue }) => {
    try {
      const reviews = await getReviews(branchId);
      return reviews;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Submit a new review
export const submitReviewAction = createAsyncThunk(
  'reviews/submit',
  async ({ branchId, review }, { rejectWithValue }) => {
    try {
      const savedReview = await submitReview(branchId, review);
      return savedReview;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchReviews.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; })
      .addCase(fetchReviews.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })

      // Submit Review
      .addCase(submitReviewAction.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(submitReviewAction.fulfilled, (state, action) => { state.items.push(action.payload); state.status = 'succeeded'; })
      .addCase(submitReviewAction.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
  },
});

export default reviewSlice.reducer;
