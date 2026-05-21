import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-blue-700 via-sky-200 to-indigo-300 relative overflow-hidden">

      {/* LEFT GLOW */}

      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>

      {/* RIGHT GLOW */}

      <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

      {/* CENTER GLOW */}

      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-cyan-200/20 rounded-full blur-3xl"></div>

      {/* ANALYTICS GRAPH */}

      <div className="absolute right-16 bottom-16 opacity-10">

        <svg width="320" height="180">

          <polyline

            fill="none"

            stroke="#1e3a8a"

            strokeWidth="6"

            points="0,140 60,100 120,120 180,70 240,90 300,40"
          />

        </svg>

      </div>

      {/* MAIN CONTENT */}

      <Sidebar />

      <div className="flex-1 flex flex-col relative z-10">

        <Navbar />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
};

export default MainLayout;