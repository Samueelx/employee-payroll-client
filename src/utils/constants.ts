export const EMPLOYEE_STATUS = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
};

export const DEPARTMENTS = [
  'IT',
  'HR',
  'Finance',
  'Marketing',
  'Operations',
  'Sales',
] as const;

export const DEDUCTION_TYPES = {
  SHIF: 'shif',
  HOUSING_LEVY: 'housing_levy',
  PAYE: 'paye',
} as const;