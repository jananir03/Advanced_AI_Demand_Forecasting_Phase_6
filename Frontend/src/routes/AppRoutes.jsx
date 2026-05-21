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
        
        {/* Admin */}

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;