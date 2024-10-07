import React from 'react';
import { useAuth } from '../context/AuthContext';

const ManagerDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Manager Dashboard</h1>
      <button
        onClick={logout}
        className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default ManagerDashboard;
