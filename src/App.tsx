import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import  EmployeeList  from '@/pages/EmployeeList';
import  EmployeeForm  from '@/pages/EmployeeForm';
import  PayrollView  from '@/pages/PayrollView';
import type { Employee } from './types/employee.types';
import './App.css'; // Assuming you have some global styles

// type View = 'employees' | 'payroll';

const App = () => {
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'payroll'>('list');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setCurrentView('form');
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setEditingEmployee(null);
    setCurrentView('list');
  };

  const handleViewPayroll = () => {
    setCurrentView('payroll');
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'list' && (
          <EmployeeList 
            onEdit={handleEditEmployee}
            onAdd={handleAddEmployee}
            onViewPayroll={handleViewPayroll}
          />
        )}
        {currentView === 'form' && (
          <EmployeeForm 
            employee={editingEmployee}
            onBack={handleBackToList}
          />
        )}
        {currentView === 'payroll' && (
          <PayrollView onBack={handleBackToList} />
        )}
      </div>
    </Provider>
  );
};

export default App;