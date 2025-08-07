import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


const API_BASE = 'http://localhost:8000/api';


const fetchEmployees = createAsyncThunk('app/fetchEmployees', async () => {
  const response = await fetch(`${API_BASE}/employees`);
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
});

const createEmployee = createAsyncThunk('app/createEmployee', async (employee: Omit<Employee, 'id'>) => {
  const response = await fetch(`${API_BASE}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Failed to create employee');
  return response.json();
});

const updateEmployee = createAsyncThunk('app/updateEmployee', async ({ id, employee }: { id: number; employee: Employee }) => {
  const response = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Failed to update employee');
  return response.json();
});

const deleteEmployee = createAsyncThunk('app/deleteEmployee', async (id: number) => {
  const response = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete employee');
  return id;
});

const fetchPayroll = createAsyncThunk('app/fetchPayroll', async () => {
  const response = await fetch(`${API_BASE}/payroll`);
  if (!response.ok) throw new Error('Failed to fetch payroll');
  return response.json();
});

// Redux slice
const appSlice = createSlice({
  name: 'app',
  initialState: {
    employees: [],
    payroll: null,
    loading: false,
    error: null,
  } as AppState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.data || action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      // Create employee
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload.data || action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create employee';
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload.data || action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update employee';
      })
      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete employee';
      })
      // Payroll
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

const { clearError } = appSlice.actions;
const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});