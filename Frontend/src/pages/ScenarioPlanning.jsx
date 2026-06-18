import React, {

  useState,
  useEffect

} from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import {

  GitBranch,

  TrendingUp,

  DollarSign,

  Package,

  AlertTriangle

} from "lucide-react";

const ScenarioPlanning = () => {

  const [

    demandChange,

    setDemandChange

  ] = useState(20);

  const [

    priceImpact,

    setPriceImpact

  ] = useState(10);

  const [

    inventoryImpact,

    setInventoryImpact

  ] = useState(-5);

  const [

    scenarioName,

    setScenarioName

  ] = useState("");

  const [

    scenarioHistory,

    setScenarioHistory

  ] = useState([]);

  const [

    selectedDataset,

    setSelectedDataset

  ] = useState("");

  const [

    datasets,

    setDatasets

  ] = useState([]);

  const baseForecast = 11062;

  const expectedForecast = Math.round(

    baseForecast *

    (
        1 +

        (
        demandChange +

        priceImpact +

        inventoryImpact

        ) / 100
    )
    );

    const bestCase = Math.round(

        expectedForecast * 1.15
    );

    const worstCase = Math.round(

        expectedForecast * 0.80
    );

    const forecastDifference =

        expectedForecast -

        baseForecast;

    useEffect(() => {

      loadScenarioHistory();

    }, []);

    const loadScenarioHistory = async () => {

      try {

        const response = await API.get(

          "/scenario-analysis/history"
        );

        setScenarioHistory(

          response.data
        );

      } catch (error) {

        console.error(error);
      }
    };

    const saveScenario = async () => {

      try {

        await API.post(

          "/scenario-analysis/save",

          {

            scenario_name:

              scenarioName ||

              "Custom Scenario",

            sales_growth:

              demandChange,

            seasonality_factor:

              priceImpact,

            demand_factor:

              inventoryImpact,

            best_case:

              bestCase,

            normal_case:

              expectedForecast,

            worst_case:

              worstCase,

            
          }
        );

        alert(

          "Scenario Saved Successfully"
        );

        loadScenarioHistory();

      } catch (error) {

        console.error(error);

        alert(

          "Failed to save scenario"
        );
      }
    };

  return (

    <MainLayout>

      <div className="relative min-h-screen p-8 bg-gradient-to-br from-slate-950 via-indigo-950 ">

    

        {/* Content */}

        <div className="relative z-10">

          {/* Hero Section */}

          <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white rounded-[35px] p-10 shadow-xl border border-white/20">

            <div className="flex items-center gap-4">

              <GitBranch

                size={42}

                className="text-violet-600"
              />

              <div>

                <h1 className="text-5xl font-bold text-white">

                  Advanced Scenario Planning

                </h1>

                <p className="text-slate-300 text-xl mt-3">

                  Simulate business outcomes using AI-powered
                  What-If Analysis and forecast adjustments.

                </p>

              </div>

            </div>

            {/* Quick Metrics */}

            <div className="grid md:grid-cols-4 gap-6 mt-10">

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

                <TrendingUp
                  className="text-green-600 mb-3"
                />

                <p className="text-slate-300">

                  Demand Growth

                </p>

                <h2 className="text-4xl font-bold text-white mt-2">

                  +24%
                </h2>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

                <DollarSign
                  className="text-yellow-600 mb-3"
                />

                <p className="text-slate-300">

                  Revenue Impact

                </p>

                <h2 className="text-4xl font-bold text-white mt-2">

                  +18%
                </h2>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

                <Package
                  className="text-cyan-600 mb-3"
                />

                <p className="text-slate-300">

                  Inventory Effect

                </p>

                <h2 className="text-4xl font-bold text-white mt-2">

                  -5%
                </h2>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

                <AlertTriangle
                  className="text-red-500 mb-3"
                />

                <p className="text-slate-300">

                  Risk Score

                </p>

                <h2 className="text-4xl font-bold text-white mt-2">

                  12%
                </h2>

              </div>

            </div>

          </div>

                    {/* Scenario Inputs */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/20 mt-8">

            <h2 className="text-3xl font-bold text-slate-900 mb-8">

              What-If Analysis Inputs

              <div className="mb-8">

                <input

                  type="text"

                  placeholder="Scenario Name"

                  value={scenarioName}

                  onChange={(e) =>

                    setScenarioName(

                      e.target.value
                    )
                  }

                  className="w-full p-4 rounded-2xl border border-slate-300"

                />

              </div>

            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* Demand Change */}

              <div className="bg-white rounded-3xl p-6 shadow-lg">

                <label className="font-semibold text-slate-700">

                  Demand Change (%)

                </label>

                <input

                  type="range"

                  min="-50"

                  max="100"

                  value={demandChange}

                  onChange={(e) =>

                    setDemandChange(

                      Number(e.target.value)
                    )
                  }

                  className="w-full mt-4"
                />

                <h3 className="text-3xl font-bold text-slate-900 mt-4">

                  {demandChange}%

                </h3>

              </div>

              {/* Price Impact */}

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

                <label className="font-semibold text-slate-700">

                  Price Impact (%)

                </label>

                <input

                  type="range"

                  min="-50"

                  max="100"

                  value={priceImpact}

                  onChange={(e) =>

                    setPriceImpact(

                      Number(e.target.value)
                    )
                  }

                  className="w-full mt-4"
                />

                <h3 className="text-3xl font-bold text-slate-900 mt-4">

                  {priceImpact}%

                </h3>

              </div>

              {/* Inventory Impact */}

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

                <label className="font-semibold text-slate-700">

                  Inventory Impact (%)

                </label>

                <input

                  type="range"

                  min="-50"

                  max="100"

                  value={inventoryImpact}

                  onChange={(e) =>

                    setInventoryImpact(

                      Number(e.target.value)
                    )
                  }

                  className="w-full mt-4"
                />

                <h3 className="text-3xl font-bold text-slate-900 mt-4">

                  {inventoryImpact}%

                </h3>

              </div>

            </div>

          </div>

                    {/* Scenario Outcomes */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/20 mt-8">

            <h2 className="text-3xl font-bold text-slate-900 mb-8">

              Scenario Forecast Outcomes

            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* Best Case */}

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-xl">

                <h3 className="text-xl font-semibold">

                  Best Case

                </h3>

                <h1 className="text-5xl font-bold mt-4">

                  {bestCase.toLocaleString()}

                </h1>

                <p className="mt-4">

                  High growth scenario
                </p>

              </div>

              {/* Expected */}

              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 shadow-xl">

                <h3 className="text-xl font-semibold">

                  Expected Case

                </h3>

                <h1 className="text-5xl font-bold mt-4">

                  {expectedForecast.toLocaleString()}

                </h1>

                <p className="mt-4">

                  Most probable outcome
                </p>

              </div>

              {/* Worst */}

              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-3xl p-8 shadow-xl">

                <h3 className="text-xl font-semibold">

                  Worst Case

                </h3>

                <h1 className="text-5xl font-bold mt-4">

                  {worstCase.toLocaleString()}

                </h1>

                <p className="mt-4">

                  Risk adjusted estimate
                </p>

              </div>

            </div>

          </div>

                    {/* Executive Impact Analysis */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/20 mt-8">

            <h2 className="text-3xl font-bold text-slate-900 mb-8">

              Executive Impact Analysis

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

              {/* Revenue Impact */}

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-6 shadow-lg border border-emerald-200">

                <DollarSign
                  size={35}
                  className="text-green-600"
                />

                <p className="text-slate-500 mt-4">

                  Revenue Impact

                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">

                  {(
                    expectedForecast *
                    12
                  ).toLocaleString()}

                </h2>

              </div>

              {/* Demand Impact */}

              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 shadow-lg border border-cyan-200">

                <TrendingUp
                  size={35}
                  className="text-blue-600"
                />

                <p className="text-slate-500 mt-4">

                  Demand Impact

                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">

                  {demandChange}%

                </h2>

              </div>

              {/* Inventory Impact */}

              <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-3xl p-6 shadow-lg border border-violet-200">

                <Package
                  size={35}
                  className="text-cyan-600"
                />

                <p className="text-slate-500 mt-4">

                  Inventory Effect

                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">

                  {inventoryImpact}%

                </h2>

              </div>

              {/* Risk Score */}

              <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-6 shadow-lg border border-rose-200">

                <AlertTriangle
                  size={35}
                  className="text-red-500"
                />

                <p className="text-slate-500 mt-4">

                  Risk Score

                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">

                  {Math.abs(
                    inventoryImpact
                  ) + 10}%

                </h2>

              </div>

            </div>

          </div>

                    {/* Forecast Comparison */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/20 mt-8">

            <h2 className="text-3xl font-bold text-slate-900 mb-8">

              Forecast Comparison

            </h2>

            <div className="overflow-x-auto">

              <table className="w-full bg-white rounded-3xl overflow-hidden">

                <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">

                  <tr>

                    <th className="p-5 text-left">

                      Metric

                    </th>

                    <th className="p-5 text-left">

                      Value

                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="p-5 font-semibold">

                      Current Forecast

                    </td>

                    <td className="p-5">

                      {baseForecast.toLocaleString()}

                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-5 font-semibold">

                      Scenario Forecast

                    </td>

                    <td className="p-5">

                      {expectedForecast.toLocaleString()}

                    </td>

                  </tr>

                  <tr>

                    <td className="p-5 font-semibold">

                      Difference

                    </td>

                    <td className="p-5">

                      {forecastDifference > 0 ? "+" : ""}

                      {forecastDifference.toLocaleString()}

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Scenario History */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl border border-white/20 mt-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-slate-900">

                Saved Scenario History

              </h2>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">

                {scenarioHistory.length} Scenarios

              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full bg-white rounded-3xl overflow-hidden">

                <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">

                  <tr>

                    <th className="p-4 text-left">

                      Scenario

                    </th>

                    <th className="p-4 text-left">

                      Dataset ID

                    </th>

                    <th className="p-4 text-left">

                      Best Case

                    </th>

                    <th className="p-4 text-left">

                      Expected

                    </th>

                    <th className="p-4 text-left">

                      Worst Case

                    </th>

                    <th className="p-4 text-left">

                      Created

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    scenarioHistory.map(

                      (scenario) => (

                        <tr

                          key={scenario.id}

                          className="border-b hover:bg-slate-50"

                        >

                          <td className="p-4 font-semibold">

                            {

                              scenario.scenario_name
                            }

                          </td>

                          <td className="p-4">

                            {

                              scenario.dataset_id

                            }

                          </td>

                          <td className="p-4 text-green-600 font-bold">

                            {

                              scenario.best_case
                            }

                          </td>

                          <td className="p-4 text-blue-600 font-bold">

                            {

                              scenario.normal_case
                            }

                          </td>

                          <td className="p-4 text-red-500 font-bold">

                            {

                              scenario.worst_case
                            }

                          </td>

                          <td className="p-4">

                            {

                              new Date(

                                scenario.created_at

                              ).toLocaleDateString()
                            }

                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

          {/* Save Scenario */}

          <div className="mt-8 flex justify-end">

            <button

              onClick={saveScenario}

              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"

            >

              💾 Save Scenario

            </button>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default ScenarioPlanning;