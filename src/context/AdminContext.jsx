import { createContext, useContext, useState } from 'react';
import usersData from '../data/admin/users.json';
import analyticsData from '../data/admin/analytics.json';
import scamReportsData from '../data/admin/scam-reports.json';
import schemesDbData from '../data/admin/schemes-db.json';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(usersData.users);
  const [scamReports, setScamReports] = useState(scamReportsData);
  const [schemesDb, setSchemesDb] = useState(schemesDbData);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const login = (email, password) => {
    if (email === 'admin@demo.in' && password === 'demo123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleUserFlag = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, flagged: !user.flagged } : user
    ));
  };

  const updateScamReportStatus = (reportId, status) => {
    setScamReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
  };

  const updateScheme = (schemeId, updates) => {
    setSchemesDb(prev => prev.map(scheme => 
      scheme.id === schemeId ? { ...scheme, ...updates } : scheme
    ));
  };

  const addScheme = (scheme) => {
    setSchemesDb(prev => [...prev, scheme]);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      users,
      setUsers,
      toggleUserFlag,
      scamReports,
      updateScamReportStatus,
      schemesDb,
      updateScheme,
      addScheme,
      analytics: analyticsData,
      cohortInfo: usersData,
      showToast,
      toast
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
