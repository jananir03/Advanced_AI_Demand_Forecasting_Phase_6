import {

  Bell

} from "lucide-react";

import {

  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";


const Navbar = () => {

  const navigate =
    useNavigate();


  const [showNotifications,

    setShowNotifications] =

    useState(false);


  const notifications =

    JSON.parse(

      localStorage.getItem(
        "forecast_history"
      )

    ) || [];


  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };


  return (

    <div className="relative z-[9999] bg-white/70 backdrop-blur-md border-b border-white/30 shadow-sm px-8 py-5 flex justify-between items-center">


      {/* Title */}

      <div>

        <h2 className="text-3xl font-bold text-gray-800">

          Dashboard

        </h2>

        <p className="text-gray-500 mt-1">

          Welcome back to your AI analytics platform

        </p>

      </div>


      {/* Actions */}

      <div className="flex items-center gap-5">


        {/* Notification */}

        <div className="relative z-[9999]">


          {/* Bell Button */}

          <button

            onClick={() =>

              setShowNotifications(

                !showNotifications
              )
            }

            className="relative bg-white p-3 rounded-full shadow hover:scale-105 transition"
          >

            <Bell className="text-blue-700" />


            {/* Badge */}

            {

              notifications.length > 0 && (

                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">

                  {notifications.length}

                </span>
              )
            }

          </button>


          {/* Dropdown */}

          {

            showNotifications && (

              <div className="absolute right-0 top-16 w-[350px] bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 z-[99999]">


                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl font-bold text-slate-800">

                    Notifications

                  </h2>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm">

                    Live

                  </span>

                </div>


                <div className="space-y-4 max-h-[350px] overflow-y-auto">


                  {

                    notifications.length > 0 ? (

                      notifications.map(

                        (item, index) => (

                          <div

                            key={index}

                            className="bg-slate-100 rounded-2xl p-4"
                          >

                            <h3 className="font-bold text-slate-800">

                              Forecast Generated

                            </h3>

                            <p className="text-slate-600 text-sm mt-1 break-words">

                              {item.dataset}

                            </p>

                            <p className="text-slate-500 text-xs mt-2">

                              {item.generated_at}

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


        {/* Logout */}

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