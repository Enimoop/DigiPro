import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AppLayout = lazy(() => import("./layouts/AppLayouts"));
const UserPage = lazy(() => import("./pages/UserPage"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const ModulePage = lazy(() => import("./pages/ModulePage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const GamePage = lazy(() => import("./pages/GamePage"));

export default function App() {
  return (
    <Suspense fallback={<div className="d-flex justify-content-center py-5">Chargement...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route element={<AppLayout />}>
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
            path="/modules/:moduleId"
            element={
              <ProtectedRoute>
                <ModulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:moduleId/:themeId/lesson"
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:moduleId/:themeId/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:moduleId/:themeId/game"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
      </Routes>
    </Suspense>
  );
}
