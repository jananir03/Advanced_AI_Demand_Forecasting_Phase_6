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

      <div className="relative min-h-screen overflow-hidden p-8">

        <div className="relative z-10 w-full">

          {/* EXECUTIVE HERO */}

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-10 shadow-[0_25px_80px_rgba(15,23,42,0.35)] border border-indigo-500/20">

            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="inline-flex items-center gap-3 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-5 py-2 mb-6">

                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>

                <span className="text-indigo-100 text-sm font-medium">

                  Executive Intelligence Center

                </span>

              </div>

              <h1 className="text-5xl xl:text-6xl font-bold text-white">

                Executive Dashboard

              </h1>

              <p className="text-slate-300 mt-5 text-lg max-w-4xl leading-relaxed">

                Executive-level business intelligence, revenue forecasting,
                KPI monitoring, scenario planning insights and strategic
                decision support for enterprise forecasting operations.

              </p>

            </div>

          </div>

          {/* EXECUTIVE KPI CARDS */}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-[30px] p-7 shadow-xl border border-emerald-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">

                    Total Revenue

                  </p>

                  <h1 className="text-4xl font-bold text-slate-900 mt-4">

                    ₹{
                      Number(
                        overview.total_revenue || 0
                      ).toLocaleString()
                    }

                  </h1>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  <DollarSign
                    size={26}
                    className="text-emerald-600"
                  />

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-br from-white to-blue-50 rounded-[30px] p-7 shadow-xl border border-blue-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">

                    Forecast Revenue

                  </p>

                  <h1 className="text-4xl font-bold text-slate-900 mt-4">

                    ₹{
                      Number(
                        overview.forecast_revenue || 0
                      ).toLocaleString()
                    }

                  </h1>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <TrendingUp
                    size={26}
                    className="text-blue-600"
                  />

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-br from-white to-violet-50 rounded-[30px] p-7 shadow-xl border border-violet-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">

                    Business Growth

                  </p>

                  <h1 className="text-4xl font-bold text-violet-700 mt-4">

                    {overview.business_growth || 0}%

                  </h1>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                  <Target
                    size={26}
                    className="text-violet-600"
                  />

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 rounded-[30px] p-7 shadow-xl border border-amber-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">

                    Forecast Accuracy

                  </p>

                  <h1 className="text-4xl font-bold text-amber-600 mt-4">

                    {overview.average_accuracy || 0}%

                  </h1>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">

                  <BarChart3
                    size={26}
                    className="text-amber-600"
                  />

                </div>

              </div>

            </div>
            </div>

            {/* BUSINESS INTELLIGENCE */}

            <div className="mt-12">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-2 h-10 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full"></div>

                <h2 className="text-3xl font-bold text-white">

                  Strategic Business Intelligence

                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-8">

                {/* TOP PRODUCT */}

                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 rounded-[32px] p-8 shadow-2xl border border-indigo-500/20">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>

                  <p className="text-indigo-300 uppercase tracking-widest text-xs font-semibold">

                    Best Selling Product

                  </p>

                  <h2 className="text-white text-2xl font-bold mt-6">

                    {overview.top_product || "N/A"}

                  </h2>

                  <p className="text-slate-300 mt-4">

                    Highest performing product across all
                    forecasted business segments.

                  </p>

                </div>

                {/* TOP REGION */}

                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-[32px] p-8 shadow-2xl border border-emerald-500/20">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>

                  <p className="text-emerald-300 uppercase tracking-widest text-xs font-semibold">

                    Leading Region

                  </p>

                  <h2 className="text-white text-2xl font-bold mt-6">

                    {overview.top_region || "N/A"}

                  </h2>

                  <p className="text-slate-300 mt-4">

                    Region contributing the highest
                    revenue and forecast demand.

                  </p>

                </div>

                {/* FORECAST COUNT */}

                <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-900 via-purple-900 to-violet-900 rounded-[32px] p-8 shadow-2xl border border-fuchsia-500/20">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-400/10 rounded-full blur-2xl"></div>

                  <p className="text-fuchsia-300 uppercase tracking-widest text-xs font-semibold">

                    Forecast Models

                  </p>

                  <h2 className="text-white text-5xl font-bold mt-6">

                    {overview.forecast_count || 0}

                  </h2>

                  <p className="text-slate-300 mt-4">

                    Forecasts generated across products,
                    regions and business units.

                  </p>

                </div>

              </div>

            </div>

            {/* SCENARIO PLANNING */}

            <div className="mt-14">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-2 h-10 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full"></div>

                <h2 className="text-3xl font-bold text-white">

                  Scenario Planning Insights

                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-8">

                {/* BEST CASE */}

                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-[32px] p-8 shadow-2xl text-white">

                  <p className="uppercase tracking-wider text-sm font-semibold text-emerald-100">

                    Best Case

                  </p>

                  <h1 className="text-5xl font-bold mt-6">

                    {overview.best_case || 0}

                  </h1>

                  <p className="mt-6 text-emerald-100">

                    High-growth optimistic scenario with
                    maximum revenue potential.

                  </p>

                </div>

                {/* NORMAL CASE */}

                <div className="bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 rounded-[32px] p-8 shadow-2xl text-white">

                  <p className="uppercase tracking-wider text-sm font-semibold text-blue-100">

                    Expected Case

                  </p>

                  <h1 className="text-5xl font-bold mt-6">

                    {overview.normal_case || 0}

                  </h1>

                  <p className="mt-6 text-blue-100">

                    Most probable business outcome based
                    on current forecasting assumptions.

                  </p>

                </div>

                {/* WORST CASE */}

                <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-[32px] p-8 shadow-2xl text-white">

                  <p className="uppercase tracking-wider text-sm font-semibold text-rose-100">

                    Worst Case

                  </p>

                  <h1 className="text-5xl font-bold mt-6">

                    {overview.worst_case || 0}

                  </h1>

                  <p className="mt-6 text-rose-100">

                    Risk-adjusted downside scenario for
                    strategic contingency planning.

                  </p>

                </div>

              </div>

            </div>

          {/* FINANCIAL OUTLOOK */}

            <div className="mt-14">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-2 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>

                <h2 className="text-3xl font-bold text-white">

                  Financial Outlook

                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-8">

                {/* REVENUE FORECAST */}

                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100 rounded-[32px] p-8 shadow-2xl border border-blue-100">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>

                  <p className="text-blue-700 uppercase tracking-wider text-xs font-semibold">

                    Revenue Forecast

                  </p>

                  <h1 className="text-4xl font-bold text-slate-900 mt-6">

                    ₹{
                      Number(
                        revenueForecast.forecast_revenue || 0
                      ).toLocaleString()
                    }

                  </h1>

                  <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">

                    Growth: {revenueForecast.growth_percentage || 0}%

                  </div>

                </div>

                {/* PROFIT FORECAST */}

                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 rounded-[32px] p-8 shadow-2xl border border-emerald-100">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl"></div>

                  <p className="text-emerald-700 uppercase tracking-wider text-xs font-semibold">

                    Profit Forecast

                  </p>

                  <h1 className="text-4xl font-bold text-slate-900 mt-6">

                    ₹{
                      Number(
                        profitForecast.forecast_profit || 0
                      ).toLocaleString()
                    }

                  </h1>

                  <p className="mt-6 text-emerald-700 font-medium">

                    Projected profitability outlook

                  </p>

                </div>

                {/* ESTIMATED COST */}

                <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-red-100 rounded-[32px] p-8 shadow-2xl border border-rose-100">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-300/20 rounded-full blur-2xl"></div>

                  <p className="text-rose-700 uppercase tracking-wider text-xs font-semibold">

                    Estimated Cost

                  </p>

                  <h1 className="text-4xl font-bold text-slate-900 mt-6">

                    ₹{
                      Number(
                        costAnalysis.estimated_cost || 0
                      ).toLocaleString()
                    }

                  </h1>

                  <p className="mt-6 text-rose-700 font-medium">

                    Operational cost projection

                  </p>

                </div>

              </div>

            </div>

            {/* EXECUTIVE KPI SUMMARY */}

            <div className="mt-14 mb-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-2 h-10 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>

                <h2 className="text-3xl font-bold text-white">

                  Executive KPI Summary

                </h2>

              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {/* CURRENT REVENUE */}

                <div className="bg-gradient-to-br from-white to-slate-50 rounded-[28px] p-7 shadow-xl border border-slate-100 hover:-translate-y-1 transition-all">

                  <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold">

                    Current Revenue

                  </p>

                  <h1 className="text-3xl font-bold text-slate-900 mt-4">

                    ₹{
                      Number(
                        businessKPIs.total_revenue || 0
                      ).toLocaleString()
                    }

                  </h1>

                </div>

                {/* FORECAST REVENUE */}

                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-[28px] p-7 shadow-xl border border-blue-100 hover:-translate-y-1 transition-all">

                  <p className="text-blue-700 uppercase tracking-wider text-xs font-semibold">

                    Forecast Revenue

                  </p>

                  <h1 className="text-3xl font-bold text-slate-900 mt-4">

                    ₹{
                      Number(
                        businessKPIs.forecast_revenue || 0
                      ).toLocaleString()
                    }

                  </h1>

                </div>

                {/* FORECAST COUNT */}

                <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-[28px] p-7 shadow-xl border border-violet-100 hover:-translate-y-1 transition-all">

                  <p className="text-violet-700 uppercase tracking-wider text-xs font-semibold">

                    Forecast Count

                  </p>

                  <h1 className="text-3xl font-bold text-violet-700 mt-4">

                    {businessKPIs.forecast_count || 0}

                  </h1>

                </div>

                {/* ACCURACY */}

                <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-[28px] p-7 shadow-xl border border-amber-100 hover:-translate-y-1 transition-all">

                  <p className="text-amber-700 uppercase tracking-wider text-xs font-semibold">

                    Forecast Accuracy

                  </p>

                  <h1 className="text-3xl font-bold text-amber-700 mt-4">

                    {businessKPIs.average_accuracy || 0}%

                  </h1>

                </div>

                {/* TOP PRODUCT */}

                <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-[28px] p-7 shadow-xl border border-emerald-100 hover:-translate-y-1 transition-all">

                  <p className="text-emerald-700 uppercase tracking-wider text-xs font-semibold">

                    Best Product

                  </p>

                  <h1 className="text-2xl font-bold text-emerald-700 mt-4">

                    {businessKPIs.top_product || "N/A"}

                  </h1>

                </div>

                {/* TOP REGION */}

                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-100 rounded-[28px] p-7 shadow-xl border border-fuchsia-100 hover:-translate-y-1 transition-all">

                  <p className="text-fuchsia-700 uppercase tracking-wider text-xs font-semibold">

                    Best Region

                  </p>

                  <h1 className="text-2xl font-bold text-fuchsia-700 mt-4">

                    {businessKPIs.top_region || "N/A"}

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