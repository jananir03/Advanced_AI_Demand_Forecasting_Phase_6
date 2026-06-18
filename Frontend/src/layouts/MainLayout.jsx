import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

const MainLayout = ({ children }) => {

  const [theme, setTheme] = useState(

    localStorage.getItem("theme") ||

    "light"
  );

  const [

    unreadCount,

    setUnreadCount

  ] = useState(0);

  useEffect(() => {

    localStorage.setItem(
      "theme",
      theme
    );

    if (theme === "dark") {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

    }

  }, [theme]);

  useEffect(() => {

    const fetchUnreadCount = async () => {

      try {

        const response =
          await API.get(
            "/notifications/unread-count"
          );

        setUnreadCount(
          response.data.unread_count
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchUnreadCount();

  }, []);

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/login";

  };

  return (

    <div

      className={`

        min-h-screen

        relative

        overflow-hidden

        transition-all

        duration-500

        ${

          theme === "dark"

            ?

            "bg-[#020617]"

            :

            "bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] via-50% to-[#312E81]"

        }

      `}
    >

      {/* CYAN GLOW */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* PURPLE GLOW */}

      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* BLUE GLOW */}

      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN SECTION */}

      <div

        className="

          relative

          z-10

          ml-[340px]

          mr-6

          mt-6

          mb-6

          min-h-[calc(100vh-48px)]

          flex

          flex-col

        "

      >
        <Navbar
          unreadCount={unreadCount}
          
          onLogout={handleLogout}
        />

        {/* TOP ACTION BAR */}

        <div className="flex justify-end mt-5 mb-5">

          <button

            onClick={() =>

              setTheme(

                theme === "dark"

                  ? "light"

                  : "dark"
              )
            }

            className="

              px-5

              py-3

              rounded-2xl

              bg-white/10

              backdrop-blur-xl

              border

              border-white/10

              text-white

              shadow-xl

              hover:scale-105

              transition-all

            "

          >

            {

              theme === "dark"

                ?

                "☀️ Light Mode"

                :

                "🌙 Dark Mode"

            }

          </button>

        </div>

        {/* PAGE CONTENT */}

        <div

          className="

            flex-1

            rounded-[32px]

            bg-transparent

            backdrop-blur-xl

            border

            border-white/10

            shadow-2xl

            p-8

            overflow-auto

          "

        >

          {children}

        </div>

      </div>

    </div>

  );

};

export default MainLayout;