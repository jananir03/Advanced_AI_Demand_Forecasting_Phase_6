import {

  useEffect,

  useState

} from "react";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

import {

  Bell,

  Users,

  Database,

  BrainCircuit

} from "lucide-react";

const Admin = () => {

  const [summary, setSummary] =
    useState(null);



  useEffect(() => {

    fetchSummary();

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

      <div className="min-h-screen relative overflow-hidden p-8">


        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300"></div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>



        {/* Main Content */}

        <div className="relative z-10 space-y-8">


          {/* Top Navbar */}

          <div className="flex justify-between items-center bg-white/40 backdrop-blur-xl rounded-[30px] p-6 shadow-lg border border-white/20">

            <div>

              <h1 className="text-4xl font-bold text-blue-950">

                Admin Dashboard

              </h1>

              <p className="text-slate-700 mt-2 text-lg">

                AI Forecasting Platform Management Panel

              </p>

            </div>


            <div className="flex items-center gap-6">


              {/* Notifications */}

              <div className="relative bg-white p-4 rounded-2xl shadow-md">

                <Bell className="text-blue-600" />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">

                  {summary.total_notifications || 0}

                </span>

              </div>


              {/* Admin */}

              <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-md">

                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">

                  A

                </div>

                <div>

                  <h2 className="font-bold text-blue-950">

                    Admin User

                  </h2>

                  <p className="text-sm text-slate-500">

                    Logged in as Administrator

                  </p>

                </div>

              </div>

            </div>

          </div>



          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">


            {/* Users */}

            <div className="bg-white/50 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

              <Users size={40} className="text-blue-600 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Total Users

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_users}

              </h1>

            </div>



            {/* Datasets */}

            <div className="bg-white/50 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

              <Database size={40} className="text-pink-500 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Total Datasets

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_datasets}

              </h1>

            </div>



            {/* Forecasts */}

            <div className="bg-white/50 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

              <BrainCircuit size={40} className="text-green-600 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Forecasts

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_forecasts}

              </h1>

            </div>



            {/* Notifications */}

            <div className="bg-white/50 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

              <Bell size={40} className="text-orange-500 mb-5" />

              <h2 className="text-slate-600 text-lg mb-2">

                Notifications

              </h2>

              <h1 className="text-5xl font-bold text-blue-950">

                {summary.total_notifications || 0}

              </h1>

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

    </MainLayout>
  );
};

export default Admin;