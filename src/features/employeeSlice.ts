import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/employee.types';
import { employeeApi } from '../services/api';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    return await employeeApi.getEmployees();
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employee: CreateEmployeeRequest) => {
    return await employeeApi.createEmployee(employee);
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employee }: { id: number; employee: UpdateEmployeeRequest }) => {
    return await employeeApi.updateEmployee(id, employee);
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    await employeeApi.deleteEmployee(id);
    return id;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;