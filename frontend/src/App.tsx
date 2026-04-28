import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AppLayout = lazy(() => import("./layouts/AppLayouts"));
const UserPage = lazy(() => import("./pages/UserPage"));
const PublicResourcesPage = lazy(() => import("./pages/PublicResourcesPage"));
const PublicTestIndexPage = lazy(() => import("./pages/PublicTestIndexPage.tsx"));
const PublicTestProfilePage = lazy(() => import("./pages/PublicTestProfilePage.tsx"));
const PublicTestGamePage = lazy(() => import("./pages/PublicTestGamePage.tsx"));
const PublicTestLessonPage = lazy(() => import("./pages/PublicTestLessonPage.tsx"));
const PublicTestQuizPage = lazy(() => import("./pages/PublicTestQuizPage.tsx"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const ModulePage = lazy(() => import("./pages/ModulePage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const GamePage = lazy(() => import("./pages/GamePage"));

export default function App() {
  return (
    <Suspense fallback={<div className="d-flex justify-content-center py-5">Chargement...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route element={<AppLayout />}>
          <Route path="/public-resources" element={<PublicResourcesPage />} />
          <Route path="/public-test" element={<PublicTestIndexPage />} />
          <Route path="/public-test/lesson" element={<PublicTestLessonPage />} />
          <Route path="/public-test/quiz" element={<PublicTestQuizPage />} />
          <Route path="/public-test/profile" element={<PublicTestProfilePage />} />
          <Route path="/public-test/game" element={<PublicTestGamePage />} />
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
