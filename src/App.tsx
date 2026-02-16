import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { StudyEditor } from '@/pages/StudyEditor';
import FilminasEditor from '@/pages/FilminasEditor';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/studies/new"
              element={
                <ProtectedRoute>
                  <StudyEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/studies/:id/edit"
              element={
                <ProtectedRoute>
                  <StudyEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/filminas"
              element={
                <ProtectedRoute>
                  <FilminasEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/filminas/:studyId"
              element={
                <ProtectedRoute>
                  <FilminasEditor />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
