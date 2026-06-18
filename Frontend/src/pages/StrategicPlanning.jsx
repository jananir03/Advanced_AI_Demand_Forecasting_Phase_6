import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  Target,
  TrendingUp,
  Briefcase,
  Brain,
  Plus,
  Search,
  Activity,
  BarChart3
} from "lucide-react";

const StrategicPlanning = () => {

  const [plans, setPlans] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData,
    setFormData] =
    useState({

      plan_name: "",

      planning_period: "",

      target_value: "",

      forecast_value: ""

    });

  useEffect(() => {

    loadPlans();

    loadSummary();

  }, []);

  const loadPlans =
    async () => {

      try {

        const response =
          await API.get(
            "/strategic-planning/"
          );

        setPlans(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const loadSummary =
    async () => {

      try {

        const response =
          await API.get(
            "/strategic-planning/stats/summary"
          );

        setSummary(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const createPlan =
    async () => {

      try {

        await API.post(

          "/strategic-planning/",

          {

            plan_name:
              formData.plan_name,

            planning_period:
              formData.planning_period,

            target_value:
              Number(
                formData.target_value
              ),

            forecast_value:
              Number(
                formData.forecast_value
              )

          }

        );

        setMessage(
          "✅ Strategic Plan Created Successfully"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          plan_name: "",

          planning_period: "",

          target_value: "",

          forecast_value: ""

        });

        loadPlans();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create strategic plan"
        );

      }

    };

  const filteredPlans =
    plans.filter(

      (plan) =>

        plan.plan_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        plan.planning_period
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    );

  const totalTarget =

    plans.reduce(

      (sum, plan) =>

        sum +
        Number(
          plan.target_value || 0
        ),

      0

    );

  const totalForecast =

    plans.reduce(

      (sum, plan) =>

        sum +
        Number(
          plan.forecast_value || 0
        ),

      0

    );

  const alignmentScore =

    totalTarget > 0

      ?

      Math.min(

        100,

        Math.round(

          (
            totalForecast /
            totalTarget
          ) * 100

        )

      )

      :

      0;

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">

          <h1 className="text-3xl text-white font-bold">

            Loading Strategic Planning Center...

          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8 px-6">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-10 shadow-2xl">

          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full mb-5">

                <Brain size={18} />

                Strategic Planning Center

              </div>

              <h1 className="text-5xl font-bold text-white">

                AI Strategic Planning Command Center

              </h1>

              <p className="text-slate-300 mt-4 text-lg max-w-3xl">

                Create growth strategies, compare targets
                against forecasts and receive AI-powered
                business recommendations.

              </p>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">

                <p className="text-slate-300">

                  Strategic Alignment

                </p>

                <h2 className="text-6xl font-bold text-cyan-400 mt-2">

                  {alignmentScore}%

                </h2>

              </div>

            </div>

          </div>

        </div>

                {/* EXECUTIVE STRATEGY METRICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Total Plans

                </p>

                <h2 className="text-5xl font-bold text-blue-950 mt-2">

                  {summary?.total_plans || 0}

                </h2>

              </div>

              <Briefcase
                size={42}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Active Plans

                </p>

                <h2 className="text-5xl font-bold text-green-600 mt-2">

                  {summary?.active_plans || 0}

                </h2>

              </div>

              <Activity
                size={42}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div>

              <p className="text-slate-500">

                Total Target

              </p>

              <h2 className="text-4xl font-bold text-indigo-600 mt-2">

                ₹{totalTarget.toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div>

              <p className="text-slate-500">

                Total Forecast

              </p>

              <h2 className="text-4xl font-bold text-cyan-600 mt-2">

                ₹{totalForecast.toLocaleString()}
              </h2>

            </div>

          </div>

        </div>

        {/* STRATEGIC ALIGNMENT METER */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <Target
              size={28}
              className="text-indigo-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Strategic Alignment Meter

            </h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div>

              <p className="text-slate-500">

                Total Target Value

              </p>

              <h3 className="text-4xl font-bold text-blue-950 mt-3">

                ₹{totalTarget.toLocaleString()}
              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Forecast Value

              </p>

              <h3 className="text-4xl font-bold text-cyan-600 mt-3">

                ₹{totalForecast.toLocaleString()}
              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Alignment Score

              </p>

              <h3 className="text-4xl font-bold text-green-600 mt-3">

                {alignmentScore}%

              </h3>

            </div>

          </div>

          <div className="mt-8">

            <div className="w-full h-6 bg-slate-200 rounded-full overflow-hidden">

              <div

                className="
                  h-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-cyan-500
                  transition-all
                  duration-700
                "

                style={{
                  width: `${alignmentScore}%`
                }}

              />

            </div>

          </div>

        </div>

        {/* AI STRATEGY PLANNER */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Plus
                size={28}
                className="text-indigo-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                AI Strategy Planner

              </h2>

            </div>

            {

              message && (

                <div className="
                  mb-6
                  bg-green-100
                  border
                  border-green-300
                  text-green-700
                  px-5
                  py-4
                  rounded-2xl
                ">

                  {message}

                </div>

              )

            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input

                type="text"

                name="plan_name"

                value={formData.plan_name}

                onChange={handleChange}

                placeholder="Plan Name"

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                "
              />

              <input

                type="text"

                name="planning_period"

                value={formData.planning_period}

                onChange={handleChange}

                placeholder="Planning Period"

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                "
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              <input

                type="number"

                name="target_value"

                value={formData.target_value}

                onChange={handleChange}

                placeholder="Target Value"

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                "
              />

              <input

                type="number"

                name="forecast_value"

                value={formData.forecast_value}

                onChange={handleChange}

                placeholder="Forecast Value"

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                "
              />

            </div>

            <button

              onClick={createPlan}

              className="
                mt-8
                bg-gradient-to-r
                from-indigo-600
                to-cyan-600
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
              "
            >

              Create Strategic Plan

            </button>

          </div>

          {/* AI INSIGHT PANEL */}

          <div className="space-y-6">

            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-[30px] p-8 text-white shadow-xl">

              <Brain size={42} />

              <h3 className="text-2xl font-bold mt-5">

                AI Recommendations

              </h3>

              <p className="mt-3 text-indigo-100">

                The system automatically generates
                recommendations based on forecast
                and target variance.

              </p>

            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

              <h3 className="font-bold text-xl text-blue-950 mb-5">

                Strategy Health

              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Alignment</span>

                  <span className="font-bold">

                    {alignmentScore}%
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Total Plans</span>

                  <span className="font-bold">

                    {summary?.total_plans || 0}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Active Plans</span>

                  <span className="font-bold text-green-600">

                    {summary?.active_plans || 0}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-6 shadow-xl">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input

              type="text"

              placeholder="Search Plan Name or Planning Period..."

              value={searchTerm}

              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }

              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-2xl
                border
                border-slate-300
              "
            />

          </div>

        </div>

                {/* STRATEGIC PORTFOLIO */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3
              size={28}
              className="text-indigo-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Strategic Portfolio

            </h2>

          </div>

          {

            filteredPlans.length > 0 ? (

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                  filteredPlans.map(

                    (plan) => {

                      const variance =
                        Number(plan.variance || 0);

                      const isOpportunity =
                        variance > 0;

                      const isRisk =
                        variance < 0;

                      return (

                        <div

                          key={plan.id}

                          className="
                            bg-gradient-to-br
                            from-white
                            to-slate-50
                            border
                            border-slate-200
                            rounded-[30px]
                            p-7
                            shadow-lg
                            hover:shadow-2xl
                            transition-all
                          "
                        >

                          <div className="flex justify-between items-start">

                            <div>

                              <h3 className="text-xl font-bold text-blue-950">

                                {plan.plan_name}

                              </h3>

                              <p className="text-slate-500 mt-2">

                                {plan.planning_period}

                              </p>

                            </div>

                            <span className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-full text-sm font-semibold">

                              #{plan.id}

                            </span>

                          </div>

                          <div className="mt-6 space-y-4">

                            <div className="flex justify-between">

                              <span className="text-slate-500">

                                Target

                              </span>

                              <span className="font-bold">

                                ₹{Number(plan.target_value).toLocaleString()}
                              </span>

                            </div>

                            <div className="flex justify-between">

                              <span className="text-slate-500">

                                Forecast

                              </span>

                              <span className="font-bold text-cyan-600">

                                ₹{Number(plan.forecast_value).toLocaleString()}
                              </span>

                            </div>

                            <div className="flex justify-between">

                              <span className="text-slate-500">

                                Variance

                              </span>

                              <span

                                className={`font-bold ${
                                  variance > 0
                                    ? "text-green-600"
                                    : variance < 0
                                    ? "text-red-600"
                                    : "text-blue-600"
                                }`}
                              >

                                ₹{variance.toLocaleString()}

                              </span>

                            </div>

                          </div>

                          {/* RECOMMENDATION */}

                          <div className="mt-6">

                            <p className="text-sm text-slate-500 mb-2">

                              AI Recommendation

                            </p>

                            <div className="bg-slate-100 rounded-2xl p-4">

                              <p className="text-sm">

                                {plan.recommendation}

                              </p>

                            </div>

                          </div>

                          {/* RISK MATRIX */}

                          <div className="mt-6">

                            {

                              isOpportunity ? (

                                <div className="bg-green-100 text-green-700 rounded-2xl p-3 text-center font-semibold">

                                  🟢 Growth Opportunity

                                </div>

                              ) : isRisk ? (

                                <div className="bg-red-100 text-red-700 rounded-2xl p-3 text-center font-semibold">

                                  🔴 Strategic Risk

                                </div>

                              ) : (

                                <div className="bg-blue-100 text-blue-700 rounded-2xl p-3 text-center font-semibold">

                                  🔵 Stable Alignment

                                </div>

                              )

                            }

                          </div>

                          {/* STATUS */}

                          <div className="mt-5 flex justify-between items-center">

                            <span className="text-sm text-slate-500">

                              Status

                            </span>

                            <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-semibold">

                              {plan.status}
                            </span>

                          </div>

                        </div>

                      );

                    }

                  )

                }

              </div>

            ) : (

              <div className="text-center py-20">

                <Target
                  size={80}
                  className="mx-auto text-slate-300"
                />

                <h3 className="text-2xl font-bold text-slate-500 mt-6">

                  No Strategic Plans Found

                </h3>

                <p className="text-slate-400 mt-3">

                  Create your first strategic plan to begin forecasting-driven planning.

                </p>

              </div>

            )

          }

        </div>

      </div>

    </MainLayout>

  );

};

export default StrategicPlanning;