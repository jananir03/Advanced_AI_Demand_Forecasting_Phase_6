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
  BarChart3,
  Building2,
  FolderKanban,
  CheckCircle2,
  Shield,
  Workflow,
  Target,
  Activity,
  Command,
  PanelsTopLeft,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const role = localStorage.getItem(
    "role"
  );

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (

    <div className="w-80 h-screen fixed left-0 top-0 bg-[#0F172A] text-white shadow-2xl overflow-y-scroll overflow-x-hidden z-50 border-r border-slate-800">

      {/* GLOWS */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* HEADER */}

      <div className="relative z-10 p-8 border-b border-slate-800">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">

          AI Forecasting

        </h1>

        <p className="text-slate-400 text-sm mt-2">

          Enterprise Suite v6.0

        </p>

        <div className="mt-5 bg-slate-800/60 rounded-2xl p-4">

          <p className="text-xs text-slate-400">

            Logged In As

          </p>

          <p className="font-semibold mt-1">

            {

              localStorage.getItem("username")

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

      </div>

      <div className="relative z-10 p-6">

        {/* EXECUTIVE */}

        <div className="mb-8">

          <p className="text-cyan-400 text-xs font-bold tracking-widest mb-3">

            EXECUTIVE

          </p>

          <nav className="space-y-2">

            <NavLink
              to="/executive-command-center"
              className={menuClass}
            >
              <Command size={20} />
              Executive Command Center
            </NavLink>

            <NavLink
              to="/executive-dashboard"
              className={menuClass}
            >
              <BarChart3 size={20} />
              Executive Dashboard
            </NavLink>

            <NavLink
              to="/dashboard-widgets"
              className={menuClass}
            >
              <PanelsTopLeft size={20} />
              Dashboard Widgets
            </NavLink>

            <NavLink
              to="/reports"
              className={menuClass}
            >
              <FileText size={20} />
              Reports
            </NavLink>

          </nav>

        </div>

        {/* FORECASTING */}

        <div className="mb-8">

          <p className="text-blue-400 text-xs font-bold tracking-widest mb-3">

            FORECASTING

          </p>

          <nav className="space-y-2">

            <NavLink
              to="/forecast"
              className={menuClass}
            >
              <LineChart size={20} />
              Forecast
            </NavLink>

            <NavLink
              to="/scenario-planning"
              className={menuClass}
            >
              <GitBranch size={20} />
              Scenario Planning
            </NavLink>

            <NavLink
              to="/forecast-workspace"
              className={menuClass}
            >
              <Briefcase size={20} />
              Forecast Workspace
            </NavLink>

            <NavLink
              to="/forecast-scheduler"
              className={menuClass}
            >
              <CalendarClock size={20} />
              Forecast Scheduler
            </NavLink>

            <NavLink
              to="/forecast-approval"
              className={menuClass}
            >
              <CheckCircle2 size={20} />
              Forecast Approval
            </NavLink>

            <NavLink
              to="/forecast-governance"
              className={menuClass}
            >
              <Shield size={20} />
              Forecast Governance
            </NavLink>

          </nav>

        </div>

                {/* INTELLIGENCE */}

        <div className="mb-8">

          <p className="text-purple-400 text-xs font-bold tracking-widest mb-3">

            INTELLIGENCE

          </p>

          <nav className="space-y-2">

            <NavLink
              to="/ai-features"
              className={menuClass}
            >
              <BrainCircuit size={20} />
              AI Insights
            </NavLink>

            <NavLink
              to="/strategic-planning"
              className={menuClass}
            >
              <Target size={20} />
              Strategic Planning
            </NavLink>

            <NavLink
              to="/kpi-management"
              className={menuClass}
            >
              <Activity size={20} />
              KPI Management
            </NavLink>

            <NavLink
              to="/data-quality"
              className={menuClass}
            >
              <ShieldCheck size={20} />
              Data Quality
            </NavLink>

          </nav>

        </div>

        {/* ORGANIZATION */}

        <div className="mb-8">

          <p className="text-green-400 text-xs font-bold tracking-widest mb-3">

            ORGANIZATION

          </p>

          <nav className="space-y-2">

            <NavLink
              to="/organizations"
              className={menuClass}
            >
              <Building2 size={20} />
              Organizations
            </NavLink>

            <NavLink
              to="/projects"
              className={menuClass}
            >
              <FolderKanban size={20} />
              Projects
            </NavLink>

            <NavLink
              to="/upload"
              className={menuClass}
            >
              <Upload size={20} />
              Dataset Management
            </NavLink>

            <NavLink
              to="/integrations"
              className={menuClass}
            >
              <Plug size={20} />
              Integrations
            </NavLink>

          </nav>

        </div>

        {/* PLATFORM */}

        <div className="mb-8">

          <p className="text-orange-400 text-xs font-bold tracking-widest mb-3">

            PLATFORM

          </p>

          <nav className="space-y-2">

            <NavLink
              to="/dashboard"
              className={menuClass}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/workflow-automation"
              className={menuClass}
            >
              <Workflow size={20} />
              Workflow Automation
            </NavLink>

            <NavLink
              to="/notifications"
              className={menuClass}
            >
              <Bell size={20} />
              Notifications
            </NavLink>

            <NavLink
              to="/user-management"
              className={menuClass}
            >
              <Users size={20} />
              User Management
            </NavLink>

            {

              role === "super_admin" && (

                <NavLink
                  to="/admin"
                  className={menuClass}
                >
                  <ShieldCheck size={20} />
                  Admin Center
                </NavLink>

              )

            }

            <NavLink
              to="/settings"
              className={menuClass}
            >
              <Settings size={20} />
              Settings
            </NavLink>

          </nav>

        </div>

      </div>

    </div>

  );

};

export default Sidebar;