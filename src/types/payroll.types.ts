export interface PayrollEmployee {
  employee_id: number;
  employee_code: string;
  full_name: string;
  department: string;
  gross_salary: number;
  deductions: {
    shif: number;
    housing_levy: number;
    paye: number;
    total: number;
  };
  net_salary: number;
}

export interface PayrollSummary {
  total_employees: number;
  total_gross_salary: number;
  total_deductions: number;
  total_net_salary: number;
}

export interface PayrollData {
  success: boolean;
  data: PayrollEmployee[];
  summary: PayrollSummary;
}