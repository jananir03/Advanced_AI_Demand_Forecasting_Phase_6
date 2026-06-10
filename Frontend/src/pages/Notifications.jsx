import {

  useEffect,
  useState

} from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";


const Notifications = () => {

  const [

    notifications,

    setNotifications

  ] = useState([]);


  // -----------------------------------
  // FETCH NOTIFICATIONS
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


  return (

    <MainLayout>

      <div className="min-h-screen relative overflow-hidden p-8">


        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300"></div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>


        {/* CONTENT */}

        <div className="relative z-10">


          {/* HEADER */}

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

            <h1 className="text-5xl font-bold text-slate-800">

              Notifications

            </h1>

            <p className="text-slate-700 mt-4 text-lg">

              Live system activities and updates.

            </p>

          </div>


          {/* NOTIFICATIONS */}

          <div className="mt-10 space-y-6">

            {

              notifications.length > 0 ? (

                notifications.map(

                  (item, index) => (

                    <div

                      key={index}

                      className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <h2 className="text-2xl font-bold text-slate-800">

                          {item.type}

                        </h2>

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">

                          Live

                        </span>

                      </div>

                      <p className="text-slate-700 text-lg">

                        {item.description}

                      </p>

                      <p className="text-slate-600 text-sm mt-4">

                        {item.time}

                      </p>

                    </div>
                  )
                )

              ) : (

                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

                  <p className="text-slate-700 text-lg">

                    No notifications available.

                  </p>

                </div>
              )
            }

          </div>

          {/* ----------------------------------- */}
          {/* NOTIFICATION ENHANCEMENTS */}
          {/* ----------------------------------- */}

          <div className="mt-12">

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-3xl font-bold text-slate-800 mb-8">

                Notification Enhancements

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white/30 rounded-2xl p-6">

                  <h3 className="text-xl font-bold text-slate-800">

                    Email Notifications

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Automated email delivery for important system events.

                  </p>

                </div>

                <div className="bg-white/30 rounded-2xl p-6">

                  <h3 className="text-xl font-bold text-slate-800">

                    Alert Settings

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Configure notification preferences and alert thresholds.

                  </p>

                </div>

                <div className="bg-white/30 rounded-2xl p-6">

                  <h3 className="text-xl font-bold text-slate-800">

                    Threshold Alerts

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Receive alerts when forecast or revenue thresholds are exceeded.

                  </p>

                </div>

                <div className="bg-white/30 rounded-2xl p-6">

                  <h3 className="text-xl font-bold text-slate-800">

                    Forecast Failure Alerts

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Automatic notifications for forecast generation failures.

                  </p>

                </div>

                <div className="bg-white/30 rounded-2xl p-6">

                  <h3 className="text-xl font-bold text-slate-800">

                    Report Completion Alerts

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Alerts generated when reports are successfully completed.

                  </p>

                </div>

                <div className="bg-white/30 rounded-2xl p-6">

                  <h3 className="text-xl font-bold text-slate-800">

                    Real-Time Monitoring

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Continuous monitoring of activities, forecasts and system events.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

        
  );
};

export default Notifications;