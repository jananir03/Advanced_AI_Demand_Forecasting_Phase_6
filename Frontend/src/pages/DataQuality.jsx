import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  ShieldCheck,
  Database,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Search,
  Plus,
  Brain
} from "lucide-react";

const DataQuality = () => {

  const [reports, setReports] =
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

      dataset_name: "",

      total_records: "",

      valid_records: "",

      missing_records: "",

      duplicate_records: ""

    });

  useEffect(() => {

    loadReports();

    loadSummary();

  }, []);

  const loadReports =
    async () => {

      try {

        const response =
          await API.get(
            "/data-quality/"
          );

        setReports(
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
            "/data-quality/stats/summary"
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

  const createQualityReport =
    async () => {

      try {

        await API.post(

          "/data-quality/",

          {

            dataset_name:
              formData.dataset_name,

            total_records:
              Number(
                formData.total_records
              ),

            valid_records:
              Number(
                formData.valid_records
              ),

            missing_records:
              Number(
                formData.missing_records
              ),

            duplicate_records:
              Number(
                formData.duplicate_records
              )

          }

        );

        setMessage(
          "✅ Quality Report Generated Successfully"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          dataset_name: "",

          total_records: "",

          valid_records: "",

          missing_records: "",

          duplicate_records: ""

        });

        loadReports();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate quality report"
        );

      }

    };

  const filteredReports =
    reports.filter(

      (report) =>

        report.dataset_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    );

  const healthScore =

    summary?.average_quality_score || 0;

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">

          <h1 className="text-3xl text-white font-bold">

            Loading Data Quality Center...

          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8 px-6">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 p-10 shadow-2xl">

          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full mb-5">

                <ShieldCheck size={18} />

                Data Quality Intelligence Center

              </div>

              <h1 className="text-5xl font-bold text-white">

                Dataset Health Monitoring

              </h1>

              <p className="text-slate-300 mt-4 text-lg max-w-3xl">

                Analyze data quality, detect missing
                records, monitor duplicates and
                ensure forecasting reliability.

              </p>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">

                <p className="text-slate-300">

                  Overall Data Health

                </p>

                <h2 className="text-6xl font-bold text-cyan-400 mt-2">

                  {healthScore}%

                </h2>

              </div>

            </div>

          </div>

        </div>

                {/* DATA QUALITY METRICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Total Reports

                </p>

                <h2 className="text-5xl font-bold text-blue-950 mt-2">

                  {summary?.total_reports || 0}

                </h2>

              </div>

              <Database
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

              <CheckCircle2
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

        {/* QUALITY HEALTH METER */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <ShieldCheck
              size={28}
              className="text-cyan-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Dataset Health Meter

            </h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            <div>

              <p className="text-slate-500">

                Average Quality Score

              </p>

              <h3 className="text-4xl font-bold text-cyan-600 mt-3">

                {healthScore}%

              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Excellent Reports

              </p>

              <h3 className="text-4xl font-bold text-green-600 mt-3">

                {summary?.excellent || 0}

              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Warning Reports

              </p>

              <h3 className="text-4xl font-bold text-yellow-500 mt-3">

                {summary?.warning || 0}

              </h3>

            </div>

            <div>

              <p className="text-slate-500">

                Critical Reports

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
                  from-cyan-500
                  to-blue-600
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

        {/* DATASET QUALITY SCANNER */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Plus
                size={28}
                className="text-cyan-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Dataset Quality Scanner

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

                name="dataset_name"

                value={formData.dataset_name}

                onChange={handleChange}

                placeholder="Dataset Name"

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

                name="total_records"

                value={formData.total_records}

                onChange={handleChange}

                placeholder="Total Records"

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                "
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

              <input

                type="number"

                name="valid_records"

                value={formData.valid_records}

                onChange={handleChange}

                placeholder="Valid Records"

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

                name="missing_records"

                value={formData.missing_records}

                onChange={handleChange}

                placeholder="Missing Records"

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

                name="duplicate_records"

                value={formData.duplicate_records}

                onChange={handleChange}

                placeholder="Duplicate Records"

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

              onClick={createQualityReport}

              className="
                mt-8
                bg-gradient-to-r
                from-cyan-600
                to-blue-600
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
              "
            >

              Generate Quality Report

            </button>

          </div>

          {/* AI VALIDATION INSIGHTS */}

          <div className="space-y-6">

            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-[30px] p-8 text-white shadow-xl">

              <Brain size={42} />

              <h3 className="text-2xl font-bold mt-5">

                Validation Intelligence

              </h3>

              <p className="mt-3 text-cyan-100">

                Data quality score is automatically
                calculated using valid records,
                missing values and duplicate detection.

              </p>

            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

              <h3 className="font-bold text-xl text-blue-950 mb-5">

                Quality Summary

              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Health Score</span>

                  <span className="font-bold">

                    {healthScore}%
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Total Reports</span>

                  <span className="font-bold">

                    {summary?.total_reports || 0}
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

              placeholder="Search Dataset Name..."

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

                {/* DATASET HEALTH CARDS */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <Database
              size={28}
              className="text-cyan-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Dataset Health Dashboard

            </h2>

          </div>

          {

            filteredReports.length > 0 ? (

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                  filteredReports.map((report) => (

                    <div

                      key={report.id}

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

                            {report.dataset_name}

                          </h3>

                          <p className="text-slate-500 mt-2">

                            Dataset Quality Report

                          </p>

                        </div>

                        <span className="bg-cyan-100 text-cyan-700 px-3 py-2 rounded-full text-sm font-semibold">

                          {report.quality_score}%

                        </span>

                      </div>

                      <div className="mt-6 space-y-4">

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Total Records

                          </span>

                          <span className="font-bold">

                            {report.total_records}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Valid Records

                          </span>

                          <span className="font-bold text-green-600">

                            {report.valid_records}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Missing Records

                          </span>

                          <span className="font-bold text-yellow-600">

                            {report.missing_records}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-slate-500">

                            Duplicate Records

                          </span>

                          <span className="font-bold text-red-600">

                            {report.duplicate_records}
                          </span>

                        </div>

                      </div>

                      <div className="mt-6">

                        {

                          report.quality_status === "excellent"

                          ? (

                            <div className="bg-green-100 text-green-700 rounded-2xl p-3 text-center font-semibold">

                              🟢 Excellent Quality

                            </div>

                          )

                          : report.quality_status === "good"

                          ? (

                            <div className="bg-blue-100 text-blue-700 rounded-2xl p-3 text-center font-semibold">

                              🔵 Good Quality

                            </div>

                          )

                          : report.quality_status === "warning"

                          ? (

                            <div className="bg-yellow-100 text-yellow-700 rounded-2xl p-3 text-center font-semibold">

                              🟡 Warning Quality

                            </div>

                          )

                          : (

                            <div className="bg-red-100 text-red-700 rounded-2xl p-3 text-center font-semibold">

                              🔴 Critical Quality

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

                <Database
                  size={80}
                  className="mx-auto text-slate-300"
                />

                <h3 className="text-2xl font-bold text-slate-500 mt-6">

                  No Quality Reports Found

                </h3>

                <p className="text-slate-400 mt-3">

                  Generate your first quality report to begin monitoring data health.

                </p>

              </div>

            )

          }

        </div>

        {/* QUALITY RISK CENTER */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle
                size={28}
                className="text-red-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Quality Risk Center

              </h2>

            </div>

            <div className="space-y-4">

              {

                filteredReports

                  .filter(

                    (report) =>

                      report.quality_status === "warning" ||

                      report.quality_status === "critical"

                  )

                  .map((report) => (

                    <div

                      key={report.id}

                      className="
                        border
                        border-slate-200
                        rounded-2xl
                        p-5
                      "
                    >

                      <div className="flex justify-between">

                        <span className="font-semibold">

                          {report.dataset_name}

                        </span>

                        <span className="text-red-600 font-bold">

                          {report.quality_score}%

                        </span>

                      </div>

                    </div>

                  ))

              }

            </div>

          </div>

          {/* VALIDATION SUMMARY */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Brain
                size={28}
                className="text-cyan-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Validation Insights

              </h2>

            </div>

            <div className="space-y-5">

              {

                filteredReports
                  .slice(0, 5)
                  .map((report) => (

                    <div

                      key={`summary-${report.id}`}

                      className="
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-2xl
                        p-5
                      "
                    >

                      <h3 className="font-bold text-blue-950">

                        {report.dataset_name}

                      </h3>

                      <p className="text-slate-600 mt-2">

                        {report.validation_summary}
                      </p>

                    </div>

                  ))

              }

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default DataQuality;