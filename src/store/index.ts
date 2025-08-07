import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '../features/employeeSlice';
import payrollSlice from '../features/payrollSlice';

export const store = configureStore({
  reducer: {
    employees: employeeSlice,
    payroll: payrollSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;