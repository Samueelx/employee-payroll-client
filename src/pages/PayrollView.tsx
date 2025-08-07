import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayroll, clearError } from '../features/payrollSlice';    
import type { AppDispatch, RootState } from '../store';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ArrowLeft, DollarSign } from 'lucide-react';
import type { Employee } from '@/types/employee.types';
import { formatFullName } from '@/utils/formatters';

const PayrollView = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { payroll, loading, error } = useSelector((state: RootState) => state.payroll);

  useEffect(() => {
    dispatch(fetchPayroll());
  }, [dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <DollarSign className="text-green-600" />
          Payroll Report
        </h1>
      </div>

      {error && (
        <ErrorMessage message={error} onClose={() => dispatch(clearError())} />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : payroll ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Employees</h3>
              <p className="text-2xl font-bold text-gray-900">{payroll.summary.total_employees}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Gross Salary</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(payroll.summary.total_gross_salary)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Deductions</h3>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(payroll.summary.total_deductions)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Net Salary</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(payroll.summary.total_net_salary)}</p>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Employee Payroll Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Gross Salary</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">SHIF</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Housing Levy</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">PAYE</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Total Deductions</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.data.map((employee: Employee) => (
                    <tr key={employee.employee_id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{formatFullName(employee.first_name, employee.last_name)}</p>
                          <p className="text-sm text-gray-500">{employee.employee_id}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{employee.department}</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(employee.basic_salary)}</td>
                      <td className="py-3 px-4 text-red-600">{formatCurrency(employee.deductions.shif)}</td>
                      <td className="py-3 px-4 text-red-600">{formatCurrency(employee.deductions.housing_levy)}</td>
                      <td className="py-3 px-4 text-red-600">{formatCurrency(employee.deductions.paye)}</td>
                      <td className="py-3 px-4 text-red-600 font-medium">{formatCurrency(employee.deductions.total)}</td>
                      <td className="py-3 px-4 font-bold text-green-600">{formatCurrency(employee.net_salary)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No payroll data available</p>
        </div>
      )}
    </div>
  );
};

export default PayrollView;