import type { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/employee.types';
import type { PayrollData } from '../types/payroll.types';
import type { ApiResponse } from '../types/api.types';
import { apiClient } from './api';

class EmployeeApi {
  async getEmployees(): Promise<Employee[]> {
    const response = await apiClient.get<ApiResponse<Employee[]>>('/employees');
    return response.data;
  }

  async getEmployee(id: number): Promise<Employee> {
    const response = await apiClient.get<ApiResponse<Employee>>(`/employees/${id}`);
    return response.data;
  }

  async createEmployee(employee: CreateEmployeeRequest): Promise<Employee> {
    const response = await apiClient.post<ApiResponse<Employee>>('/employees', employee);
    return response.data;
  }

  async updateEmployee(id: number, employee: UpdateEmployeeRequest): Promise<Employee> {
    const response = await apiClient.put<ApiResponse<Employee>>(`/employees/${id}`, employee);
    return response.data;
  }

  async deleteEmployee(id: number): Promise<void> {
    await apiClient.delete(`/employees/${id}`);
  }

  async getPayroll(): Promise<PayrollData> {
    return await apiClient.get<PayrollData>('/payroll');
  }

  async getEmployeePayroll(id: number): Promise<PayrollData> {
    return await apiClient.get<PayrollData>(`/employees/${id}/payroll`);
  }
}

export const employeeApi = new EmployeeApi();