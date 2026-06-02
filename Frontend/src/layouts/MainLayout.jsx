import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {

  const [theme, setTheme] = useState(

    localStorage.getItem("theme") ||

    "light"
  );

  useEffect(() => {

    localStorage.setItem(
      "theme",
      theme
    );
    if (theme =="dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {

      document.documentElement.classList.remove(
        "dark"
      );
    }

  }, [theme]);

  

  return (

    <div

      className={`

        flex

        min-h-screen

        relative

        overflow-hidden

        transition-all

        duration-300

        ${

          theme === "dark"

            ? "bg-slate-900"

            : "bg-gradient-to-br from-blue-700 via-sky-200 to-indigo-300"
        }

      `}
    >

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

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col relative z-10 ml-72">

        <Navbar />

        {/* THEME TOGGLE */}

        <div className="flex justify-end px-6 pt-4">

          <button

            onClick={() =>

              setTheme(

                theme === "dark"

                  ? "light"

                  : "dark"
              )
            }

            className="bg-slate-800 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition"
          >

            {

              theme === "dark"

                ? "☀️ Light Mode"

                : "🌙 Dark Mode"
            }

          </button>

        </div>

        <div

          className={`

            p-6

            overflow-y-auto

            transition-all

            duration-300

            ${

              theme === "dark"

                ? "text-white"

                : "text-black"
            }

          `}
        >

          {children}

        </div>

      </div>

    </div>
  );
};

export default MainLayout;