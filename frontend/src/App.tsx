import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayouts";
import UserPage from "./pages/UserPage";
import CyberPage from "./pages/CyberPage";
import PasswordGamePage from "./pages/PasswordGamePage";
import LessonPage from "./pages/LessonPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element= {<PasswordResetPage />} />
      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/cybersecurite"
          element={
            <ProtectedRoute>
              <CyberPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/modules/cybersecurite/lesson"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/cybersecurite/password-game"
          element={
            <ProtectedRoute>
              <PasswordGamePage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
    </Routes>
  );
}
