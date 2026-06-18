import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  Target,
  Activity,
  AlertTriangle,
  TrendingUp,
  Brain,
  Search,
  Plus,
  BarChart3
} from "lucide-react";

const AdvancedKPI = () => {

  const [kpis, setKpis] =
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

      kpi_name: "",

      category: "",

      target_value: "",

      actual_value: "",

      forecast_value: "",

      alert_threshold: ""

    });

  useEffect(() => {

    loadKPIs();

    loadSummary();

  }, []);

  const loadKPIs =
    async () => {

      try {

        const response =
          await API.get(
            "/advanced-kpi/"
          );

        setKpis(
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
            "/advanced-kpi/stats/summary"
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

  const createKPI =
    async () => {

      try {

        await API.post(

          "/advanced-kpi/",

          {

            kpi_name:
              formData.kpi_name,

            category:
              formData.category,

            target_value:
              Number(
                formData.target_value
              ),

            actual_value:
              Number(
                formData.actual_value
              ),

            forecast_value:
              Number(
                formData.forecast_value
              ),

            alert_threshold:
              Number(
                formData.alert_threshold
              )

          }

        );

        setMessage(
          "✅ KPI Created Successfully"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          kpi_name: "",

          category: "",

          target_value: "",

          actual_value: "",

          forecast_value: "",

          alert_threshold: ""

        });

        loadKPIs();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create KPI"
        );

      }

    };

  const filteredKPIs =
    kpis.filter(

      (kpi) =>

        kpi.kpi_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        kpi.category
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    );

  const healthScore =

    summary?.total_kpis > 0

      ?

      Math.round(

        (
          summary.excellent /
          summary.total_kpis
        ) * 100

      )

      :

      0;

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">

          <h1 className="text-3xl text-white font-bold">

            Loading KPI Command Center...

          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8 px-6">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 p-10 shadow-2xl">

          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full mb-5">

                <Target size={18} />

                KPI Performance Command Center

              </div>

              <h1 className="text-5xl font-bold text-white">

                Advanced KPI Management

              </h1>

              <p className="text-slate-300 mt-4 text-lg max-w-3xl">

                Monitor business performance,
                track KPI health, identify risks
                and measure operational success.

              </p>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">

                <p className="text-slate-300">

                  KPI Health Score

                </p>

                <h2 className="text-6xl font-bold text-green-400 mt-2">

                  {healthScore}%

                </h2>

              </div>

            </div>

          </div>

        </div>

                {/* KPI EXECUTIVE METRICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Total KPIs

                </p>

                <h2 className="text-5xl font-bold text-blue-950 mt-2">

                  {summary?.total_kpis || 0}

                </h2>

              </div>

              <BarChart3
                size={42}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Excellent

                </p>

                <h2 className="text-5xl font-bold text-green-600 mt-2">

                  {summary?.excellent || 0}

                </h2>

              </div>

              <TrendingUp
                size={42}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Warning

                </p>

                <h2 className="text-5xl font-bold text-yellow-500 mt-2">

                  {summary?.warning || 0}

                </h2>

              </div>

              <Activity
                size={42}
                className="text-yellow-500"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Critical

                </p>

                <h2 className="text-5xl font-bold text-red-600 mt-2">

                  {summary?.critical || 0}

                </h2>

              </div>

              <AlertTriangle
                size={42}
                className="text-red-600"
              />

            </div>

          </div>

        </div>

        {/* KPI HEALTH METER */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <Activity
              size={28}
              className="text-green-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              KPI Performance Health Meter

            </h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div>

              <p className="text-slate-500">

                Excellent KPIs

              </p>

              <h3 className="text-4xl font-bold text-green-600 mt-3">

                {summary?.excellent || 0}

              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Warning KPIs

              </p>

              <h3 className="text-4xl font-bold text-yellow-500 mt-3">

                {summary?.warning || 0}

              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Critical KPIs

              </p>

              <h3 className="text-4xl font-bold text-red-600 mt-3">

                {summary?.critical || 0}

              </h3>

            </div>

          </div>

          <div className="mt-8">

            <div className="w-full h-6 bg-slate-200 rounded-full overflow-hidden">

              <div

                className="
                  h-full
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-600
                  transition-all
                  duration-700
                "

                style={{
                  width: `${healthScore}%`
                }}

              />

            </div>

          </div>

        </div>

        {/* KPI BUILDER */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Plus
                size={28}
                className="text-green-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                KPI Builder

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

                name="kpi_name"

                value={formData.kpi_name}

                onChange={handleChange}

                placeholder="KPI Name"

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

                name="category"

                value={formData.category}

                onChange={handleChange}

                placeholder="Category"

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

                name="actual_value"

                value={formData.actual_value}

                onChange={handleChange}

                placeholder="Actual Value"

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

              <input

                type="number"

                name="alert_threshold"

                value={formData.alert_threshold}

                onChange={handleChange}

                placeholder="Alert Threshold"

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

              onClick={createKPI}

              className="
                mt-8
                bg-gradient-to-r
                from-green-600
                to-emerald-600
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
              "
            >

              Create KPI

            </button>

          </div>

          {/* AI KPI INSIGHTS */}

          <div className="space-y-6">

            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-[30px] p-8 text-white shadow-xl">

              <Brain size={42} />

              <h3 className="text-2xl font-bold mt-5">

                KPI Intelligence

              </h3>

              <p className="mt-3 text-green-100">

                KPI status is automatically classified as
                Excellent, Warning or Critical based on
                target variance and alert thresholds.

              </p>

            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

              <h3 className="font-bold text-xl text-blue-950 mb-5">

                KPI Health Summary

              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Health Score</span>

                  <span className="font-bold">

                    {healthScore}%
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Total KPIs</span>

                  <span className="font-bold">

                    {summary?.total_kpis || 0}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Excellent</span>

                  <span className="font-bold text-green-600">

                    {summary?.excellent || 0}
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

              placeholder="Search KPI Name or Category..."

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

                {/* KPI RADAR BOARD */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3
              size={28}
              className="text-green-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              KPI Radar Board

            </h2>

          </div>

          {

            filteredKPIs.length > 0 ? (

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                  filteredKPIs.map((kpi) => (

                    <div

                      key={kpi.id}

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

                            {kpi.kpi_name}

                          </h3>

                          <p className="text-slate-500 mt-2">

                            {kpi.category}

                          </p>

                        </div>

                        <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-semibold">

                          #{kpi.id}

                        </span>

                      </div>

                      <div className="mt-6 space-y-4">

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Target

                          </span>

                          <span className="font-bold">

                            {Number(
                              kpi.target_value
                            ).toLocaleString()}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Actual

                          </span>

                          <span className="font-bold text-blue-600">

                            {Number(
                              kpi.actual_value
                            ).toLocaleString()}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Forecast

                          </span>

                          <span className="font-bold text-cyan-600">

                            {Number(
                              kpi.forecast_value
                            ).toLocaleString()}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Variance

                          </span>

                          <span

                            className={`font-bold ${
                              kpi.variance > 0
                                ? "text-green-600"
                                : kpi.variance < 0
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          >

                            {Number(
                              kpi.variance
                            ).toLocaleString()}

                          </span>

                        </div>

                      </div>

                      <div className="mt-6">

                        {

                          kpi.performance_status === "excellent"

                          ? (

                            <div className="bg-green-100 text-green-700 rounded-2xl p-3 text-center font-semibold">

                              🟢 Excellent Performance

                            </div>

                          )

                          : kpi.performance_status === "warning"

                          ? (

                            <div className="bg-yellow-100 text-yellow-700 rounded-2xl p-3 text-center font-semibold">

                              🟡 Warning Performance

                            </div>

                          )

                          : (

                            <div className="bg-red-100 text-red-700 rounded-2xl p-3 text-center font-semibold">

                              🔴 Critical Performance

                            </div>

                          )

                        }

                      </div>

                    </div>

                  ))

                }

              </div>

            ) : (

              <div className="text-center py-20">

                <Target
                  size={80}
                  className="mx-auto text-slate-300"
                />

                <h3 className="text-2xl font-bold text-slate-500 mt-6">

                  No KPIs Found

                </h3>

                <p className="text-slate-400 mt-3">

                  Create your first KPI to start performance monitoring.

                </p>

              </div>

            )

          }

        </div>

        {/* CRITICAL KPI WATCHLIST */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle
              size={28}
              className="text-red-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Critical KPI Watchlist

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-4 text-left">

                    KPI

                  </th>

                  <th className="px-6 py-4 text-left">

                    Category

                  </th>

                  <th className="px-6 py-4 text-left">

                    Variance

                  </th>

                  <th className="px-6 py-4 text-left">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredKPIs

                    .filter(

                      (kpi) =>

                        kpi.performance_status ===
                        "critical"

                    )

                    .map((kpi) => (

                      <tr
                        key={kpi.id}
                        className="border-t"
                      >

                        <td className="px-6 py-4 font-semibold">

                          {kpi.kpi_name}

                        </td>

                        <td className="px-6 py-4">

                          {kpi.category}

                        </td>

                        <td className="px-6 py-4 text-red-600 font-bold">

                          {Number(
                            kpi.variance
                          ).toLocaleString()}

                        </td>

                        <td className="px-6 py-4">

                          <span className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm">

                            Critical

                          </span>

                        </td>

                      </tr>

                    ))

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default AdvancedKPI;