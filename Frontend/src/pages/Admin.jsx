import {

  useEffect,

  useState

} from "react";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

import {

  Users,

  Database,

  BrainCircuit,

  Activity,

  ShieldCheck,

  Server,

  TrendingUp,

  Clock,

  Bell

} from "lucide-react";

const Admin = () => {

  const [summary, setSummary] =
    useState(null);

  const [activityLogs,
    setActivityLogs] =
    useState([]);

  useEffect(() => {

    fetchSummary();

    fetchActivityLogs();

  }, []);

  const fetchSummary = async () => {

    try {

      const response =
        await API.get(
          "/admin/summary"
        );

      setSummary(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchActivityLogs =
  async () => {

    try {

      const response =
        await API.get(
          "/activity-logs/"
        );

      setActivityLogs(
        response.data.slice(0, 8)
      );

    } catch (error) {

      console.log(error);
    }
  };



  if (!summary) {

    return (

      <MainLayout>

        <div className="p-10 text-2xl">

          Loading...

        </div>

      </MainLayout>
    );
  }



  return (

    <MainLayout>

      <div className="relative overflow-hidden px-4 p-8">

        {/* Main Content */}

        <div className="relative z-10 space-y-8">

          <div className="w-full space-y-6">

          <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/20">

              <h1 className="text-5xl font-bold text-blue-950">

                Admin Command Center

              </h1>

              <p className="text-slate-700 text-xl mt-4">

                Centralized monitoring, forecasting intelligence,
                user governance and platform analytics.

              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white rounded-3xl p-5">

                  <div className="flex items-center gap-3">

                    <Activity className="text-blue-600" />

                    <span className="font-semibold">

                      System Health

                    </span>

                  </div>

                  <h2 className="text-green-600 font-bold mt-3">

                    Operational
                  </h2>

                </div>

                <div className="bg-white rounded-3xl p-5">

                  <div className="flex items-center gap-3">

                    <Server className="text-indigo-600" />

                    <span className="font-semibold">

                      Platform Status

                    </span>

                  </div>

                  <h2 className="text-green-600 font-bold mt-3">

                    Running
                  </h2>

                </div>

                <div className="bg-white rounded-3xl p-5">

                  <div className="flex items-center gap-3">

                    <ShieldCheck className="text-cyan-600" />

                    <span className="font-semibold">

                      Security Status

                    </span>

                  </div>

                  <h2 className="text-green-600 font-bold mt-3">

                    Protected
                  </h2>

                </div>

              </div>

            </div>


          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


            {/* Users */}

            <div className="bg-white rounded-[30px] p-8 shadow-xl hover:scale-[1.02] transition-all">

              <Users size={40} className="text-blue-600 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Total Users

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_users}

              </h1>

            </div>



            {/* Datasets */}

            <div className="bg-white rounded-[30px] p-8 shadow-xl hover:scale-[1.02] transition-all">

              <Database size={40} className="text-pink-500 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Total Datasets

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_datasets}

              </h1>

            </div>



            {/* Forecasts */}

            <div className="bg-white rounded-[30px] p-8 shadow-xl hover:scale-[1.02] transition-all">

              <BrainCircuit size={40} className="text-green-600 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Forecasts

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_forecasts}

              </h1>

            </div>



            {/* Notifications */}

            <div className="bg-white rounded-[30px] p-8 shadow-xl hover:scale-[1.02] transition-all">

              <Bell size={40} className="text-orange-500 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Notifications

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_notifications || 0}

              </h1>

            </div>

          </div>

          {/* Audit Logs */}

          <div className="bg-white backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold text-blue-950">

                Audit Logs

              </h2>

              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl font-semibold">

                {activityLogs.length} Activities

              </div>

            </div>

            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-4">

                      Activity

                    </th>

                    <th className="text-left py-4">

                      Description

                    </th>

                    <th className="text-left py-4">

                      User ID

                    </th>

                    <th className="text-left py-4">

                      Date & Time

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    activityLogs.map((log) => (

                      <tr

                        key={log.id}

                        className="border-b border-slate-100 hover:bg-white/20"
                      >

                        <td className="py-4">

                          <span className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-xl text-sm font-semibold">

                            {log.activity_type}

                          </span>

                        </td>

                        <td className="py-4 font-medium">

                          {log.description}

                        </td>

                        <td className="py-4">

                          {log.user_id}

                        </td>

                        <td className="py-4">

                          {

                            new Date(
                              log.created_at
                            ).toLocaleString()
                          }

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          </div>

          {/* Quick Insights */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Business Insights */}

            <div className="bg-white rounded-[30px] p-8 shadow-xl hover:scale-[1.02] transition-all">

              <div className="flex items-center gap-3 mb-6">

                <TrendingUp
                  size={30}
                  className="text-green-600"
                />

                <h2 className="text-2xl font-bold text-blue-950">

                  Business Insights

                </h2>

              </div>

              <div className="space-y-4">

                <div className="bg-white rounded-2xl p-5">

                  <h3 className="font-semibold text-slate-600">

                    Forecast Volume

                  </h3>

                  <p className="text-3xl font-bold text-blue-950 mt-2">

                    {summary.total_forecasts}
                  </p>

                </div>

                <div className="bg-white rounded-2xl p-5">

                  <h3 className="font-semibold text-slate-600">

                    Dataset Coverage

                  </h3>

                  <p className="text-3xl font-bold text-blue-950 mt-2">

                    {summary.total_datasets}
                  </p>

                </div>

                <div className="bg-white rounded-2xl p-5">

                  <h3 className="font-semibold text-slate-600">

                    Active Users

                  </h3>

                  <p className="text-3xl font-bold text-blue-950 mt-2">

                    {summary.total_users}
                  </p>

                </div>

              </div>

            </div>

            {/* Platform Metrics */}

            <div className="bg-white rounded-[30px] p-8 shadow-xl hover:scale-[1.02] transition-all">

              <div className="flex items-center gap-3 mb-6">

                <Clock
                  size={30}
                  className="text-indigo-600"
                />

                <h2 className="text-2xl font-bold text-blue-950">

                  Platform Metrics

                </h2>

              </div>

              <div className="space-y-4">

                <div className="bg-white rounded-2xl p-5 flex justify-between">

                  <span className="font-medium">

                    System Status

                  </span>

                  <span className="text-green-600 font-bold">

                    Operational

                  </span>

                </div>

                <div className="bg-white rounded-2xl p-5 flex justify-between">

                  <span className="font-medium">

                    Forecast Engine

                  </span>

                  <span className="text-green-600 font-bold">

                    Active

                  </span>

                </div>

                <div className="bg-white rounded-2xl p-5 flex justify-between">

                  <span className="font-medium">

                    Security Layer

                  </span>

                  <span className="text-green-600 font-bold">

                    Protected

                  </span>

                </div>

                <div className="bg-white rounded-2xl p-5 flex justify-between">

                  <span className="font-medium">

                    Notifications

                  </span>

                  <span className="font-bold text-blue-950">

                    {summary.total_notifications}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Recent Activity Timeline */}

          <div className="bg-white/50 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Activity
                size={30}
                className="text-blue-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Recent Activity Timeline

              </h2>

            </div>

            <div className="space-y-5">

              {

                activityLogs.slice(0, 5).map(

                  (log) => (

                    <div

                      key={log.id}

                      className="flex items-start gap-4 bg-white rounded-3xl p-5 shadow-md"
                    >

                      <div className="w-4 h-4 rounded-full bg-blue-600 mt-2"></div>

                      <div>

                        <h3 className="font-bold text-blue-950">

                          {log.activity_type}

                        </h3>

                        <p className="text-slate-600 mt-1">

                          {log.description}

                        </p>

                        <p className="text-sm text-slate-400 mt-2">

                          {

                            new Date(
                              log.created_at
                            ).toLocaleString()
                          }

                        </p>

                      </div>

                    </div>
                  )
                )
              }

            </div>

          </div>


          {/* Executive Overview */}

          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-[35px] p-10 shadow-xl text-white">

            <h2 className="text-5xl font-bold">

              Executive Overview

            </h2>

            <p className="mt-4 text-lg text-white/90">

              The platform currently manages

              {" "}

              <span className="font-bold">

                {summary.total_users}

              </span>

              {" "}users,

              {" "}

              <span className="font-bold">

                {summary.total_datasets}

              </span>

              {" "}datasets and

              {" "}

              <span className="font-bold">

                {summary.total_forecasts}

              </span>

              {" "}forecast records.

            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <div className="bg-white/10 rounded-3xl p-5">

                <h3 className="text-white/80">

                  Forecast Capacity

                </h3>

                <h1 className="text-5xl font-bold mt-2">

                  {summary.total_forecasts}

                </h1>

              </div>

              <div className="bg-white/10 rounded-3xl p-5">

                <h3 className="text-white/80">

                  User Adoption

                </h3>

                <h1 className="text-5xl font-bold mt-2">

                  {summary.total_users}

                </h1>

              </div>

              <div className="bg-white/10 rounded-3xl p-5">

                <h3 className="text-white/80">

                  Notifications

                </h3>

                <h1 className="text-4xl font-bold mt-2">

                  {summary.total_notifications}

                </h1>

              </div>

            </div>

          </div>

          {/* Recent Uploaded Datasets */}

          <div className="bg-white/50 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <h2 className="text-3xl font-bold text-blue-950 mb-8">

              Recent Uploaded Datasets

            </h2>


            <div className="space-y-5">


              {

                summary.recent_datasets?.length > 0 ? (

                  summary.recent_datasets.map(

                    (dataset, index) => (

                      <div

                        key={index}

                        className="bg-white rounded-3xl p-6 flex justify-between items-center shadow-md"
                      >

                        <div>

                          <h3 className="text-xl font-bold text-blue-950">

                            {

                              dataset.file_name ||

                              dataset.dataset_name ||

                              "Dataset"
                            }

                          </h3>

                          <p className="text-slate-500 mt-1">

                            Uploaded Dataset

                          </p>

                        </div>


                        <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold">

                          {

                            dataset.row_count ||

                            dataset.records ||

                            0

                          } Records

                        </div>

                      </div>
                    )
                  )

                ) : (

                  <div className="bg-white rounded-3xl p-6 text-slate-500">

                    No uploaded datasets found.

                  </div>
                )
              }

            </div>

          </div>

        </div>
      </div>
      </div>

    </MainLayout>
  );
};

export default Admin;