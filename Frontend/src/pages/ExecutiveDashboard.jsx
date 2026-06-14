import {
  useEffect,
  useState
} from "react";

import {
  DollarSign,
  TrendingUp,
  Target,
  BarChart3
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const ExecutiveDashboard = () => {

  const [
    overview,
    setOverview
  ] = useState({});

  const [
    revenueForecast,
    setRevenueForecast
  ] = useState({});

  const [
    profitForecast,
    setProfitForecast
  ] = useState({});

  const [
    costAnalysis,
    setCostAnalysis
  ] = useState({});

  const [
    businessKPIs,
    setBusinessKPIs
  ] = useState({});

  const fetchDashboard =
  async () => {

    try {

      const [

        overviewRes,

        revenueRes,

        profitRes,

        costRes,

        kpiRes

      ] = await Promise.all([

        API.get(
          "/executive-dashboard/overview"
        ),

        API.get(
          "/executive-dashboard/revenue-forecast"
        ),

        API.get(
          "/executive-dashboard/profit-forecast"
        ),

        API.get(
          "/executive-dashboard/cost-analysis"
        ),

        API.get(
          "/executive-dashboard/business-kpis"
        )

      ]);

      setOverview(
        overviewRes.data
      );

      setRevenueForecast(
        revenueRes.data
      );

      setProfitForecast(
        profitRes.data
      );

      setCostAnalysis(
        costRes.data
      );

      setBusinessKPIs(
        kpiRes.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  return (

    <MainLayout>

      <div className="min-h-screen relative overflow-hidden p-8">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300"></div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-[1600px] mx-auto">

          {/* HERO */}

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

            <h1 className="text-5xl font-bold text-slate-800">

              Executive Dashboard

            </h1>

            <p className="text-slate-700 mt-4 text-lg">

              Executive level business intelligence,
              revenue forecasting, KPI monitoring,
              scenario planning insights and
              strategic decision support.

            </p>

          </div>

          {/* OVERVIEW CARDS */}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-700">

                  Total Revenue

                </h3>

                <DollarSign size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4">

                ₹{

                  Number(
                    overview.total_revenue || 0
                  ).toLocaleString()

                }

              </h1>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-700">

                  Forecast Revenue

                </h3>

                <TrendingUp size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4">

                ₹{

                  Number(
                    overview.forecast_revenue || 0
                  ).toLocaleString()

                }

              </h1>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-700">

                  Business Growth

                </h3>

                <Target size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4 text-green-700">

                {

                  overview.business_growth || 0

                }%

              </h1>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-700">

                  Forecast Accuracy

                </h3>

                <BarChart3 size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4 text-blue-700">

                {

                  overview.average_accuracy || 0

                }%

              </h1>

            </div>

          </div>

                    {/* BUSINESS INTELLIGENCE */}

          <div className="mt-10 grid lg:grid-cols-3 gap-8">

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Top Product

              </h2>

              <h1 className="text-4xl font-bold text-blue-700">

                {

                  overview.top_product ||

                  "N/A"

                }

              </h1>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Top Region

              </h2>

              <h1 className="text-4xl font-bold text-green-700">

                {

                  overview.top_region ||

                  "N/A"

                }

              </h1>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Forecast Count

              </h2>

              <h1 className="text-4xl font-bold text-purple-700">

                {

                  overview.forecast_count ||

                  0

                }

              </h1>

            </div>

          </div>

          {/* SCENARIO INSIGHTS */}

          <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

              Scenario Planning Insights

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-green-100 rounded-3xl p-6">

                <h3 className="text-green-800 font-semibold">

                  Best Case

                </h3>

                <h1 className="text-4xl font-bold text-green-700 mt-3">

                  {

                    overview.best_case || 0

                  }

                </h1>

              </div>

              <div className="bg-blue-100 rounded-3xl p-6">

                <h3 className="text-blue-800 font-semibold">

                  Normal Case

                </h3>

                <h1 className="text-4xl font-bold text-blue-700 mt-3">

                  {

                    overview.normal_case || 0

                  }

                </h1>

              </div>

              <div className="bg-red-100 rounded-3xl p-6">

                <h3 className="text-red-800 font-semibold">

                  Worst Case

                </h3>

                <h1 className="text-4xl font-bold text-red-700 mt-3">

                  {

                    overview.worst_case || 0

                  }

                </h1>

              </div>

            </div>

          </div>

          {/* FINANCIAL ANALYTICS */}

          <div className="mt-10 grid lg:grid-cols-3 gap-8">

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Revenue Forecast

              </h2>

              <h1 className="text-4xl font-bold text-blue-700">

                ₹{

                  Number(

                    revenueForecast.forecast_revenue || 0

                  ).toLocaleString()

                }

              </h1>

              <p className="mt-4 text-slate-600">

                Growth:

                {" "}

                {

                  revenueForecast.growth_percentage || 0

                }%

              </p>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Profit Forecast

              </h2>

              <h1 className="text-4xl font-bold text-green-700">

                ₹{

                  Number(

                    profitForecast.forecast_profit || 0

                  ).toLocaleString()

                }

              </h1>

            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Estimated Cost

              </h2>

              <h1 className="text-4xl font-bold text-red-700">

                ₹{

                  Number(

                    costAnalysis.estimated_cost || 0

                  ).toLocaleString()

                }

              </h1>

            </div>

          </div>

                    {/* EXECUTIVE KPI SUMMARY */}

          <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

              Executive KPI Summary

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              <div className="bg-white/40 rounded-3xl p-6">

                <h3 className="text-slate-600 font-semibold">

                  Current Revenue

                </h3>

                <h1 className="text-3xl font-bold mt-3">

                  ₹{

                    Number(

                      businessKPIs.total_revenue || 0

                    ).toLocaleString()

                  }

                </h1>

              </div>

              <div className="bg-white/40 rounded-3xl p-6">

                <h3 className="text-slate-600 font-semibold">

                  Forecast Revenue

                </h3>

                <h1 className="text-3xl font-bold mt-3">

                  ₹{

                    Number(

                      businessKPIs.forecast_revenue || 0

                    ).toLocaleString()

                  }

                </h1>

              </div>

              <div className="bg-white/40 rounded-3xl p-6">

                <h3 className="text-slate-600 font-semibold">

                  Forecast Count

                </h3>

                <h1 className="text-3xl font-bold mt-3">

                  {

                    businessKPIs.forecast_count || 0

                  }

                </h1>

              </div>

              <div className="bg-white/40 rounded-3xl p-6">

                <h3 className="text-slate-600 font-semibold">

                  Forecast Accuracy

                </h3>

                <h1 className="text-3xl font-bold mt-3 text-blue-700">

                  {

                    businessKPIs.average_accuracy || 0

                  }%

                </h1>

              </div>

              <div className="bg-white/40 rounded-3xl p-6">

                <h3 className="text-slate-600 font-semibold">

                  Best Performing Product

                </h3>

                <h1 className="text-2xl font-bold mt-3 text-green-700">

                  {

                    businessKPIs.top_product ||

                    "N/A"

                  }

                </h1>

              </div>

              <div className="bg-white/40 rounded-3xl p-6">

                <h3 className="text-slate-600 font-semibold">

                  Best Performing Region

                </h3>

                <h1 className="text-2xl font-bold mt-3 text-purple-700">

                  {

                    businessKPIs.top_region ||

                    "N/A"

                  }

                </h1>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default ExecutiveDashboard;