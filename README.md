# Employee Payroll Management Frontend

A modern React-based frontend application for managing employee records and generating payroll reports. This application connects to the Laravel Employee Payroll API to provide a complete employee management solution.

## Tech Stack

- **React 18+** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework for styling
- **Redux Toolkit** - State management with modern Redux patterns
- **Axios** - HTTP client for API requests
- **shadcn/ui** - Beautiful and accessible UI components
- **React Router** - Client-side routing

## Features

- **Employee Management**
  - View all employees in a paginated table
  - Add new employees with form validation
  - Edit existing employee information
  - Delete employees with confirmation

- **Payroll Management**
  - Generate payroll reports for all employees
  - Automatic calculation of statutory deductions (SHIF, Housing Levy, PAYE)

## Prerequisites

Before setting up this project, ensure you have:

- **Node.js** version 22 or higher
- **npm**
- **Employee Payroll API** running locally [see backend README](https://github.com/Samueelx/employee-payroll)

You can verify your Node.js version:
```bash
node --version
# Should show v22.x.x or higher
```

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Samueelx/employee-payroll-client.git
cd employee-payroll-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

# API Configuration
VITE_API_BASE=http://localhost:8000/api

# App Configuration
VITE_APP_NAME="Employee Payroll Management"
VITE_APP_VERSION="1.0.0"
```

### 4. Start the Backend API

Make sure your Laravel Employee Payroll API is running:

```bash
# In your Laravel project directory
composer run dev
```

The API should be accessible at `http://localhost:8000/api`

### 5. Start the Development Server

```bash
npm run dev
```

The frontend application will be available at: `http://localhost:5173`


## API Integration

This frontend connects to the Laravel Employee Payroll API with the following endpoints:

### Employee Endpoints
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/{id}` - Get specific employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Payroll Endpoints
- `GET /api/payroll` - Get payroll for all employees
- `GET /api/employees/{id}/payroll` - Get payroll for specific employee

## State Management

The application uses Redux Toolkit for state management with the following slices:

- **employeeSlice** - Manages employee data and operations
- **payrollSlice** - Handles payroll calculations and data
- **uiSlice** - Controls UI state (loading, notifications, theme)

## Styling with TailwindCSS

The project uses TailwindCSS for styling with:
- Responsive design utilities
- Custom color palette
- Component-based styling approach
- Dark mode support


## Building for Production

### 1. Build the Application
```bash
npm run build
```

### 2. Preview Production Build
```bash
npm run preview
```

### 3. Deploy
The built files will be in the `dist/` directory. You can deploy these to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- Apache/Nginx server

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure the Laravel API is running on `http://localhost:8000`
   - Check CORS settings in the Laravel backend
   - Verify the `VITE_API_BASE` environment variable

2. **Node.js Version Issues**
   - Ensure you're using Node.js version 22 or higher
   - Use `nvm` to manage multiple Node.js versions if needed

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf node_modules/.vite`
   - Check TypeScript errors: `npm run type-check`

4. **Environment Variables Not Working**
   - Ensure variables start with `VITE_` prefix
   - Restart the development server after changing `.env`
   - Check that `.env` file is in the project root


## License

This project is open-source and available under the [MIT License](LICENSE).

## Related Projects

- [Employee Payroll API](https://github.com/Samueelx/employee-payroll) - Laravel backend API
---

**Note**: This frontend application requires the Employee Payroll Laravel API to be running. Make sure to set up and start the backend API before using this application.