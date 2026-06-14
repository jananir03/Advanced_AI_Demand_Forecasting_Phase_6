import {
  LayoutDashboard,
  Upload,
  LineChart,
  FileText,
  Bell,
  ShieldCheck,
  BrainCircuit,
  Plug,
  CalendarClock,
  Users,
  GitBranch,
  Briefcase,
  BarChart3
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  // -----------------------------------
  // ROLE
  // -----------------------------------

  const role = localStorage.getItem(
    "role"
  );

  const menuClass = ({ isActive }) =>
  `flex items-center gap-4 px-5 py-4 rounded-2xl transition duration-300 font-medium ${
    isActive
      ? "bg-blue-600 to indigo-600 text-white shadow-lg"
      : "hover:bg-white/10"
  }`;
  

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

        <NavLink
          to="/executive-dashboard"
          className={menuClass}
        >
          <BarChart3 size={22} />
          Executive Dashboard
        </NavLink>

        {/* Dashboard */}

        <NavLink
          to="/dashboard"
          className={menuClass}
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/scenario-planning"
          className={menuClass}
        >
          <GitBranch size={22} />
          What-If Analysis
        </NavLink>


        {/* Upload Dataset */}

        {(role === "super_admin" ||

          role === "analyst") && (

          <NavLink
            to="/upload"
            className={menuClass}
          >
            <Upload size={22} />
            Upload Dataset
          </NavLink>
        )}

        {/* Forecast */}

        {(role === "super_admin" ||

          role === "analyst") && (

          <NavLink
            to="/forecast"
            className={menuClass}
          >
            <LineChart size={22} />
            Forecast
          </NavLink>
        )}

        {(role === "super_admin" ||

          role === "analyst") && (

        <NavLink
          to="/forecast-scheduler"
          className={menuClass}
        >
            <CalendarClock size={22} />
            Forecast Scheduler
          </NavLink>
        )}

        {/* Reports */}

        <NavLink
          to="/reports"
          className={menuClass}
        >
          <FileText size={22} />
          Reports
        </NavLink>

        <NavLink
          to="/ai-features"
          className={menuClass}
        >
          <BrainCircuit size={22} />
          AI Features
        </NavLink>

        <NavLink
          to="/integrations"
          className={menuClass}
        >
         <Plug size={22} />
          Integrations
        </NavLink>

        <NavLink
          to="/forecast-workspace"
          className={menuClass}
        >
         <Briefcase size={22} />
          Forecast Workspaces
        </NavLink>


          
        {/* Notifications */}

        <NavLink
          to="/notifications"
          className={menuClass}
        >
          <Bell size={22} />
          Notifications
        </NavLink>

        <NavLink
          to="/user-management"
          className={menuClass}
        >
          <Users size={22} />
          User Management
        </NavLink>

        {/* Admin */}

        {role === "super_admin" && (

          <NavLink
            to="/admin"
            className={menuClass}
          >
            <ShieldCheck size={22} />
            Admin
          </NavLink>
        )}

      </nav>

    </div>
  );
};

export default Sidebar;