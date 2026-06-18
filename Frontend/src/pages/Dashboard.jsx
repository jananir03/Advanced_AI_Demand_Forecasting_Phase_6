import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

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

  const [widgets, setWidgets] = useState([]);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    const datasetId =
      localStorage.getItem(
        "active_dataset_id"
      );

      const widgetsRes =
        await API.get(
          "/dashboard-widgets/"
        );

      setWidgets(
        widgetsRes.data || []
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
  const isWidgetVisible = (
    widgetName
  ) => {

    const widget =
      widgets.find(

        (w) =>
          w.widget_name ===
          widgetName

      );

    return widget
      ? widget.is_visible
      : true;
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

    <div className="space-y-8 px-6">

      {/* EXECUTIVE HERO */}

      <div className="
        relative
        overflow-hidden
        rounded-[40px]
        bg-gradient-to-r
        from-cyan-600
        via-blue-600
        to-indigo-700
        p-10
        shadow-2xl
      ">

        <div className="
          absolute
          top-0
          right-0
          w-72
          h-72
          bg-white/10
          rounded-full
          blur-3xl
        " />

        <div className="relative z-10">

          <h1 className="
            text-5xl
            font-bold
            text-white
          ">

            Executive Dashboard

          </h1>

          <p className="
            text-cyan-100
            mt-4
            text-lg
            max-w-4xl
          ">

            Enterprise forecasting intelligence,
            revenue forecasting, KPI monitoring,
            scenario planning insights and
            strategic decision support.

          </p>

        </div>

      </div>

      {/* KPI OVERVIEW */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[30px]
          p-8
          shadow-xl
          border-l-4
          border-cyan-500
        ">

          <p className="text-slate-500">

            Total Sales

          </p>

          <h2 className="
            text-4xl
            font-bold
            text-blue-950
            mt-4
          ">

            ₹{summary.total_sales}

          </h2>

        </div>

        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[30px]
          p-8
          shadow-xl
          border-l-4
          border-purple-500
        ">

          <p className="text-slate-500">

            Forecasts

          </p>

          <h2 className="
            text-4xl
            font-bold
            text-purple-600
            mt-4
          ">

            {summary.total_forecasts}

          </h2>

        </div>

        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[30px]
          p-8
          shadow-xl
          border-l-4
          border-pink-500
        ">

          <p className="text-slate-500">

            Datasets

          </p>

          <h2 className="
            text-4xl
            font-bold
            text-pink-600
            mt-4
          ">

            {summary.total_datasets}

          </h2>

        </div>

        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[30px]
          p-8
          shadow-xl
          border-l-4
          border-green-500
        ">

          <p className="text-slate-500">

            Forecast Accuracy

          </p>

          <h2 className="
            text-4xl
            font-bold
            text-green-600
            mt-4
          ">

            {summary.accuracy}%

          </h2>

        </div>

      </div>

      {/* CHARTS */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-8
      ">

        {/* MONTHLY SALES */}

        {isWidgetVisible(
          "Revenue Analytics"
        ) && (



        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[35px]
          p-10
          shadow-xl
          border
          border-white/20
        ">

          <h2 className="
            text-3xl
            font-bold
            text-blue-950
            mb-8
          ">

            Monthly Sales Trends

          </h2>

          <SalesChart
            data={monthlySales}
          />

        </div>
        )}

        {/* TOP PRODUCTS */}

        {isWidgetVisible(
          "Top Products"
        ) && (

        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[35px]
          p-10
          shadow-xl
          border
          border-white/20
        ">

          <h2 className="
            text-3xl
            font-bold
            text-blue-950
            mb-8
          ">

            Top Products

          </h2>

          <TopProductsChart
            data={topProducts}
          />

        </div>
        )}

      </div>

      {/* EXECUTIVE OPERATIONS GRID */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-8
      ">

        {/* INVENTORY RISK */}

        {isWidgetVisible(
          "Inventory Risk"
        ) && (

        <div className="
          bg-white/70
          backdrop-blur-xl
          rounded-[35px]
          p-10
          shadow-xl
          border
          border-white/20
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-8
          ">

            <div className="
              w-12
              h-12
              rounded-2xl
              bg-red-100
              flex
              items-center
              justify-center
            ">

              📦

            </div>

            <div>

              <h2 className="
                text-2xl
                font-bold
                text-blue-950
              ">

                Inventory Risk

              </h2>

              <p className="text-slate-500">

                Stock monitoring & demand risks

              </p>

            </div>

          </div>
          
        

         <div className="space-y-3">

          {inventoryRisk?.length > 0 ? (

            inventoryRisk.slice(0, 5).map((item, index) => (

              <div
                key={index}
                className="flex justify-between p-3 rounded-xl bg-slate-100"
              >
                <span>
                  {item.product_name || item.product || `Item ${index + 1}`}
                </span>

                <span className="font-semibold text-red-600">
                  {item.risk_level || "High"}
                </span>

              </div>

            ))

          ) : (

            <div className="text-slate-500">
              No Inventory Risks Found
            </div>

          )}

        </div>

        </div>
        )}

        {/* SYSTEM METRICS */}

        <div className="
          bg-gradient-to-br
          from-slate-900
          via-slate-800
          to-slate-900
          rounded-[35px]
          p-10
          shadow-2xl
        ">

          <h2 className="
            text-3xl
            font-bold
            text-white
            mb-8
          ">

            System Metrics

          </h2>

          {

            systemMetrics ? (

              <div className="
                grid
                grid-cols-2
                gap-6
              ">

                <div className="
                  bg-white/5
                  rounded-3xl
                  p-6
                  border
                  border-white/10
                ">

                  <p className="
                    text-slate-400
                  ">

                    Total Users

                  </p>

                  <h3 className="
                    text-4xl
                    font-bold
                    text-cyan-400
                    mt-3
                  ">

                    {systemMetrics.total_users || 0}

                  </h3>

                </div>

                <div className="
                  bg-white/5
                  rounded-3xl
                  p-6
                  border
                  border-white/10
                ">

                  <p className="
                    text-slate-400
                  ">

                    Datasets

                  </p>

                  <h3 className="
                    text-4xl
                    font-bold
                    text-green-400
                    mt-3
                  ">

                    {systemMetrics.total_datasets || 0}

                  </h3>

                </div>

                <div className="
                  bg-white/5
                  rounded-3xl
                  p-6
                  border
                  border-white/10
                ">

                  <p className="
                    text-slate-400
                  ">

                    Forecasts

                  </p>

                  <h3 className="
                    text-4xl
                    font-bold
                    text-purple-400
                    mt-3
                  ">

                    {systemMetrics.total_forecasts || 0}

                  </h3>

                </div>

                <div className="
                  bg-white/5
                  rounded-3xl
                  p-6
                  border
                  border-white/10
                ">

                  <p className="
                    text-slate-400
                  ">

                    Active Models

                  </p>

                  <h3 className="
                    text-4xl
                    font-bold
                    text-orange-400
                    mt-3
                  ">

                    {systemMetrics.active_models || 0}

                  </h3>

                </div>

              </div>

            ) : (

              <div className="
                text-center
                py-16
                text-slate-400
              ">

                No System Metrics Available

              </div>

            )

          }

        </div>

      </div>

            {/* RECENT ACTIVITY */}

      <div className="
        bg-white/70
        backdrop-blur-xl
        rounded-[35px]
        p-10
        shadow-xl
        border
        border-white/20
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <div>

            <h2 className="
              text-3xl
              font-bold
              text-blue-950
            ">

              Recent Activity

            </h2>

            <p className="
              text-slate-500
              mt-2
            ">

              Latest forecasting and system events

            </p>

          </div>

        </div>

        {

          activities?.length > 0 ? (

            <div className="space-y-4">

              {

                activities.map((activity, index) => (

                  <div

                    key={index}

                    className="
                      flex
                      items-center
                      justify-between
                      p-5
                      rounded-2xl
                      bg-slate-50
                      hover:bg-slate-100
                      transition-all
                    "

                  >

                    <div>

                      <h3 className="
                        font-semibold
                        text-blue-950
                      ">

                        {

                          activity.activity ||

                          activity.action ||

                          activity.title ||

                          "System Activity"

                        }

                      </h3>

                      <p className="
                        text-slate-500
                        text-sm
                        mt-1
                      ">

                        {

                          activity.description ||

                          activity.details ||

                          "No description available"

                        }

                      </p>

                    </div>

                    <div className="
                      text-sm
                      text-slate-400
                    ">

                      {

                        activity.created_at

                        ?

                        new Date(
                          activity.created_at
                        ).toLocaleDateString()

                        :

                        "-"

                      }

                    </div>

                  </div>

                ))

              }

            </div>

          ) : (

            <div className="
              text-center
              py-16
              text-slate-500
            ">

              No Recent Activities Found

            </div>

          )

        }

      </div>

    </div>

  </MainLayout>

);

};

export default Dashboard;