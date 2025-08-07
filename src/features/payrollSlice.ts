import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayrollData } from '../types/payroll.types';
import { employeeApi } from '../../services/employeeApi';

interface PayrollState {
  payroll: PayrollData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PayrollState = {
  payroll: null,
  loading: false,
  error: null,
};

export const fetchPayroll = createAsyncThunk(
  'payroll/fetchPayroll',
  async () => {
    return await employeeApi.getPayroll();
  }
);

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayroll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayroll.fulfilled, (state, action) => {
        state.loading = false;
        state.payroll = action.payload;
      })
      .addCase(fetchPayroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payroll';
      });
  },
});

export const { clearError } = payrollSlice.actions;
export default payrollSlice.reducer;