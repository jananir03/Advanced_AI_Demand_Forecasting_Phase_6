import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import DashboardCard from "../components/DashboardCard";

import SalesChart from "../components/SalesChart";

import TopProductsChart from "../components/TopProductsChart";

import API from "../services/api";

const Dashboard = () => {
  const theme =
    localStorage.getItem("theme") || "light";

  const [summary, setSummary] = useState({

    total_sales: 0,

    total_forecasts: 0,

    total_datasets: 0,

    accuracy: 0,
  });

  const [monthlySales, setMonthlySales] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const [activities, setActivities] = useState([]);

  const [revenueAnalytics, setRevenueAnalytics] =
    useState({});

  const [regionAnalytics, setRegionAnalytics] =
    useState([]);

  const [inventoryRisk, setInventoryRisk] =
    useState([]);

  const [businessInsights, setBusinessInsights] =
    useState([]);

  const [systemMetrics, setSystemMetrics] =
    useState({});

  const [anomalies, setAnomalies] =
    useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    const datasetId =
      localStorage.getItem(
        "active_dataset_id"
      );

    try {

      // -----------------------------------
      // SUMMARY
      // -----------------------------------

      const summaryRes = await API.get(
        "/dashboard/summary"
      );

      setSummary(summaryRes.data);

      // -----------------------------------
      // MONTHLY SALES
      // -----------------------------------

      const salesRes = await API.get(
        "/dashboard/monthly-sales"
      );

      setMonthlySales(salesRes.data);

      // -----------------------------------
      // TOP PRODUCTS
      // -----------------------------------

      const productsRes = await API.get(
        "/dashboard/top-products"
      );

      setTopProducts(productsRes.data);

      // -----------------------------------
      // RECENT ACTIVITIES
      // -----------------------------------

      const activityRes = await API.get(
        "/activities/recent"
      );

      setActivities(activityRes.data);

      // -----------------------------------
      // REVENUE ANALYTICS
      // -----------------------------------

      const revenueRes =
        await API.get(

        `/dashboard/advanced/revenue-analytics?dataset_id=${datasetId}`
      );

      setRevenueAnalytics(
        revenueRes.data
      );


      // -----------------------------------
      // REGION ANALYTICS
      // -----------------------------------

      const regionRes =
        await API.get(

          `/dashboard/advanced/region-analytics?dataset_id=${datasetId}`
        );

      setRegionAnalytics(
        regionRes.data
      );


      // -----------------------------------
      // INVENTORY RISK
      // -----------------------------------

      const inventoryRes =
        await API.get(

          `/dashboard/advanced/inventory-risk?dataset_id=${datasetId}`
        );

      setInventoryRisk(
        inventoryRes.data
      );


      // -----------------------------------
      // BUSINESS INSIGHTS
      // -----------------------------------

      const insightsRes =
        await API.get(

          `/dashboard/advanced/business-insights?dataset_id=${datasetId}`
        );

      setBusinessInsights(

        insightsRes.data.insights || []
      );


      // -----------------------------------
      // SYSTEM METRICS
      // -----------------------------------

      const metricsRes =
        await API.get(

          "/dashboard/advanced/system-metrics"
        );

      setSystemMetrics(
        metricsRes.data
      );

      // -----------------------------------
      // ANOMALY DETECTION
      // -----------------------------------

      const anomalyRes =
        await API.get(

          `/dashboard/advanced/anomaly-detection?dataset_id=${datasetId}`
        );

      setAnomalies(
        anomalyRes.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <MainLayout>

        <div className="text-3xl font-bold text-white">

          Loading Dashboard...

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      {/* ----------------------------------- */}
      {/* DASHBOARD CARDS */}
      {/* ----------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard

          title="Total Sales"

          value={`₹${summary.total_sales}`}

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

      {/* ----------------------------------- */}
      {/* CHARTS */}
      {/* ----------------------------------- */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

        {/* SALES CHART */}

        <div className="bg-white/80 dark:bg-slate-800 backdrop-blur-lg rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-blue-950 dark:text-white">

            Monthly Sales Trends

          </h2>

          <SalesChart data={monthlySales} />

        </div>

        {/* TOP PRODUCTS */}

        <div className="bg-white/80 dark:bg-slate-800 backdrop-blur-lg rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-blue-950 dark:text-white">

            Top Products

          </h2>

          <TopProductsChart data={topProducts} />

        </div>

      </div>

      {/* ----------------------------------- */}
      {/* REVENUE ANALYTICS */}
      {/* ----------------------------------- */}

      <div className="mt-10 bg-white/80 dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">

          Revenue Analytics

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <DashboardCard

            title="Total Revenue"

            value={`₹${revenueAnalytics.total_revenue || 0}`}

            color="border-green-500"
          />

          <DashboardCard

            title="Predicted Growth"

            value={`₹${revenueAnalytics.predicted_growth || 0}`}

            color="border-blue-500"
          />

          <DashboardCard

            title="Monthly Average"

            value={`₹${revenueAnalytics.monthly_average || 0}`}

            color="border-purple-500"
          />

        </div>

      </div>

      {/* ----------------------------------- */}
      {/* REGION ANALYTICS */}
      {/* ----------------------------------- */}

      <div className="mt-10 bg-white/80 dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">

          Region Analytics

        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th className="text-left p-3">
                Region
              </th>

              <th className="text-left p-3">
                Total Sales
              </th>

            </tr>

          </thead>

          <tbody>

            {regionAnalytics.map((region, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-3">
                  {region.region}
                </td>

                <td className="p-3">
                  ₹{region.total_sales}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ----------------------------------- */}
      {/* INVENTORY RISK */}
      {/* ----------------------------------- */}

      <div className="mt-10 bg-white/80 dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">

          Inventory Risk Analysis

        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {inventoryRisk.map((item, index) => (

          <div
            key={index}
            className={`rounded-2xl p-5 shadow-sm border ${
            theme === "dark"
            ? "bg-slate-700 border-slate-600"
            : "bg-white border-slate-200"
          }`}
          >

            <h3 className="font-bold text-lg text-slate-900 dark:text-white">

              {item.product}

            </h3>

            <p className="mt-2 text-slate-700 dark:text-gray-200">

              Sales Amount:
              ₹{item.sales}

            </p>

            <p className="text-slate-700 dark:text-gray-200">

              Risk Level:
              {item.risk_level}

            </p>

          </div>

        ))}

      </div>

    </div>

    {/* ----------------------------------- */}
    {/* BUSINESS INSIGHTS */}
    {/* ----------------------------------- */}

    <div className="mt-10 bg-white/80 dark:bg-slate-800 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-6">

        AI Business Insights

      </h2>

      <div className="space-y-4">

        {businessInsights.map((insight, index) => (

        <div
          key={index}
          className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-black dark:text-white"
        >

          {insight}

        </div>

      ))}

      </div>

    </div>

    {/* ----------------------------------- */}
    {/* SYSTEM METRICS */}
    {/* ----------------------------------- */}

    <div className="mt-10 bg-white/80 dark:bg-slate-800 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-6">

        System Metrics

      </h2>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

      <DashboardCard
        title="API Health"
        value={systemMetrics.api_health || "-"}
        color="border-green-500"
      />

      <DashboardCard
        title="System Load"
        value={systemMetrics.system_load || "-"}
        color="border-blue-500"
      />

      <DashboardCard
        title="Users"
        value={systemMetrics.total_users || 0}
        color="border-purple-500"
      />

      <DashboardCard
        title="Datasets"
        value={systemMetrics.total_datasets || 0}
        color="border-pink-500"
      />

      <DashboardCard
        title="Forecasts"
        value={systemMetrics.total_forecasts || 0}
        color="border-cyan-500"
      />

    </div>

  </div>

      {/* ----------------------------------- */}
      {/* ANOMALY DETECTION */}
      {/* ----------------------------------- */}

      <div className="mt-10 bg-white/80 dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-red-600 mb-6">

          Anomaly Detection

        </h2>

        {

          anomalies.length > 0 ? (

            <div className="space-y-4">

              {

                anomalies.map(

                  (item, index) => (

                    <div

                      key={index}

                      className="bg-red-50 border-l-8 border-red-500 rounded-2xl p-5 shadow-sm"
                    >

                    <h3 className="text-xl font-bold text-red-800">

                      {item.product}

                    </h3>

                    <p className="mt-2 text-red-700">

                      Sales Amount:
                      ₹{item.sales_amount}

                    </p>

                    <p className="text-red-700 font-bold">

                      {item.status}

                    </p>

                  </div>

                )
              )
            }

          </div>

        ) : (

          <div className="text-green-600 text-lg font-semibold">

            No anomalies detected.

          </div>

        )
      }

    </div>

      {/* ----------------------------------- */}
      {/* RECENT ACTIVITY */}
      {/* ----------------------------------- */}

      <div className="mt-10 bg-white/55 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/30">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold text-blue-950 dark:text-white">

            Recent Activity

          </h2>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">

            Live Updates

          </span>

        </div>

        {/* ACTIVITIES */}

        {

          activities.length > 0 ? (

            <div className="space-y-6">

              {

                activities.map(

                  (activity, index) => (

                    <div

                      key={index}

                      className="bg-white/70 rounded-3xl p-6 shadow-lg border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                    >

                      {/* LEFT */}

                      <div className="space-y-2">

                        <h3 className="text-2xl font-bold text-slate-800">

                          {activity.type}

                        </h3>

                        <p className="text-slate-600">

                          <span className="font-semibold">

                            {activity.description}

                          </span>

                        </p>

                      </div>

                      {/* RIGHT */}

                      <div className="flex flex-col items-start md:items-end gap-3">

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">

                          Completed

                        </span>

                        <span className="text-slate-500 text-sm">

                          {activity.time}

                        </span>

                      </div>

                    </div>
                  )
                )
              }

            </div>

          ) : (

            <div className="text-slate-700 text-xl">

              No recent activity found.

            </div>
          )
        }

      </div>

    </MainLayout>
  );
};

export default Dashboard;