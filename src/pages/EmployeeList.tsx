import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, clearError } from '../features/employeeSlice'
import type { AppDispatch, RootState } from '../store/index';
import { Users, Plus, Edit, Trash2, Calculator } from 'lucide-react';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import type { Employee } from '../types/employee.types';

const EmployeeList = ({ onEdit, onAdd, onViewPayroll }: { 
  onEdit: (employee: Employee) => void; 
  onAdd: () => void; 
  onViewPayroll: () => void; 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-blue-600" />
          Employee Management
        </h1>
        <div className="flex gap-3">
          <button
            onClick={onViewPayroll}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Calculator size={16} />
            View Payroll
          </button>
          <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onClose={() => dispatch(clearError())} />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Employee ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Salary</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee: Employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{employee.employee_id}</td>
                      <td className="py-3 px-4">{employee.first_name} {employee.last_name}</td>
                      <td className="py-3 px-4 text-gray-600">{employee.email}</td>
                      <td className="py-3 px-4">{employee.department}</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(employee.basic_salary)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          employee.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onEdit(employee)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit Employee"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id!)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Employee"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                      No employees found. Add your first employee to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;