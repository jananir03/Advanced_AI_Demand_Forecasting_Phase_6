import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

import Login from "../pages/Login";

import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";

import UploadDataset from "../pages/UploadDataset";

import Forecast from "../pages/Forecast";

import Admin from "../pages/Admin";

import Reports from "../pages/Reports";

import Notifications from "../pages/Notifications";

import Integrations from "../pages/Integrations";

import AIFeatures from "../pages/AIFeatures";

import ForecastScheduler from "../pages/ForecastScheduler";

import ForgotPassword from "../pages/ForgotPassword";

import UserManagement from "../pages/UserManagement";

import ScenarioPlanning from "../pages/ScenarioPlanning";

import ForecastWorkspace from "../pages/ForecastWorkspace";

import ExecutiveDashboard from "../pages/ExecutiveDashboard";

// -----------------------------------
// Protected Route
// -----------------------------------

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem(
    "token"
  );

  return token

    ? children

    : <Navigate to="/login" />;
};


// -----------------------------------
// Placeholder Pages
// -----------------------------------

const Placeholder = ({ title }) => {

  return (

    <div className="text-4xl p-10">

      {title} Page

    </div>
  );
};


// -----------------------------------
// Routes
// -----------------------------------

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        {/* Upload Dataset */}

        <Route

          path="/upload"

          element={

            <ProtectedRoute>

              <UploadDataset />

            </ProtectedRoute>
          }
        />

        {/* Forecast */}

        <Route

          path="/forecast"

          element={

            <ProtectedRoute>

              <Forecast />

            </ProtectedRoute>
          }
        />

        {/* Reports */}

        <Route

          path="/reports"

          element={<Reports />}

        />

        {/* Notifications */}

        <Route

          path="/notifications"

          element={<Notifications />}

        />

        <Route
          path="/ai-features"
          element={<AIFeatures />}
        />

        <Route
          path="/integrations"
          element={<Integrations />}
        />

        <Route
          path="/forecast-scheduler"
          element={
          <ProtectedRoute>
            <ForecastScheduler />
          </ProtectedRoute>
          }
        />
        
        {/* Admin */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route

          path="/scenario-planning"

          element={<ScenarioPlanning />}

        />

        <Route

          path="/forecast-workspace"

          element={
            <ForecastWorkspace />
          }
        />

        <Route
          path="/executive-dashboard"
          element={<ExecutiveDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;