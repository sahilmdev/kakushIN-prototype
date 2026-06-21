import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import VoiceInput from './components/VoiceInput';
import AdminSidebar from './components/admin/AdminSidebar';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ScamFirewall from './pages/ScamFirewall';
import FinancialTwin from './pages/FinancialTwin';
import SchemeEligibility from './pages/SchemeEligibility';
import DocumentIntelligence from './pages/DocumentIntelligence';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserList from './pages/admin/UserList';
import UserProfile from './pages/admin/UserProfile';
import ScamReports from './pages/admin/ScamReports';
import SchemesDB from './pages/admin/SchemesDB';
import AdminDocuments from './pages/admin/AdminDocuments';
import Analytics from './pages/admin/Analytics';
import { useAdmin } from './context/AdminContext';

function UserLayout() {
  const location = useLocation();
  const showNav = location.pathname !== '/user';

  return (
    <div className="flex flex-col md:flex-row h-screen bg-app-bg overflow-hidden">
      {showNav && <NavBar />}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="max-w-content mx-auto px-4 md:px-8 py-5 md:py-7">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </main>
      {showNav && <VoiceInput />}
    </div>
  );
}

function AdminLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAdmin();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F0F4F8] overflow-hidden">
      {isAuthenticated && location.pathname !== '/admin' && <AdminSidebar />}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function Toast() {
  const { toast } = useAdmin();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-[#1E293B] text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-pulse">
      {toast}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <Toast />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Onboarding />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scam" element={<ScamFirewall />} />
          <Route path="twin" element={<FinancialTwin />} />
          <Route path="schemes" element={<SchemeEligibility />} />
          <Route path="docs" element={<DocumentIntelligence />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLogin />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } />
          <Route path="users/:userId" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="scam-reports" element={
            <ProtectedRoute>
              <ScamReports />
            </ProtectedRoute>
          } />
          <Route path="schemes" element={
            <ProtectedRoute>
              <SchemesDB />
            </ProtectedRoute>
          } />
          <Route path="documents" element={
            <ProtectedRoute>
              <AdminDocuments />
            </ProtectedRoute>
          } />
          <Route path="analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;