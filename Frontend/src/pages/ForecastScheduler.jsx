import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import {
  Calendar,
  PlayCircle,
  PauseCircle,
  Clock3,
  Database,
  Activity,
  Trash2,
  RefreshCw
} from "lucide-react";

const ForecastScheduler = () => {

  const [loading, setLoading] =
    useState(false);

  const [schedules, setSchedules] =
    useState([]);

  const [schedulerStatus,
    setSchedulerStatus] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      dataset_id: "",

      model_name: "prophet",

      interval_type: "daily"
    });

  const fetchSchedules =
    async () => {

      try {

        const response =
          await API.get(
            "/scheduler/list"
          );

        setSchedules(
          response.data || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchStatus =
    async () => {

      try {

        const response =
          await API.get(
            "/scheduler-control/status"
          );

        setSchedulerStatus(
          response.data.running
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchSchedules();

    fetchStatus();

  }, []);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };

  const createSchedule =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await API.post(
          "/scheduler/create",
          {

            dataset_id:
              Number(
                formData.dataset_id
              ),

            model_name:
              formData.model_name,

            interval_type:
              formData.interval_type
          }
        );

        setFormData({

          dataset_id: "",

          model_name:
            "prophet",

          interval_type:
            "daily"
        });

        await fetchSchedules();

        alert(
          "Schedule Created Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create schedule"
        );

      } finally {

        setLoading(false);
      }
    };

  const startScheduler =
    async () => {

      try {

        await API.post(
          "/scheduler-control/start"
        );

        fetchStatus();

      } catch (error) {

        console.log(error);
      }
    };

  const stopScheduler =
    async () => {

      try {

        await API.post(
          "/scheduler-control/stop"
        );

        fetchStatus();

      } catch (error) {

        console.log(error);
      }
    };

  const toggleSchedule =
    async (id) => {

      try {

        await API.put(
          `/scheduler/toggle/${id}`
        );

        fetchSchedules();

      } catch (error) {

        console.log(error);
      }
    };

  const deleteSchedule =
    async (id) => {

      try {

        await API.delete(
          `/scheduler/${id}`
        );

        fetchSchedules();

      } catch (error) {

        console.log(error);
      }
    };

  const totalSchedules =
    schedules.length;

  const activeSchedules =
    schedules.filter(
      item =>
        item.is_active
    ).length;

  const inactiveSchedules =
    schedules.filter(
      item =>
        !item.is_active
    ).length;

  return (

    <MainLayout>

      <div className="min-h-screen relative overflow-hidden p-8">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300"></div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-8">

                  {/* HEADER */}

          <div className="bg-white/30 backdrop-blur-xl rounded-[35px] p-8 shadow-xl border border-white/20">

            <div className="flex justify-between items-center">

              <div>

                <h1 className="text-4xl font-bold text-blue-950">

                  Forecast Scheduler

                </h1>

                <p className="text-slate-700 mt-2">

                  Automate forecasting workflows and schedule model execution.

                </p>

              </div>

              <button

                onClick={() => {

                  fetchSchedules();
                  fetchStatus();
                }}

                className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition"
              >

                <RefreshCw size={18} />

                Refresh

              </button>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <Calendar className="text-blue-600 mb-3" size={35} />

              <h3 className="text-slate-600">

                Total Schedules

              </h3>

              <h1 className="text-4xl font-bold text-blue-950">

                {totalSchedules}

              </h1>

            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <Activity className="text-green-600 mb-3" size={35} />

              <h3 className="text-slate-600">

                Active

              </h3>

              <h1 className="text-4xl font-bold text-blue-950">

                {activeSchedules}

              </h1>

            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <PauseCircle className="text-orange-500 mb-3" size={35} />

              <h3 className="text-slate-600">

                Inactive

              </h3>

              <h1 className="text-4xl font-bold text-blue-950">

                {inactiveSchedules}

              </h1>

            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <Clock3 className="text-purple-600 mb-3" size={35} />

              <h3 className="text-slate-600">

                Scheduler

              </h3>

              <h1 className="text-2xl font-bold text-blue-950">

                {schedulerStatus ? "Running" : "Stopped"}

              </h1>

            </div>

          </div>

          {/* CONTROL PANEL */}

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

              <h2 className="text-2xl font-bold text-blue-950 mb-6">

                Scheduler Control
              </h2>

              <div className="flex gap-4">

                <button

                  onClick={startScheduler}

                  className="bg-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition"
                >

                  <PlayCircle size={20} />

                  Start Scheduler

                </button>

                <button

                  onClick={stopScheduler}

                  className="bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition"
                >

                  <PauseCircle size={20} />

                  Stop Scheduler

                </button>

              </div>

            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

              <h2 className="text-2xl font-bold text-blue-950 mb-6">

                Create Schedule

              </h2>

              <form
                onSubmit={createSchedule}
                className="space-y-4"
              >

                <input

                  type="number"

                  name="dataset_id"

                  placeholder="Dataset ID"

                  value={formData.dataset_id}

                  onChange={handleChange}

                  required

                  className="w-full p-4 rounded-2xl border border-slate-200"
                />

                <select

                  name="model_name"

                  value={formData.model_name}

                  onChange={handleChange}

                  className="w-full p-4 rounded-2xl border border-slate-200"
                >

                  <option value="prophet">

                    Prophet

                  </option>

                  <option value="linear_regression">

                    Linear Regression

                  </option>

                  <option value="random_forest">

                    Random Forest

                  </option>

                  <option value="xgboost">

                    XGBoost

                  </option>

                </select>

                <select

                  name="interval_type"

                  value={formData.interval_type}

                  onChange={handleChange}

                  className="w-full p-4 rounded-2xl border border-slate-200"
                >

                  <option value="hourly">

                    Hourly

                  </option>

                  <option value="daily">

                    Daily

                  </option>

                  <option value="weekly">

                    Weekly

                  </option>

                </select>

                <button

                  disabled={loading}

                  className="w-full bg-blue-600 text-white p-4 rounded-2xl font-semibold hover:scale-105 transition"
                >

                  {

                    loading

                      ? "Creating..."

                      : "Create Schedule"
                  }

                </button>

              </form>

            </div>

          </div>

          {/* TABLE */}

          <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-blue-950 mb-8">

              Active Schedules

            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-4">

                      ID

                    </th>

                    <th className="text-left p-4">

                      Dataset

                    </th>

                    <th className="text-left p-4">

                      Model

                    </th>

                    <th className="text-left p-4">

                      Interval

                    </th>

                    <th className="text-left p-4">

                      Status

                    </th>

                    <th className="text-left p-4">

                      Actions

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    schedules.map(

                      (item) => (

                        <tr

                          key={item.id}

                          className="border-b"
                        >

                          <td className="p-4">

                            {item.id}

                          </td>

                          <td className="p-4">

                            {item.dataset_id}

                          </td>

                          <td className="p-4">

                            {item.model_name}

                          </td>

                          <td className="p-4">

                            {item.interval_type}

                          </td>

                          <td className="p-4">

                            {

                              item.is_active

                                ? (

                                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">

                                    Active

                                  </span>

                                )

                                : (

                                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">

                                    Disabled

                                  </span>

                                )
                            }

                          </td>

                          <td className="p-4 flex gap-3">

                            <button

                              onClick={() =>

                                toggleSchedule(
                                  item.id
                                )
                              }

                              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                            >

                              Toggle

                            </button>

                            <button

                              onClick={() =>

                                deleteSchedule(
                                  item.id
                                )
                              }

                              className="bg-red-600 text-white px-4 py-2 rounded-xl"
                            >

                              <Trash2 size={16} />

                            </button>

                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default ForecastScheduler;