import {
  useEffect,
  useState
} from "react";

import {
  Bell,
  Mail,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";


const Notifications = () => {

  const [

    notifications,

    setNotifications

  ] = useState([]);

  const [filter, setFilter] =
  useState("all");
  
  const filteredNotifications =

    filter === "All"

      ? notifications

      : notifications.filter((item) => {

          const title =
            item.title?.toLowerCase() || "";

          if (filter === "Forecast") {

            return title.includes("forecast");

          }

          if (filter === "Integration") {

            return title.includes("integration");

          }

          if (filter === "Email") {

            return title.includes("email");

          }

          if (filter === "Security") {

            return (
              title.includes("login") ||
              title.includes("security")
            );

          }

          return true;
        });


  const [
    stats,
    setStats
  ] = useState({

    total: 0,

    unread: 0,

    read: 0,

    emails: 0
  });

  const [

    unreadCount,

    setUnreadCount

  ] = useState(0);

  
  
  const [

    settings,

    setSettings

  ] = useState({

    email_enabled: true,

    inventory_alert_enabled: true,

    forecast_alert_enabled: true
  });

  // -----------------------------------
  // FETCH NOTIFICATIONS
  // -----------------------------------

  const fetchNotifications = async () => {

  try {

    const response = await API.get(
      "/notifications"
    );

    const data =
      response.data || [];

    setNotifications(data);

    setStats({

      total:
        data.length,

      unread:
        data.filter(
          item =>
            !item.is_read
        ).length,

      read:
        data.filter(
          item =>
            item.is_read
        ).length,

      emails:
        data.filter(
          item =>
            item.title
              ?.toLowerCase()
              .includes(
                "email"
              )
        ).length
    });

  } catch (error) {

    console.log(error);
  }
};

  const markAsRead = async (id) => {

  try {

    await API.put(

      `/notifications/read/${id}`
    );

    fetchNotifications();

  } catch (error) {

    console.log(error);
  }
};
  const fetchUnreadCount =
  async () => {

    try {

      const response =
        await API.get(
          "/notifications/unread-count"
        );

      setUnreadCount(
        response.data.count
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchSettings =
  async () => {

    try {

      const response =
        await API.get(
          "/notification-enhancements/alert-settings"
        );

      setSettings(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

  fetchNotifications();

  fetchUnreadCount();

  fetchSettings();

}, []);

  return (

    <MainLayout>

      <div className="min-h-screen relative overflow-hidden p-8">


        {/* CONTENT */}

        <div className="relative z-10">


          {/* HEADER */}

          <div className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 rounded-[35px] p-10 shadow-[0_20px_60px_rgba(236,72,153,0.25)]">

            <h1 className="text-5xl font-bold text-slate-800">

              <div className="flex items-center gap-4">

                <h1 className="text-5xl font-bold text-white">

                  Notifications

                </h1>

                <span className="bg-white text-rose-500 px-4 py-2 rounded-full font-bold shadow-lg">

                  {stats.total}

                </span>

              </div>

            </h1>

            <p className="text-pink-50 mt-4 text-lg">

              Live system activities and updates.

            </p>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-gradient-to-br from-white to-rose-50 border border-rose-100 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-center justify-between">

                <h3 className="text-slate-700 font-semibold">

                  Total Notifications

                </h3>

                <Bell size={28} />
              </div>

              <h1 className="text-5xl font-bold text-slate-800 mt-5">

                {notifications.length}

              </h1>

            </div>

            <div className="bg-gradient-to-br from-white to-rose-50 border border-rose-100 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-center justify-between">

                <h3 className="text-slate-700 font-semibold">

                  Unread

                </h3>

                <AlertTriangle
                  size={28}
                />
              </div>

              <h1 className="text-5xl font-bold text-red-600 mt-5">

                {stats.unread}

              </h1>

            </div>

            <div className="bg-gradient-to-br from-white to-rose-50 border border-rose-100 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-center justify-between">

                <h3 className="text-slate-700 font-semibold">

                  Read

                </h3>

                <CheckCircle
                  size={28}
                />
              </div>

              <h1 className="text-5xl font-bold text-green-600 mt-5">

                {stats.read}

              </h1>

            </div>

            <div className="bg-gradient-to-br from-white to-rose-50 border border-rose-100 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-center justify-between">

                <h3 className="text-slate-700 font-semibold">

                  Emails Sent

                </h3>

                <Mail size={28} />
              </div>

              <h1 className="text-5xl font-bold text-blue-600 mt-5">

                {stats.emails}

              </h1>

            </div>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            {

              [

                "All",

                "Email",

                "Forecast",

                "Integration",

                "Security"

              ].map(

                (type) => (

                  <button

                    key={type}

                    onClick={() =>
                      setFilter(type)
                    }

                    className={`

                      px-5 py-3 rounded-2xl font-semibold transition-all

                      ${

                        filter === type
                          ? "bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white shadow-lg"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-rose-50"

                      }

                    `}
                  >

                    {type}

                  </button>
                )
              )
            }

          </div>
          
          <div className="mt-8 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 rounded-3xl p-8 text-white shadow-2xl">

            <h2 className="text-3xl font-bold">

              Notification Control Center

            </h2>

            <p className="mt-3 text-lg">

              Monitor forecast alerts, integration updates,
              email delivery status and system notifications.

            </p>

          </div>

          {/* NOTIFICATIONS */}

          <div className="mt-10 space-y-6">

            {

              notifications.length > 0 ? (

                filteredNotifications.map(

                  (item, index) => (

                    <div

                      key={index}

                      className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <h2 className="text-2xl font-bold text-slate-800">

                          {item.title}

                        </h2>

                        <span

                          className={`bg-white rounded-3xl p-8 shadow-lg border-l-4 ${
                            item.is_read
                              ? "border-green-500"
                              : "border-rose-500"
                          }`}
                        >

                          {

                            item.is_read

                              ? "Read"

                              : "Unread"
                          }

                        </span>

                      </div>

                      <p className="text-slate-700 text-lg">

                        {item.message}

                      </p>

                      <div className="flex items-center gap-4 mt-4">

                        {

                          !item.is_read && (

                            <button

                              onClick={() =>

                                markAsRead(
                                  item.id
                                )
                              }

                              className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"
                            >

                              Mark As Read

                            </button>
                          )
                        }

                      </div>

                      <p className="text-slate-600 text-sm mt-4">

                        {new Date(
                          item.created_at
                        ).toLocaleString()}

                      </p>

                    </div>
                  )
                )

              ) : (

                <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-800 hover:shadow-xl transition-all duration-300">

                  <p className="text-slate-700 text-lg">

                    No notifications available.

                  </p>

                </div>
              )
            }

          </div>

          {/* EMAIL DELIVERY CENTER */}

          <div className="mt-12">

            <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-xl border border-pink-500">

              <h2 className="text-4xl font-bold text-slate-800 mb-8">

                 Email Delivery Center

              </h2>

              <div className="space-y-6">

                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-purple-500
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-30">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-xl font-bold text-slate-800">

                        Forecast Report Generated

                      </h3>

                      <p className="text-slate-700 mt-2">

                        Email sent to:

                        <span className="font-semibold ml-2">

                          admin@gmail.com

                        </span>

                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">

                      Delivered

                    </span>

                  </div>

                </div>

                  <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-purple-500
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-xl font-bold text-slate-800">

                        Integration Created

                      </h3>

                      <p className="text-slate-700 mt-2">

                        Email sent to:

                        <span className="font-semibold ml-2">

                          analytics@company.com

                        </span>

                      </p>

                    </div>

                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-semibold">

                      Pending

                    </span>

                  </div>

                </div>

                <div className="
                  bg-white
                  rounded-3xl
                  p-6
                  border
                  border-purple-500
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                  duration-300">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-xl font-bold text-slate-800">

                        Revenue Alert

                      </h3>

                      <p className="text-slate-700 mt-2">

                        Email sent to:

                        <span className="font-semibold ml-2">

                          finance@company.com

                        </span>

                      </p>

                    </div>

                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-semibold">

                      Failed

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ALERT SETTINGS */}

          <div className="mt-12">

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl border border-purple-800 rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-3xl font-bold text-slate-800 mb-8">

                Notification Settings

              </h2>

              <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-500">

                  <h3 className="font-bold text-lg">

                    Email Alerts

                  </h3>

                  <p className="mt-3 text-slate-700">

                    {

                      settings.email_enabled

                        ? "Enabled"

                        : "Disabled"
                    }

                  </p>

                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-500">

                  <h3 className="font-bold text-lg">

                    Forecast Alerts

                  </h3>

                  <p className="mt-3 text-slate-700">

                    {

                      settings.forecast_alert_enabled

                        ? "Enabled"

                        : "Disabled"
                    }

                  </p>

                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-500">

                  <h3 className="font-bold text-lg">

                    Inventory Alerts

                  </h3>

                  <p className="mt-3 text-slate-700">

                    {

                      settings.inventory_alert_enabled

                        ? "Enabled"

                        : "Disabled"
                    }

                  </p>

                </div>

              </div>

            </div>

          </div>
          {/* ----------------------------------- */}
          {/* NOTIFICATION ENHANCEMENTS */}
          {/* ----------------------------------- */}

          <div className="mt-12">

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-3xl font-bold text-slate-800 mb-8">

                Notification Enhancements

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">

                <div className="
                    bg-gradient-to-br
                    from-rose-50
                    to-pink-100
                    rounded-3xl
                    p-6
                    border
                    border-rose-100
                    shadow-md
                    hover:shadow-lg
                    hover:translate-y-1
                    transition-all
                    duration-300
                    ">

                  <h3 className="text-xl font-bold text-slate-800">

                    Email Notifications

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Automated email delivery with delivery tracking and status monitoring.

                  </p>

                </div>

                <div className="
                  bg-gradient-to-br
                  from-purple-50
                  to-fuchsia-100
                  rounded-3xl
                  p-6
                  border
                  border-rose-100
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  ">

                  <h3 className="text-xl font-bold text-slate-800">

                    Alert Settings

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Configure notification preferences and alert thresholds.

                  </p>

                </div>

                <div className="
                  bg-gradient-to-br
                  from-amber-50
                  to-orange-100
                  rounded-3xl
                  p-6
                  border
                  border-rose-100
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  ">

                  <h3 className="text-xl font-bold text-slate-800">

                    Threshold Alerts

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Receive alerts when forecast or revenue thresholds are exceeded.

                  </p>

                </div>

                <div className="
                  bg-gradient-to-br
                  from-blue-50
                  to-cyan-100
                  rounded-3xl
                  p-6
                  border
                  border-rose-100
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  ">

                  <h3 className="text-xl font-bold text-slate-800">

                    Forecast Failure Alerts

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Automatic notifications for forecast generation failures.

                  </p>

                </div>

                <div className="
                bg-gradient-to-br
                from-green-50
                to-emerald-100
                rounded-3xl
                p-6
                border
                border-rose-100
                shadow-md
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                ">

                  <h3 className="text-xl font-bold text-slate-800">

                    Report Completion Alerts

                  </h3>

                  <p className="text-slate-700 mt-2">

                    Alerts generated when reports are successfully completed.

                  </p>

                </div>

                <div className="
                  bg-gradient-to-br
                  from-indigo-50
                  to-violet-100
                  rounded-3xl
                  p-6
                  border
                  border-rose-100
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  ">

                  <h3 className="text-xl font-bold text-slate-800">

                    Live notification feed with unread tracking and alert management.

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