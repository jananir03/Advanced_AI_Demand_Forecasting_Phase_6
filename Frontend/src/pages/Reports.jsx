import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {

  useEffect,

  useState

} from "react";

import {

  FileText,

  TrendingUp,

  BarChart3,

  Calendar,

  Download,

  ClipboardList,

  Target

} from "lucide-react";

const Reports = () => {

  const [

    executiveSummary,

    setExecutiveSummary

  ] = useState(null);

  const [

    revenueOutlook,

    setRevenueOutlook

  ] = useState(null);

  const [

    demandOutlook,

    setDemandOutlook

  ] = useState(null);

  const [

    monthlyForecast,

    setMonthlyForecast

  ] = useState(null);

  const [

    scheduledReports,

    setScheduledReports

  ] = useState([]);

  const [

    searchTerm,

    setSearchTerm

  ] = useState("");


  // -----------------------------------
  // Load Executive Reports
  // -----------------------------------

  useEffect(() => {

    loadExecutiveReports();

  }, []);


  const loadExecutiveReports =
    async () => {

      try {

        const [

          summaryRes,

          revenueRes,

          demandRes,

          monthlyRes,

          scheduleRes

        ] = await Promise.all([

          API.get(

            "/executive-reporting/executive-summary"

          ),

          API.get(

            "/executive-reporting/revenue-outlook"

          ),

          API.get(

            "/executive-reporting/demand-outlook"

          ),

          API.get(

            "/executive-reporting/monthly-forecast-report"

          ),

          API.get(

            "/executive-reporting/scheduled-reports"

          )

        ]);


        setExecutiveSummary(

          summaryRes.data

        );

        setRevenueOutlook(

          revenueRes.data

        );

        setDemandOutlook(

          demandRes.data

        );

        setMonthlyForecast(

          monthlyRes.data

        );

        setScheduledReports(

          scheduleRes.data

        );

      }

      catch (error) {

        console.log(error);

      }

    };

    const downloadExecutivePDF = async () => {

      try {

        const response = await API.post(

          "/report/pdf",

          {
            revenue_predictions: [],
            forecast_predictions: [],
            top_products: []
          },

          {
            responseType: "blob"
          }
        );

        const url = window.URL.createObjectURL(
          new Blob([response.data])
        );

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "forecast_report.pdf";

        document.body.appendChild(link);

        link.click();

      } catch (error) {

        console.log(error);
      }
    };

    const downloadExecutiveExcel = async () => {

      try {

        const response = await API.post(

          "/report/excel",

          {
            revenue_predictions: [],
            forecast_predictions: [],
            top_products: []
          },

          {
            responseType: "blob"
          }
        );

        const url = window.URL.createObjectURL(
          new Blob([response.data])
        );

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "forecast_report.xlsx";

        document.body.appendChild(link);

        link.click();

      } catch (error) {

        console.log(error);
      }
    };
    const downloadScenarioPDF = async () => {

      try {

        const history =
          await API.get(
            "/scenario-analysis/history"
          );

        const latestScenario =
          history.data[0];

        const response =
          await API.get(

            `/scenario-analysis/download/pdf/${latestScenario.id}`,

            {
              responseType: "blob"
            }
          );

        const url =
          window.URL.createObjectURL(
            new Blob([response.data])
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "scenario_report.pdf";

        link.click();

      } catch (error) {

        console.log(error);
      }
    };

    const downloadScenarioExcel = async () => {

      try {

        const history =
          await API.get(
            "/scenario-analysis/history"
          );

        const latestScenario =
          history.data[0];

        const response =
          await API.get(

            `/scenario-analysis/download/excel/${latestScenario.id}`,

            {
              responseType: "blob"
            }
          );

        const url =
          window.URL.createObjectURL(
            new Blob([response.data])
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "scenario_report.xlsx";

        link.click();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <MainLayout>

      <div className="w-full px-6 space-y-10">


        {/* PAGE HEADER */}

        <div>

          <h1 className="text-6xl font-bold text-white-950">

            Executive Reporting Center

          </h1>

          <p className="text-white-600 text-xl mt-4">

            Executive insights, business outlooks, scenario analysis and strategic reporting.

          </p>

        </div>


        {/* SEARCH */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-xl p-6">

          <input

            type="text"

            placeholder="Search reports..."

            value={searchTerm}

            onChange={(e) =>

              setSearchTerm(
                e.target.value
              )
            }

            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* EXECUTIVE CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                  {/* EXECUTIVE SUMMARY */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/50">

            <div className="flex items-center justify-between">

              <FileText
                size={42}
                className="text-blue-600"
              />

              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-2 rounded-full">

                Executive

              </span>

            </div>

            <h3 className="text-2xl font-bold text-blue-950 mt-6">

              Executive Summary

            </h3>

            <p className="text-slate-600 mt-4 leading-relaxed">

              {

                executiveSummary?.summary ||

                "Loading executive summary..."

              }

            </p>

          </div>


          {/* REVENUE OUTLOOK */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/50">

            <div className="flex items-center justify-between">

              <TrendingUp
                size={42}
                className="text-green-600"
              />

              <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-2 rounded-full">

                Revenue

              </span>

            </div>

            <h3 className="text-2xl font-bold text-blue-950 mt-6">

              Revenue Outlook

            </h3>

            <p className="text-4xl font-bold text-green-600 mt-5">

              {

                revenueOutlook?.expected_growth ||

                "--"

              }

            </p>

            <p className="text-slate-600 mt-4">

              {

                revenueOutlook?.recommendation ||

                "Loading recommendation..."

              }

            </p>

          </div>


          {/* DEMAND OUTLOOK */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/50">

            <div className="flex items-center justify-between">

              <BarChart3
                size={42}
                className="text-purple-600"
              />

              <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-2 rounded-full">

                Demand

              </span>

            </div>

            <h3 className="text-2xl font-bold text-blue-950 mt-6">

              Demand Outlook

            </h3>

            <p className="text-3xl font-bold text-purple-600 mt-5">

              {

                demandOutlook?.expected_demand ||

                "--"

              }

            </p>

            <p className="text-slate-600 mt-4">

              Confidence:

              {" "}

              {

                demandOutlook?.forecast_confidence ||

                "--"

              }

            </p>

          </div>


          {/* MONTHLY FORECAST */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/50">

            <div className="flex items-center justify-between">

              <Calendar
                size={42}
                className="text-orange-600"
              />

              <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-2 rounded-full">

                Monthly

              </span>

            </div>

            <h3 className="text-2xl font-bold text-blue-950 mt-6">

              Monthly Forecast

            </h3>

            <p className="text-4xl font-bold text-orange-600 mt-5">

              {

                monthlyForecast?.forecast_growth ||

                "--"

              }

            </p>

            <p className="text-slate-600 mt-4">

              {

                monthlyForecast?.business_outlook ||

                "Loading..."

              }

            </p>

          </div>

        </div>


        {/* SCENARIO ANALYSIS */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

          <div className="flex items-center gap-4 mb-8">

            <Target
              size={36}
              className="text-indigo-600"
            />

            <h2 className="text-4xl font-bold text-blue-950">

              Scenario Analysis

            </h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


            {/* BEST CASE */}

            <div className="rounded-[28px] bg-green-50 border border-green-200 p-8">

              <h3 className="text-3xl font-bold text-green-700">

                Best Case

              </h3>

              <div className="mt-6 space-y-3">

                <p className="text-slate-700">

                  Revenue Growth: +25%

                </p>

                <p className="text-slate-700">

                  Demand Level: Very High

                </p>

                <p className="text-slate-700">

                  Inventory Risk: Low

                </p>

              </div>

            </div>


            {/* EXPECTED CASE */}

            <div className="rounded-[28px] bg-blue-50 border border-blue-200 p-8">

              <h3 className="text-3xl font-bold text-blue-700">

                Expected Case

              </h3>

              <div className="mt-6 space-y-3">

                <p className="text-slate-700">

                  Revenue Growth: +18%

                </p>

                <p className="text-slate-700">

                  Demand Level: Stable

                </p>

                <p className="text-slate-700">

                  Inventory Risk: Moderate

                </p>

              </div>

            </div>


            {/* WORST CASE */}

            <div className="rounded-[28px] bg-red-50 border border-red-200 p-8">

              <h3 className="text-3xl font-bold text-red-700">

                Worst Case

              </h3>

              <div className="mt-6 space-y-3">

                <p className="text-slate-700">

                  Revenue Growth: +5%

                </p>

                <p className="text-slate-700">

                  Demand Level: Low

                </p>

                <p className="text-slate-700">

                  Inventory Risk: High

                </p>

              </div>

            </div>

          </div>

        </div>
                {/* SCHEDULED REPORTS */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

          <div className="flex items-center gap-4 mb-8">

            <ClipboardList
              size={36}
              className="text-blue-600"
            />

            <h2 className="text-4xl font-bold text-blue-950">

              Scheduled Reports

            </h2>

          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-5 text-left">

                    Report Name

                  </th>

                  <th className="px-6 py-5 text-left">

                    Report Type

                  </th>

                  <th className="px-6 py-5 text-left">

                    Schedule

                  </th>

                  <th className="px-6 py-5 text-left">

                    Summary

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  scheduledReports

                    .filter((report) =>

                      report.report_name
                        ?.toLowerCase()
                        .includes(
                          searchTerm.toLowerCase()
                        )

                      ||

                      report.report_type
                        ?.toLowerCase()
                        .includes(
                          searchTerm.toLowerCase()
                        )

                    )

                    .map((report) => (

                      <tr
                        key={report.id}
                        className="border-t border-slate-200 hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          {report.report_name}

                        </td>

                        <td className="px-6 py-5">

                          {report.report_type}

                        </td>

                        <td className="px-6 py-5">

                          <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-semibold">

                            {report.schedule_type}

                          </span>

                        </td>

                        <td className="px-6 py-5">

                          {report.summary}

                        </td>

                      </tr>

                    ))

                }

              </tbody>

            </table>

          </div>

        </div>


        {/* DOWNLOAD CENTER */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

          <div className="flex items-center gap-4 mb-8">

            <Download
              size={36}
              className="text-green-600"
            />

            <h2 className="text-4xl font-bold text-blue-950">

              Download Center

            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


            {/* Executive PDF */}

            <button

              onClick={downloadExecutivePDF}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
            >

              <div className="text-2xl font-bold">

                Executive PDF

              </div>

              <div className="mt-3 text-blue-100">

                Download executive report

              </div>

            </button>


            {/* Executive Excel */}

            <button
            
              onClick={downloadExecutiveExcel}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
            >

              <div className="text-2xl font-bold">

                Executive Excel

              </div>

              <div className="mt-3 text-green-100">

                Download executive workbook

              </div>

            </button>


            {/* Scenario PDF */}

            <button

              onClick={downloadScenarioPDF}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
            >

              <div className="text-2xl font-bold">

                Scenario PDF

              </div>

              <div className="mt-3 text-purple-100">

                Best / Expected / Worst case

              </div>

            </button>


            {/* Scenario Excel */}

            <button

               onClick={downloadScenarioExcel}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
            >

              <div className="text-2xl font-bold">

                Scenario Excel

              </div>

              <div className="mt-3 text-orange-100">

                Scenario analysis workbook

              </div>

            </button>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default Reports;