const AuthLayout = ({ children }) => {

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-sky-200 to-indigo-300 relative overflow-hidden">

      {/* LEFT GLOW */}

      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600/40 rounded-full blur-3xl"></div>

      {/* RIGHT GLOW */}

      <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>

      {/* CENTER GLOW */}

      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-cyan-200/20 rounded-full blur-3xl"></div>

      {/* SIMPLE ANALYTICS GRAPH */}

      <div className="absolute left-16 bottom-20 opacity-20">

        <svg width="500" height="200">

          <polyline

            fill="none"

            stroke="#dbeafe"

            strokeWidth="5"

            points="0,150 80,80 160,120 240,50 320,100 400,40 500,90"
          />

          <circle cx="80" cy="80" r="8" fill="#dbeafe" />

          <circle cx="240" cy="50" r="8" fill="#dbeafe" />

          <circle cx="400" cy="40" r="8" fill="#dbeafe" />

        </svg>

      </div>

      {/* CONTENT */}

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );
};

export default AuthLayout;