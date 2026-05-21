import MainLayout from "../layouts/MainLayout";

import {

  useEffect,

  useState

} from "react";

const Reports = () => {

  const [report, setReport] =
    useState(null);

  const [searchTerm,

    setSearchTerm] =

    useState("");

  const [currentPage,

    setCurrentPage] =

    useState(1);


  const reportsPerPage = 5;

  // -----------------------------------
  // Load Forecast Report
  // -----------------------------------

  useEffect(() => {

    const savedReport =
      localStorage.getItem(
        "forecast_report"
      );

    if (savedReport) {

      setReport(

        JSON.parse(savedReport)
      );
    }

  }, []);

  // -----------------------------------
  // No Report
  // -----------------------------------

  if (!report) {

    return (

      <MainLayout>

        <div className="min-h-screen flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300">

          No Forecast Report Available

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="min-h-screen relative overflow-hidden p-8">


        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300"></div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>


        {/* Content */}

        <div className="relative z-10">


          {/* Header */}

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

            <h1 className="text-5xl font-bold text-slate-800">

              Forecast Reports

            </h1>

            <p className="text-slate-700 mt-4 text-lg">

              Live AI-powered analytics report preview.

            </p>

            <div className="mt-8 mb-10">

              <input

                type="text"

                placeholder="Search reports by date or value..."

                value={searchTerm}

                onChange={(e) =>

                  setSearchTerm(
                    e.target.value
                  )
                }

                className="w-full p-4 rounded-2xl border border-slate-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          {/* Revenue Forecast */}

          <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">

              Revenue Forecast

            </h2>

            <table className="w-full">

              <thead>

                <tr className="text-left text-slate-800">

                  <th>Date</th>

                  <th>Revenue</th>

                </tr>

              </thead>

              <tbody>

                {

                  report.data
                    ?.revenue_predictions
                    ?.map((item, index) => (

                      <tr
                        key={index}
                        className="text-white"
                      >

                        <td className="py-3">

                          {item.date}

                        </td>

                        <td className="py-3">

                          ₹ {item.predicted_revenue}

                        </td>

                      </tr>

                    ))

                }

              </tbody>

            </table>

          </div>


          {/* Sales Forecast */}

          <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">

              Sales Forecast

            </h2>

            <table className="w-full">

              <thead>

                <tr className="text-left text-slate-800">

                  <th>Date</th>

                  <th>Sales</th>

                </tr>

              </thead>

              <tbody>

                {

                  report.data
                    ?.forecast_predictions
                    ?.filter((item) =>
                      item.date
                        .toLowerCase()

                        .includes(

                          searchTerm
                            .toLowerCase()
                        )

                      ||

                      String(

                        item.predicted_sales

                      ).includes(searchTerm)
                    )

                    ?.slice(
                      (currentPage - 1)
                      *
                      reportsPerPage,

                      currentPage
                      *
                      reportsPerPage
                    )
                    ?.map((item, index) => (

                      <tr
                        key={index}
                        className="border-b border-white/20"
                      >

                        <td className="py-4">

                          {item.date}

                        </td>

                        <td className="py-4 font-semibold">

                          ₹ {

                              Number(

                                item.predicted_sales ||

                                item.predicted_revenue ||

                                0

                              ).toFixed(2)

                            }

                        </td>

                      </tr>

                    )
                  )

                }

              </tbody>

            </table>

            <div className="flex items-center justify-center gap-5 mt-8">


            {/* Previous */}

            <button

              onClick={() =>

                setCurrentPage(

                  Math.max(
                    currentPage - 1,
                    1
                  )
                )
              }

              className="bg-white/70 px-5 py-3 rounded-2xl shadow hover:scale-105 transition"
            >

              Previous

            </button>


            {/* Current */}

            <span className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold">

              Page {currentPage}

            </span>


            {/* Next */}

            <button

              onClick={() =>

                setCurrentPage(
                  currentPage + 1
                )
              }

            className="bg-white/70 px-5 py-3 rounded-2xl shadow hover:scale-105 transition"
            >

              Next

            </button>

            </div>

          </div>


          {/* Top Products */}

          <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">

              Top Selling Products

            </h2>

            <table className="w-full">

              <thead>

                <tr className="text-left text-slate-800">

                  <th>Product</th>

                  <th>Total Sales</th>

                </tr>

              </thead>

              <tbody>

                {

                  report.data
                    ?.top_products
                    ?.map((item, index) => (

                      <tr
                        key={index}
                        className="text-white"
                      >

                        <td className="py-3">

                          {item.product}

                        </td>

                        <td className="py-3">

                          ₹ {item.total_sales}

                        </td>

                      </tr>

                    ))

                }

              </tbody>

            </table>

          </div>


          {/* Download Buttons */}

          <div className="mt-10 flex gap-6 flex-wrap">


            {/* PDF */}

            <button

              onClick={async () => {

                const response = await fetch(

                  "http://127.0.0.1:8000/report/pdf",

                  {

                    method: "POST",

                    headers: {

                      "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify(

                      report.data
                    )
                  }
                );

                const blob =
                  await response.blob();

                const url =
                  window.URL.createObjectURL(
                    blob
                  );

                const link =
                  document.createElement("a");

                link.href = url;

                link.download =
                  "forecast_report.pdf";

                link.click();
              }}

              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl text-lg font-semibold"
            >

              Download PDF

            </button>


            {/* EXCEL */}

            <button

              onClick={async () => {

                const response = await fetch(

                  "http://127.0.0.1:8000/report/excel",

                  {

                    method: "POST",

                    headers: {

                      "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify(

                      report.data
                    )
                  }
                );

                const blob =
                  await response.blob();

                const url =
                  window.URL.createObjectURL(
                    blob
                  );

                const link =
                  document.createElement("a");

                link.href = url;

                link.download =
                  "forecast_report.xlsx";

                link.click();
              }}

              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl text-lg font-semibold"
            >

              Download Excel

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Reports;