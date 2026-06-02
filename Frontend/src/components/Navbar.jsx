import {

  Bell

} from "lucide-react";

import {

  useState,
  useEffect

} from "react";

import {

  useNavigate

} from "react-router-dom";

import API from "../services/api";


const Navbar = () => {

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


  // -----------------------------------
  // FETCH ACTIVITIES
  // -----------------------------------

  const fetchNotifications = async () => {

    try {

      const response = await API.get(
        "/activities/recent"
      );

      setNotifications(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchNotifications();

    // AUTO REFRESH

    const interval = setInterval(() => {

      fetchNotifications();

    }, 3000);

    return () => clearInterval(interval);

  }, []);


  // -----------------------------------
  // LOGOUT
  // -----------------------------------

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "username"
    );

    navigate("/login");
  };


  return (

    <div className="relative z-[9999] bg-white/70 dark:bg-slate-900 backdrop-blur-md border-b border-white/30 dark:border-slate-700 shadow-sm px-8 py-5 flex justify-between items-center">


      {/* LEFT */}

      <div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">

          Dashboard

        </h2>

        <p className="text-gray-500 dark:text-gray-300 mt-1">

          Welcome back to your AI analytics platform

        </p>

      </div>


      {/* RIGHT */}

      <div className="flex items-center gap-5">


        {/* NOTIFICATION */}

        <div className="relative z-[9999]">


          {/* BELL */}

          <button

            onClick={() =>

              setShowNotifications(

                !showNotifications
              )
            }

            className="relative bg-white dark:bg-slate-800 p-3 rounded-full shadow hover:scale-105 transition"
          >

            <Bell className="text-blue-700" />


            {/* BADGE */}

            {

              notifications.length > 0 && (

                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">

                  {notifications.length}

                </span>
              )
            }

          </button>


          {/* DROPDOWN */}

          {

            showNotifications && (

              <div className="absolute right-0 top-16 w-[380px] bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 z-[99999]">


                {/* HEADER */}

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl font-bold text-slate-800">

                    Notifications

                  </h2>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm">

                    Live

                  </span>

                </div>


                {/* LIST */}

                <div className="space-y-4 max-h-[400px] overflow-y-auto">


                  {

                    notifications.length > 0 ? (

                      notifications.map(

                        (item, index) => (

                          <div

                            key={index}

                            className="bg-slate-100 rounded-2xl p-4 border border-slate-200"
                          >

                            <h3 className="font-bold text-slate-800 text-lg">

                              {item.type}

                            </h3>

                            <p className="text-slate-600 text-sm mt-2 break-words">

                              {item.description}

                            </p>

                            <p className="text-slate-500 text-xs mt-3">

                              {item.time}

                            </p>

                          </div>
                        )
                      )

                    ) : (

                      <p className="text-slate-500">

                        No notifications available.

                      </p>
                    )
                  }

                </div>

              </div>
            )
          }

        </div>


        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >

          Logout

        </button>

      </div>

    </div>
  );
};

export default Navbar;