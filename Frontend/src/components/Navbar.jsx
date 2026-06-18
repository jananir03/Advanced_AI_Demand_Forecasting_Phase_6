import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState
} from "react";

import API from "../services/api";

import {
  Bell,
  Search,
  LogOut,
  UserCircle,
  Eye
} from "lucide-react";


const Navbar = ({

  unreadCount = 0,

  onLogout

}) => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [

    showNotifications,

    setShowNotifications

  ] = useState(false);

  const [

    notifications,

    setNotifications

  ] = useState([]);

  const dropdownRef =
    useRef(null);

  const getPageTitle =
    () => {

      const pathname =
        location.pathname;

      if (
        pathname.includes(
          "dashboard"
        )
      )
        return "Dashboard";

      if (
        pathname.includes(
          "forecast"
        )
      )
        return "Forecast Center";

      if (
        pathname.includes(
          "scenario"
        )
      )
        return "Scenario Planning";

      if (
        pathname.includes(
          "workspace"
        )
      )
        return "Forecast Workspace";

      if (
        pathname.includes(
          "executive"
        )
      )
        return "Executive Dashboard";

      if (
        pathname.includes(
          "reports"
        )
      )
        return "Reports Center";

      if (
        pathname.includes(
          "notifications"
        )
      )
        return "Notification Center";

      if (
        pathname.includes(
          "integrations"
        )
      )
        return "Integrations Hub";

      if (
        pathname.includes(
          "organization"
        )
      )
        return "Organization Management";

      if (
        pathname.includes(
          "project"
        )
      )
        return "Projects";

      return "AI Forecasting Platform";
    };

    useEffect(() => {

      const fetchNotifications =
        async () => {

          try {

            const response =
              await API.get(
                "/notifications?page=1&limit=10"
              );

            setNotifications(
              response.data || []
            );

          } catch (error) {

            console.log(error);

          }

        };

      fetchNotifications();

    }, []);

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (

          dropdownRef.current &&

          !dropdownRef.current.contains(
            event.target
          )

        ) {

          setShowNotifications(
            false
          );

        }

      };

    document.addEventListener(

      "mousedown",

      handleClickOutside

    );

    return () => {

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

    };

  }, []);

  return (

    <div className="sticky top-0 z-40">

      <div className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-xl rounded-3xl px-8 py-5">

        <div className="flex items-center justify-between">

          {/* LEFT */}

          <div>

            <h1 className="text-3xl font-bold text-white">

              {getPageTitle()}

            </h1>

            <p className="text-slate-300 text-sm mt-1">

              Enterprise Forecasting &
              Strategic Intelligence Platform

            </p>

          </div>

          {/* CENTER */}

          <div className="hidden lg:flex items-center w-[450px]">

            <div className="relative w-full">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search forecasts, reports, organizations..."
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  text-white
                  placeholder:text-slate-400
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-4">

            <div
              className="relative"
              ref={dropdownRef}
            >

              <button

                onClick={() =>

                  setShowNotifications(
                    !showNotifications
                  )

                }

                className="
                  relative
                  p-3
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  hover:bg-white/20
                  transition-all
                "
              >

                <Bell
                  size={22}
                  className="text-white"
                />

                {

                  unreadCount > 0 && (

                    <span
                      className="
                        absolute
                        -top-2
                        -right-2
                        bg-red-500
                        text-white
                        text-xs
                        min-w-[22px]
                        h-[22px]
                        rounded-full
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >

                      {unreadCount}

                    </span>

                  )

                }

              </button>

                            {

                showNotifications && (

                  <div
                    className="
                      absolute
                      right-0
                      mt-4
                      w-[420px]
                      bg-slate-900/95
                      backdrop-blur-xl
                      border
                      border-slate-700
                      rounded-3xl
                      shadow-2xl
                      overflow-hidden
                      z-50
                    "
                  >

                    {/* HEADER */}

                    <div className="p-5 border-b border-slate-700">

                      <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold text-white">

                          Notifications

                        </h2>

                        <span className="text-xs text-slate-400">

                          Live Updates

                        </span>

                      </div>

                    </div>

                    {/* BODY */}

                    <div className="max-h-[450px] overflow-y-auto">

                      {

                        notifications.length > 0

                          ?

                          notifications.map(

                            (item) => (

                              <div

                                key={item.id}

                                className="
                                  p-4
                                  border-b
                                  border-slate-800
                                  hover:bg-white/5
                                  transition-all
                                  cursor-pointer
                                "

                              >

                                <div className="flex items-start justify-between">

                                  <div>

                                    <h3 className="text-white font-semibold">

                                      {item.title}

                                    </h3>

                                    <p className="text-slate-400 text-sm mt-1">

                                      {item.message}

                                    </p>

                                  </div>

                                  {

                                    !item.is_read && (

                                      <div
                                        className="
                                          w-3
                                          h-3
                                          rounded-full
                                          bg-cyan-500
                                          mt-2
                                        "
                                      />

                                    )

                                  }

                                </div>

                                <p className="text-xs text-slate-500 mt-3">

                                  {

                                    item.created_at

                                      ?

                                      new Date(
                                        item.created_at
                                      ).toLocaleString()

                                      :

                                      ""
                                  }

                                </p>

                              </div>

                            )

                          )

                          :

                          (

                            <div className="p-8 text-center">

                              <p className="text-slate-400">

                                No notifications available

                              </p>

                            </div>

                          )

                      }

                    </div>

                    {/* FOOTER */}

                    <div className="p-4 border-t border-slate-700">

                      <button

                        onClick={() => {

                          setShowNotifications(
                            false
                          );

                          navigate(
                            "/notifications"
                          );

                        }}

                        className="
                          w-full
                          py-3
                          rounded-2xl
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-600
                          text-white
                          font-semibold
                          flex
                          items-center
                          justify-center
                          gap-2
                        "

                      >

                        <Eye size={18} />

                        View All Notifications

                      </button>

                    </div>

                  </div>

                )

              }

            </div>

            {/* PROFILE */}

            <div
              className="
                flex
                items-center
                gap-3
                bg-white/10
                border
                border-white/10
                rounded-2xl
                px-4
                py-2
              "
            >

              <UserCircle
                size={34}
                className="text-cyan-400"
              />

              <div>

                <p className="text-white font-semibold">

                  {

                    localStorage.getItem(
                      "username"
                    ) || "User"

                  }

                </p>

                <p className="text-xs text-slate-400">

                  {

                    localStorage.getItem(
                      "role"
                    ) || "Member"

                  }

                </p>

              </div>

            </div>

            {/* LOGOUT */}

            <button

              onClick={onLogout}

              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-red-500
                to-pink-500
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
              "

            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Navbar;