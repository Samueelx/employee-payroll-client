export interface Employee {
  id?: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  basic_salary: number;
  hire_date: string;
  department: string;
  status: 'active' | 'inactive';
}

export interface CreateEmployeeRequest extends Omit<Employee, 'id'> {}
export interface UpdateEmployeeRequest extends Employee {}