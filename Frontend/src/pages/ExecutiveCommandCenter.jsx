import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  Building2,
  Briefcase,
  Brain,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Crown,
  TrendingUp,
  Workflow
} from "lucide-react";

const ExecutiveCommandCenter = () => {

  const [dashboard,
    setDashboard] =
    useState(null);

  const [health,
    setHealth] =
    useState(null);

  const [alerts,
    setAlerts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

    loadHealth();

    loadAlerts();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const response =
          await API.get(

            "/executive-command-center/dashboard"

          );

        setDashboard(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const loadHealth =
    async () => {

      try {

        const response =
          await API.get(

            "/executive-command-center/business-health"

          );

        setHealth(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const loadAlerts =
    async () => {

      try {

        const response =
          await API.get(

            "/executive-command-center/executive-alerts"

          );

        setAlerts(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">

          <h1 className="text-3xl font-bold">

            Loading Executive Command Center...

          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8 px-6">

        {/* CEO HERO */}

        <div className="
          relative
          overflow-hidden
          rounded-[45px]
          bg-gradient-to-r
          from-slate-950
          via-indigo-950
          to-slate-950
          p-12
          shadow-2xl
        ">

          <div className="
            absolute
            top-0
            right-0
            w-[450px]
            h-[450px]
            bg-cyan-500/10
            rounded-full
            blur-3xl
          " />

          <div className="
            absolute
            bottom-0
            left-0
            w-[350px]
            h-[350px]
            bg-purple-500/10
            rounded-full
            blur-3xl
          " />

          <div className="
            relative
            z-10
            flex
            flex-col
            xl:flex-row
            justify-between
            items-center
          ">

            <div>

              <div className="
                inline-flex
                items-center
                gap-2
                bg-yellow-500/20
                text-yellow-300
                px-5
                py-3
                rounded-full
                mb-6
              ">

                <Crown size={20} />

                Executive Command Center

              </div>

              <h1 className="
                text-6xl
                font-bold
                text-white
                leading-tight
              ">

                AI Demand Forecasting

                <br />

                Enterprise Control Tower

              </h1>

              <p className="
                text-slate-300
                text-lg
                mt-5
                max-w-4xl
              ">

                Unified executive visibility across
                organizations, projects, forecasts,
                approvals, workflows, KPI performance
                and enterprise data quality.

              </p>

            </div>

            <div className="mt-10 xl:mt-0">

              <div className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                rounded-[35px]
                p-8
                text-center
                min-w-[260px]
              ">

                <p className="text-slate-300">

                  Business Health

                </p>

                <h2 className="
                  text-5xl
                  font-bold
                  mt-3
                  text-cyan-400
                ">

                  {

                    health?.business_health ||

                    "Good"

                  }

                </h2>

                <p className="
                  text-slate-400
                  mt-3
                ">

                  Quality Score

                </p>

                <h3 className="
                  text-3xl
                  font-bold
                  text-white
                  mt-2
                ">

                  {

                    health?.quality_score ||

                    0

                  }%

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* EXECUTIVE HEALTH STRIP */}

        <div className="
          bg-white
          rounded-[35px]
          p-8
          shadow-xl
        ">

          <div className="
            flex
            flex-wrap
            gap-8
            justify-between
            items-center
          ">

            <div>

              <p className="text-slate-500">

                Executive Alerts

              </p>

              <h2 className="
                text-4xl
                font-bold
                text-red-600
              ">

                {alerts.length}

              </h2>

            </div>

            <div>

              <p className="text-slate-500">

                KPI Score

              </p>

              <h2 className="
                text-4xl
                font-bold
                text-green-600
              ">

                {

                  dashboard?.average_kpi_score ||

                  0

                }

              </h2>

            </div>

            <div>

              <p className="text-slate-500">

                Data Quality

              </p>

              <h2 className="
                text-4xl
                font-bold
                text-cyan-600
              ">

                {

                  dashboard?.average_data_quality ||

                  0

                }%

              </h2>

            </div>

            <div>

              <p className="text-slate-500">

                Active Workflows

              </p>

              <h2 className="
                text-4xl
                font-bold
                text-orange-600
              ">

                {

                  dashboard?.active_workflows ||

                  0

                }

              </h2>

            </div>

          </div>

        </div>

                {/* ENTERPRISE SNAPSHOT */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-white rounded-[30px] p-8 shadow-xl border-l-4 border-blue-500">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Organizations

                </p>

                <h2 className="text-5xl font-bold text-blue-950 mt-2">

                  {dashboard?.organizations || 0}

                </h2>

              </div>

              <Building2
                size={45}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border-l-4 border-purple-500">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Projects

                </p>

                <h2 className="text-5xl font-bold text-purple-600 mt-2">

                  {dashboard?.projects || 0}

                </h2>

              </div>

              <Briefcase
                size={45}
                className="text-purple-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border-l-4 border-cyan-500">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Forecasts

                </p>

                <h2 className="text-5xl font-bold text-cyan-600 mt-2">

                  {dashboard?.forecasts || 0}

                </h2>

              </div>

              <TrendingUp
                size={45}
                className="text-cyan-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border-l-4 border-green-500">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Approved Forecasts

                </p>

                <h2 className="text-5xl font-bold text-green-600 mt-2">

                  {dashboard?.approved_forecasts || 0}

                </h2>

              </div>

              <ShieldCheck
                size={45}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border-l-4 border-orange-500">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Active Workflows

                </p>

                <h2 className="text-5xl font-bold text-orange-600 mt-2">

                  {dashboard?.active_workflows || 0}

                </h2>

              </div>

              <Workflow
                size={45}
                className="text-orange-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border-l-4 border-red-500">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Executive Alerts

                </p>

                <h2 className="text-5xl font-bold text-red-600 mt-2">

                  {dashboard?.executive_alerts || 0}

                </h2>

              </div>

              <AlertTriangle
                size={45}
                className="text-red-600"
              />

            </div>

          </div>

        </div>

        {/* EXECUTIVE INTELLIGENCE GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="
            bg-gradient-to-br
            from-indigo-600
            to-purple-700
            rounded-[35px]
            p-10
            text-white
            shadow-2xl
          ">

            <div className="flex items-center gap-3 mb-6">

              <Brain size={30} />

              <h2 className="text-3xl font-bold">

                Executive Intelligence

              </h2>

            </div>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span className="text-indigo-100">

                  KPI Performance Score

                </span>

                <span className="font-bold text-2xl">

                  {dashboard?.average_kpi_score || 0}

                </span>

              </div>

              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">

                <div

                  className="h-full bg-white"

                  style={{
                    width: `${Math.min(
                      dashboard?.average_kpi_score || 0,
                      100
                    )}%`
                  }}

                />

              </div>

              <div className="flex justify-between">

                <span className="text-indigo-100">

                  Enterprise Data Quality

                </span>

                <span className="font-bold text-2xl">

                  {dashboard?.average_data_quality || 0}%

                </span>

              </div>

              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">

                <div

                  className="h-full bg-cyan-300"

                  style={{
                    width: `${dashboard?.average_data_quality || 0}%`
                  }}

                />

              </div>

            </div>

          </div>

          <div className="
            bg-white
            rounded-[35px]
            p-10
            shadow-xl
          ">

            <div className="flex items-center gap-3 mb-8">

              <Activity
                size={30}
                className="text-indigo-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Executive Overview

              </h2>

            </div>

            <div className="grid grid-cols-2 gap-6">

              <div className="
                bg-slate-50
                rounded-3xl
                p-6
                text-center
              ">

                <h3 className="text-slate-500">

                  KPI Records

                </h3>

                <p className="
                  text-4xl
                  font-bold
                  text-green-600
                  mt-3
                ">

                  {dashboard?.total_kpis || 0}

                </p>

              </div>

              <div className="
                bg-slate-50
                rounded-3xl
                p-6
                text-center
              ">

                <h3 className="text-slate-500">

                  Forecast Approvals

                </h3>

                <p className="
                  text-4xl
                  font-bold
                  text-blue-600
                  mt-3
                ">

                  {dashboard?.approved_forecasts || 0}

                </p>

              </div>

              <div className="
                bg-slate-50
                rounded-3xl
                p-6
                text-center
              ">

                <h3 className="text-slate-500">

                  Organizations

                </h3>

                <p className="
                  text-4xl
                  font-bold
                  text-purple-600
                  mt-3
                ">

                  {dashboard?.organizations || 0}

                </p>

              </div>

              <div className="
                bg-slate-50
                rounded-3xl
                p-6
                text-center
              ">

                <h3 className="text-slate-500">

                  Workflows

                </h3>

                <p className="
                  text-4xl
                  font-bold
                  text-orange-600
                  mt-3
                ">

                  {dashboard?.active_workflows || 0}

                </p>

              </div>

            </div>

          </div>

        </div>

                {/* BUSINESS HEALTH COMMAND CENTER */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="
            xl:col-span-2
            bg-gradient-to-br
            from-emerald-600
            via-teal-600
            to-cyan-700
            rounded-[40px]
            p-10
            text-white
            shadow-2xl
          ">

            <div className="flex items-center justify-between">

              <div>

                <div className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  px-4
                  py-2
                  rounded-full
                  mb-5
                ">

                  <ShieldCheck size={18} />

                  Enterprise Health Monitor

                </div>

                <h2 className="
                  text-5xl
                  font-bold
                ">

                  {

                    dashboard?.business_health ||

                    "Good"

                  }

                </h2>

                <p className="
                  mt-4
                  text-emerald-100
                  text-lg
                ">

                  Overall business performance
                  calculated from KPI scores,
                  workflow execution and
                  enterprise data quality.

                </p>

              </div>

              <div className="
                w-40
                h-40
                rounded-full
                border-[12px]
                border-white/20
                flex
                items-center
                justify-center
                text-center
              ">

                <div>

                  <h3 className="
                    text-4xl
                    font-bold
                  ">

                    {

                      health?.quality_score ||

                      0

                    }

                  </h3>

                  <p className="text-sm">

                    Score

                  </p>

                </div>

              </div>

            </div>

            <div className="mt-10">

              <div className="
                w-full
                h-5
                bg-white/20
                rounded-full
                overflow-hidden
              ">

                <div

                  className="
                    h-full
                    bg-white
                  "

                  style={{
                    width: `${health?.quality_score || 0}%`
                  }}

                />

              </div>

            </div>

          </div>

          {/* EXECUTIVE SCORECARD */}

          <div className="
            bg-white
            rounded-[40px]
            p-8
            shadow-xl
          ">

            <h2 className="
              text-2xl
              font-bold
              text-blue-950
              mb-8
            ">

              Executive Scorecard

            </h2>

            <div className="space-y-6">

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <span>

                    Forecast Governance

                  </span>

                  <span className="font-bold">

                    92%

                  </span>

                </div>

                <div className="
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                ">

                  <div className="
                    h-full
                    bg-blue-600
                    w-[92%]
                  " />

                </div>

              </div>

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <span>

                    Workflow Automation

                  </span>

                  <span className="font-bold">

                    88%

                  </span>

                </div>

                <div className="
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                ">

                  <div className="
                    h-full
                    bg-orange-500
                    w-[88%]
                  " />

                </div>

              </div>

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <span>

                    KPI Performance

                  </span>

                  <span className="font-bold">

                    {

                      Math.min(
                        dashboard?.average_kpi_score || 0,
                        100
                      )

                    }%

                  </span>

                </div>

                <div className="
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                ">

                  <div

                    className="
                      h-full
                      bg-green-500
                    "

                    style={{
                      width: `${Math.min(
                        dashboard?.average_kpi_score || 0,
                        100
                      )}%`
                    }}

                  />

                </div>

              </div>

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <span>

                    Data Quality

                  </span>

                  <span className="font-bold">

                    {

                      dashboard?.average_data_quality ||

                      0

                    }%

                  </span>

                </div>

                <div className="
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                ">

                  <div

                    className="
                      h-full
                      bg-cyan-500
                    "

                    style={{
                      width: `${dashboard?.average_data_quality || 0}%`
                    }}

                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EXECUTIVE PERFORMANCE MATRIX */}

        <div className="
          bg-white
          rounded-[40px]
          p-10
          shadow-xl
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-8
          ">

            <Crown
              size={30}
              className="text-yellow-500"
            />

            <h2 className="
              text-3xl
              font-bold
              text-blue-950
            ">

              Executive Performance Matrix

            </h2>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          ">

            <div className="
              bg-blue-50
              rounded-[30px]
              p-8
              text-center
            ">

              <TrendingUp
                size={40}
                className="
                  mx-auto
                  text-blue-600
                "
              />

              <h3 className="
                text-4xl
                font-bold
                text-blue-600
                mt-4
              ">

                {

                  dashboard?.forecasts > 0

                  ?

                  Math.round(

                    (
                      dashboard.approved_forecasts /
                      dashboard.forecasts
                    ) * 100

                  )

                  :

                  0

                }%

              </h3>

              <p className="
                text-slate-600
                mt-2
              ">

                Approval Rate

              </p>

            </div>

            <div className="
              bg-green-50
              rounded-[30px]
              p-8
              text-center
            ">

              <Brain
                size={40}
                className="
                  mx-auto
                  text-green-600
                "
              />

              <h3 className="
                text-4xl
                font-bold
                text-green-600
                mt-4
              ">

                {

                  dashboard?.average_kpi_score ||

                  0

                }

              </h3>

              <p className="
                text-slate-600
                mt-2
              ">

                KPI Index

              </p>

            </div>

            <div className="
              bg-cyan-50
              rounded-[30px]
              p-8
              text-center
            ">

              <ShieldCheck
                size={40}
                className="
                  mx-auto
                  text-cyan-600
                "
              />

              <h3 className="
                text-4xl
                font-bold
                text-cyan-600
                mt-4
              ">

                {

                  dashboard?.average_data_quality ||

                  0

                }%

              </h3>

              <p className="
                text-slate-600
                mt-2
              ">

                Data Quality

              </p>

            </div>

            <div className="
              bg-orange-50
              rounded-[30px]
              p-8
              text-center
            ">

              <Workflow
                size={40}
                className="
                  mx-auto
                  text-orange-600
                "
              />

              <h3 className="
                text-4xl
                font-bold
                text-orange-600
                mt-4
              ">

                {

                  dashboard?.active_workflows ||

                  0

                }

              </h3>

              <p className="
                text-slate-600
                mt-2
              ">

                Active Workflows

              </p>

            </div>

          </div>

        </div>

                {/* ORGANIZATION LEADERBOARD */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="
            bg-white
            rounded-[40px]
            p-10
            shadow-xl
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-8
            ">

              <Building2
                size={30}
                className="text-indigo-600"
              />

              <h2 className="
                text-3xl
                font-bold
                text-blue-950
              ">

                Organization Leaderboard

              </h2>

            </div>

            <div className="space-y-4">

              <div className="
                flex
                justify-between
                items-center
                bg-yellow-50
                rounded-3xl
                p-5
              ">

                <div>

                  <h3 className="font-bold">

                    Enterprise Alpha

                  </h3>

                  <p className="text-slate-500">

                    Premium Performance

                  </p>

                </div>

                <span className="
                  text-2xl
                  font-bold
                  text-yellow-600
                ">

                  🥇

                </span>

              </div>

              <div className="
                flex
                justify-between
                items-center
                bg-slate-50
                rounded-3xl
                p-5
              ">

                <div>

                  <h3 className="font-bold">

                    Global Retail Corp

                  </h3>

                  <p className="text-slate-500">

                    Strong Forecast Accuracy

                  </p>

                </div>

                <span className="
                  text-2xl
                  font-bold
                ">

                  🥈

                </span>

              </div>

              <div className="
                flex
                justify-between
                items-center
                bg-orange-50
                rounded-3xl
                p-5
              ">

                <div>

                  <h3 className="font-bold">

                    Smart Inventory Ltd

                  </h3>

                  <p className="text-slate-500">

                    Improving Performance

                  </p>

                </div>

                <span className="
                  text-2xl
                  font-bold
                ">

                  🥉

                </span>

              </div>

            </div>

          </div>

          {/* EXECUTIVE ALERT CENTER */}

          <div className="
            bg-gradient-to-br
            from-red-600
            to-rose-700
            rounded-[40px]
            p-10
            text-white
            shadow-2xl
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-8
            ">

              <AlertTriangle size={30} />

              <h2 className="
                text-3xl
                font-bold
              ">

                Executive Alert Center

              </h2>

            </div>

            {

              alerts.length > 0

              ?

              <div className="space-y-4">

                {

                  alerts.map(

                    (alert, index) => (

                      <div
                        key={index}
                        className="
                            bg-white/10
                            border
                            border-white/10
                            rounded-2xl
                            p-5
                        "
                        >

                        <p className="font-semibold">

                            {alert.dataset_name}

                        </p>

                        <p className="mt-2 text-red-100">

                            Quality Score:
                            {" "}
                            {alert.quality_score}%

                        </p>

                        <p className="text-red-100">

                            Status:
                            {" "}
                            {alert.quality_status}

                        </p>

                        </div>

                    )

                  )

                }

              </div>

              :

              <div className="
                text-center
                py-10
              ">

                <ShieldCheck
                  size={60}
                  className="mx-auto"
                />

                <p className="
                  mt-4
                  text-red-100
                ">

                  No critical alerts detected

                </p>

              </div>

            }

          </div>

        </div>

        {/* AI EXECUTIVE RECOMMENDATIONS */}

        <div className="
          bg-slate-900
          rounded-[40px]
          p-10
          shadow-2xl
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-8
          ">

            <Brain
              size={30}
              className="text-cyan-400"
            />

            <h2 className="
              text-3xl
              font-bold
              text-white
            ">

              AI Executive Recommendations

            </h2>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          ">

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            ">

              <h3 className="
                text-cyan-400
                font-bold
                text-lg
              ">

                Forecast Optimization

              </h3>

              <p className="
                text-slate-300
                mt-3
              ">

                Increase forecast approval rate by
                implementing automated review rules
                and governance checkpoints.

              </p>

            </div>

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            ">

              <h3 className="
                text-green-400
                font-bold
                text-lg
              ">

                KPI Improvement

              </h3>

              <p className="
                text-slate-300
                mt-3
              ">

                Monitor low-performing KPI categories
                and prioritize strategic planning
                initiatives.

              </p>

            </div>

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            ">

              <h3 className="
                text-orange-400
                font-bold
                text-lg
              ">

                Workflow Efficiency

              </h3>

              <p className="
                text-slate-300
                mt-3
              ">

                Expand workflow automation coverage
                to reduce manual approval effort and
                accelerate decision making.

              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default ExecutiveCommandCenter;