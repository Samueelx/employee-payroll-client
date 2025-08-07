import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { EmployeesPage } from './pages/EmployeesPage';
import { PayrollPage } from './pages/PayrollPage';

type View = 'employees' | 'payroll';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('employees');

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'employees' && (
          <EmployeesPage onViewPayroll={() => setCurrentView('payroll')} />
        )}
        {currentView === 'payroll' && (
          <PayrollPage onBack={() => setCurrentView('employees')} />
        )}
      </div>
    </Provider>
  );
};

export default App;