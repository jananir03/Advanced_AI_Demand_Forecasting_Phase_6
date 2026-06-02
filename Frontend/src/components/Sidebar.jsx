import {
  LayoutDashboard,
  Upload,
  LineChart,
  FileText,
  Bell,
  ShieldCheck
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {

  // -----------------------------------
  // ROLE
  // -----------------------------------

  const role = localStorage.getItem(
    "role"
  );

  return (

    <div className="w-72 h-screen fixed left-0 top-0 bg-slate-900 text-white shadow-2xl p-6 overflow-y-auto z-50">

      {/* Blur Background */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Logo */}

      <div className="relative z-10 mb-14">

        <h1 className="text-3xl font-extrabold">

          AI Forecast

        </h1>

        <p className="text-gray-300 mt-2 text-sm">

          Welcome {

            localStorage.getItem(
              "username"
            )

              ?

              localStorage
                .getItem("username")
                .charAt(0)
                .toUpperCase()

              +

              localStorage
                .getItem("username")
                .slice(1)

              :

              "User"
          }         

        </p>

      </div>

      {/* Menu */}

      <nav className="relative z-10 space-y-3">

        {/* Dashboard */}

        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        {/* Upload Dataset */}

        {(role === "super_admin" ||

          role === "analyst") && (

          <Link
            to="/upload"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
          >
            <Upload size={22} />
            Upload Dataset
          </Link>
        )}

        {/* Forecast */}

        {(role === "super_admin" ||

          role === "analyst") && (

          <Link
            to="/forecast"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
          >
            <LineChart size={22} />
            Forecast
          </Link>
        )}

        {/* Reports */}

        <Link
          to="/reports"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <FileText size={22} />
          Reports
        </Link>

        {/* Notifications */}

        <Link
          to="/notifications"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <Bell size={22} />
          Notifications
        </Link>

        {/* Admin */}

        {role === "super_admin" && (

          <Link
            to="/admin"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
          >
            <ShieldCheck size={22} />
            Admin
          </Link>
        )}

      </nav>

    </div>
  );
};

export default Sidebar;