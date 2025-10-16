import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import DashboardLayout from './layouts/DashboardLayout'
import PatientDashboard from './layouts/PatientDashboard'
import DoctorDashboard from './layouts/DoctorDashboard'
import AdminDashboard from './layouts/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import CreateAppointment from './pages/appointments/CreateAppointment'
import MyAppointments from './pages/appointments/MyAppointments'
import { useSelector } from 'react-redux';
import { selectAuthLoading } from './store/slices/authSlice';
import LoadingSpinner from './components/LoadingSpinner';

function App() {

  const loading = useSelector(selectAuthLoading);
  return (
    <>
      {/* Global Loading Spinner */}
      {loading && <LoadingSpinner tip="İşleminiz gerçekleştiriliyor..." />}

      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />

          {/* Dashboard Routes - Nested with Outlet */}
          <Route path="/dashboard">
            {/* Patient Dashboard */}
            <Route
              path="patient"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout userRole="patient" />
                </ProtectedRoute>
              }
            >
              <Route index element={<PatientDashboard />} />
              <Route path="create-appointment" element={<CreateAppointment />} />
              <Route path="appointments" element={<MyAppointments />} />
            </Route>

            {/* Doctor Dashboard */}
            <Route
              path="doctor"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout userRole="doctor" />
                </ProtectedRoute>
              }
            >
              <Route index element={<DoctorDashboard />} />
            </Route>

            {/* Admin Dashboard */}
            <Route
              path="admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout userRole="admin" />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Backward compatibility - Eski URL'ler için redirect (opsiyonel) */}
          <Route path="/patient-dashboard" element={<Navigate to="/dashboard/patient" replace />} />
          <Route path="/doctor-dashboard" element={<Navigate to="/dashboard/doctor" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/dashboard/admin" replace />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App