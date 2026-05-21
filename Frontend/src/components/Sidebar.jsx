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

  return (

    <div className="w-72 min-h-screen bg-slate-900 text-white shadow-2xl p-6 relative overflow-hidden">

      {/* Blur Background */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Logo */}

      <div className="relative z-10 mb-14">

        <h1 className="text-3xl font-extrabold">

          AI Forecast

        </h1>

        <p className="text-gray-300 mt-2 text-sm">

          Analytics Platform

        </p>

      </div>

      {/* Menu */}

      <nav className="relative z-10 space-y-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <Upload size={22} />
          Upload Dataset
        </Link>

        <Link
          to="/forecast"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <LineChart size={22} />
          Forecast
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <FileText size={22} />
          Reports
        </Link>

        <Link
          to="/notifications"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <Bell size={22} />
          Notifications
        </Link>

        <Link
          to="/admin"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition duration-300 font-medium"
        >
          <ShieldCheck size={22} />
          Admin
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;