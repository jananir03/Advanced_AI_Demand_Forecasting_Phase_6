import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import DashboardCard from "../components/DashboardCard";

import SalesChart from "../components/SalesChart";

import TopProductsChart from "../components/TopProductsChart";

import API from "../services/api";

const Dashboard = () => {

  const [summary, setSummary] = useState({

    total_sales: 0,

    total_forecasts: 0,

    total_datasets: 0,

    accuracy: 0,
  });

  const [monthlySales, setMonthlySales] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      // Summary

      const summaryRes = await API.get(
        "/dashboard/summary"
      );

      setSummary(summaryRes.data);

      // Monthly Sales

      const salesRes = await API.get(
        "/dashboard/monthly-sales"
      );

      setMonthlySales(salesRes.data);

      // Top Products

      const productsRes = await API.get(
        "/dashboard/top-products"
      );

      setTopProducts(productsRes.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <MainLayout>

        <div className="text-3xl font-bold">

          Loading Dashboard...

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard

          title="Total Sales"

          value={`$${summary.total_sales}`}

          color="border-blue-500"
        />

        <DashboardCard

          title="Forecasts"

          value={summary.total_forecasts}

          color="border-purple-500"
        />

        <DashboardCard

          title="Datasets"

          value={summary.total_datasets}

          color="border-pink-500"
        />

        <DashboardCard

          title="Accuracy"

          value={`${summary.accuracy}%`}

          color="border-cyan-500"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

        {/* Monthly Sales */}

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-blue-950">

            Monthly Sales Trends

          </h2>

          <SalesChart data={monthlySales} />

        </div>

        {/* Top Products */}

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-blue-950">

            Top Products

          </h2>

          <TopProductsChart data={topProducts} />

        </div>

      </div>

      {/* ----------------------------------- */
      /* Recent Forecast Activity */
      /* ----------------------------------- */}

      <div className="bg-white/55 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/30">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold text-blue-950">

            Recent Forecast Activity

          </h2>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">

            Live Updates

          </span>

        </div>


          {

            JSON.parse(

              localStorage.getItem(
                "forecast_history"
              )

            )?.length > 0 ? (

              <div className="space-y-6">

              {

                JSON.parse(

                  localStorage.getItem(
                    "forecast_history"
                  )

                ).map(

                  (activity, index) => (

                    <div

                      key={index}

                      className="bg-white/70 rounded-3xl p-6 shadow-lg border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                    >

                    {/* Left */}

                      <div className="space-y-2">

                        <h3 className="text-2xl font-bold text-slate-800">

                          {activity.dataset}

                        </h3>

                        <p className="text-slate-600">

                          Model:
                          {" "}
                          <span className="font-semibold">

                            {activity.model}

                          </span>

                        </p>

                        <p className="text-slate-600">

                          Duration:
                          {" "}
                          <span className="font-semibold">

                            {activity.duration}

                          </span>

                        </p>

                        <p className="text-slate-600">

                          Category:
                          {" "}
                          <span className="font-semibold">

                            {activity.category}

                          </span>

                        </p>

                        <p className="text-slate-600">

                          Region:
                          {" "}
                          <span className="font-semibold">

                            {activity.region}

                          </span>

                        </p>

                      </div>


                      {/* Right */}

                      <div className="flex flex-col items-start md:items-end gap-3">

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">

                          Forecast Generated

                        </span>

                        <span className="text-slate-500 text-sm">

                          {activity.generated_at}

                        </span>

                      </div>

                     </div>
                    )
                  )
                }

              </div>

            ) : (

            <div className="text-slate-600 text-lg">

              No recent forecast activity found.

            </div>
          )
        }

      </div>

    </MainLayout>
  );
};

export default Dashboard;