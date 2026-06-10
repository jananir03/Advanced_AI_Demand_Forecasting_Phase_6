import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AIFeatures = () => {

  const [selectedFeature,
    setSelectedFeature] =
    useState("business-insights");

  const [data,
    setData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const datasetId =
    localStorage.getItem(
      "active_dataset_id"
    );

  const datasetName =
    localStorage.getItem(
      "active_dataset_name"
    );

  const featureEndpoints = {

    "business-insights":
      "/ai-features/advanced/business-insights",

    "inventory-risk":
      "/ai-features/advanced/inventory-risk",

    "anomaly-detection":
      "/ai-features/advanced/anomaly-detection",

    "demand-recommendations":
      "/ai-features/advanced/demand-recommendations",

    "demand-spike":
      "/ai-features/advanced/demand-spike-prediction",

    "low-stock":
      "/ai-features/advanced/low-stock-prediction",

    "inventory-optimization":
      "/ai-features/advanced/inventory-optimization",

    "buying-behavior":
      "/ai-features/advanced/customer-buying-behavior",

    "model-comparison":
      "/ai-features/advanced/model-comparison",

    "historical-comparison":
      "/ai-features/advanced/historical-comparison",

    "trend-recommendations":
      "/ai-features/advanced/trend-recommendations"
  };

  useEffect(() => {

    fetchFeature();

  }, [selectedFeature]);

  const fetchFeature =
  async () => {

    try {

      setLoading(true);

      console.log(
        "Selected Feature:",
        selectedFeature
      );

      console.log(
        "Endpoint:",
        featureEndpoints[selectedFeature]
      );

      const response =
        await API.get(

          `${featureEndpoints[selectedFeature]}?dataset_id=${datasetId}`
        );

      console.log(
        "Response Data:",
        response.data
      );

      setData(
        response.data
      );

    } catch (error) {

      console.log(
        "API Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  const renderBusinessInsights = () => {

  if (!data?.insights) return null;

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {data.insights.map((item, index) => (

        <div
          key={index}
          className="
          bg-gradient-to-r
          from-blue-50
          to-cyan-50
          rounded-3xl
          p-6
          shadow-lg
          border-l-4
          border-blue-600
          "
        >

          <div className="flex items-center gap-3 mb-3">

            <div className="text-3xl">

              📈

            </div>

            <h3 className="font-bold text-blue-900">

              Business Insight

            </h3>

          </div>

          <p className="text-gray-700 leading-relaxed">

            {item}

          </p>

        </div>

      ))}

    </div>

  );
};

const renderInventoryRisk = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="space-y-6">

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-red-100 rounded-3xl p-5 text-center">

          <h3 className="text-red-700 font-bold text-xl">

            High Risk

          </h3>

          <p className="text-3xl font-bold">

            {
              data.filter(
                item =>
                item.risk_level?.includes(
                  "High"
                )
              ).length
            }

          </p>

        </div>

        <div className="bg-yellow-100 rounded-3xl p-5 text-center">

          <h3 className="text-yellow-700 font-bold text-xl">

            Medium Risk

          </h3>

          <p className="text-3xl font-bold">

            {
              data.filter(
                item =>
                item.risk_level?.includes(
                  "Medium"
                )
              ).length
            }

          </p>

        </div>

        <div className="bg-green-100 rounded-3xl p-5 text-center">

          <h3 className="text-green-700 font-bold text-xl">

            Low Risk

          </h3>

          <p className="text-3xl font-bold">

            {
              data.filter(
                item =>
                item.risk_level?.includes(
                  "Low"
                )
              ).length
            }

          </p>

        </div>

      </div>

      <div className="overflow-auto">

        <table className="w-full bg-white rounded-3xl shadow-lg">

          <thead>

            <tr className="bg-blue-100">

              <th className="p-4 text-left">

                Product

              </th>

              <th className="p-4 text-left">

                Sales

              </th>

              <th className="p-4 text-left">

                Risk Level

              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="p-4 text-left">

                  {item.product}

                </td>

                <td className="p-4 text-left">
                  {item.sales || item.total_sales}

                </td>

                <td className="p-4 text-left">

                  <span
                    className={`
                    px-4
                    py-2
                    rounded-full
                    text-white
                    ${
                      item.risk_level?.includes("High")
                      ? "bg-red-500"
                      : item.risk_level?.includes("Medium")
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    }
                    `}
                  >

                    {item.risk_level}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

const renderAnomalyDetection = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {data.map((item,index)=>(

        <div
          key={index}
          className="
          bg-red-50
          border-l-4
          border-red-500
          rounded-3xl
          p-6
          shadow-lg
          "
        >

          <div className="flex items-center gap-3 mb-3">

            <div className="text-3xl">

              🚨

            </div>

            <h3 className="font-bold text-red-700">

              Anomaly Detected

            </h3>

          </div>

          <p className="text-lg font-semibold">

            {item.product}

          </p>

          <p className="text-gray-600">

            Sales : {item.sales_amount?.toLocaleString()}

          </p>

        </div>

      ))}

    </div>

  );
};

const renderDemandRecommendations = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      {data.map((item,index)=>(

        <div
          key={index}
          className="
          bg-gradient-to-r
          from-green-50
          to-emerald-50
          rounded-3xl
          p-6
          shadow-lg
          "
        >

          <div className="text-3xl mb-3">

            📦

          </div>

          <h3 className="font-bold text-lg">

            {item.product}

          </h3>

          <p className="mt-2">

            Sales : {item.total_sales?.toLocaleString()}

          </p>

          <p className="mt-3 text-green-700 font-semibold">

            {item.recommendation}

          </p>

        </div>

      ))}

    </div>

  );
};

const renderDemandSpike = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      {data.map((item,index)=>(

        <div
          key={index}
          className="
          bg-gradient-to-r
          from-orange-50
          to-red-50
          rounded-3xl
          p-6
          shadow-lg
          "
        >

          <div className="text-3xl mb-3">

            📈

          </div>

          <h3 className="font-bold text-lg">

            {item.product}

          </h3>

          <p className="mt-2">

            Total Sales

          </p>

          <p className="text-2xl font-bold text-red-500">

            {item.total_sales?.toLocaleString()}

          </p>

          <p className="mt-2 text-red-600 font-semibold">

            {item.status}

          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-3">

            <div
              className="
              bg-red-500
              h-4
              rounded-full
              "
              style={{
                width: `${item.spike_score}%`
              }}
            />

          </div>

          <p className="mt-2 font-bold text-red-600">

            {item.spike_score}%

          </p>

        </div>

      ))}

    </div>

  );
};

const renderLowStock = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {data.map((item,index)=>(

        <div
          key={index}
          className="
          bg-red-50
          border
          border-red-300
          rounded-3xl
          p-6
          shadow-lg
          "
        >

          <div className="flex items-center gap-3">

            <div className="text-3xl">

              ⚠️

            </div>

            <h3 className="font-bold text-red-700">

              Low Stock Alert

            </h3>

          </div>

          <p className="mt-4 text-lg font-semibold">

            {item.product}

          </p>

          <p className="text-gray-600">

            {item.stock_status}

          </p>

        </div>

      ))}

    </div>

  );
};

const renderInventoryOptimization = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="space-y-5">

      {data.map((item,index)=>(

        <div
          key={index}
          className="
          bg-white
          rounded-3xl
          p-6
          shadow-lg
          border
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-bold text-lg">

                {item.product}

              </h3>

              <p className="text-gray-500">

                Sales : {item.sales || item.total_sales}

              </p>

            </div>

            <div
              className="
              bg-blue-100
              text-blue-700
              px-4
              py-2
              rounded-full
              "
            >

              Optimization

            </div>

          </div>

          <div className="mt-4">

            <p className="text-gray-700">

              {item.suggestion}

            </p>

          </div>

        </div>

      ))}

    </div>

  );
};

const renderBuyingBehavior = () => {

  if (!data) return null;

  return (

    <div className="space-y-6">

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-blue-100 rounded-3xl p-5">

          <h3 className="font-bold text-blue-800">

            Top Products

          </h3>

          <p className="text-3xl font-bold mt-2">

            {data.top_products?.length || 0}

          </p>

        </div>

        <div className="bg-green-100 rounded-3xl p-5">

          <h3 className="font-bold text-green-800">

            High Revenue Products

          </h3>

          <p className="text-3xl font-bold mt-2">

            {data.high_revenue_products?.length || 0}

          </p>

        </div>

        <div className="bg-purple-100 rounded-3xl p-5">

          <h3 className="font-bold text-purple-800">

            AI Insights

          </h3>

          <p className="text-3xl font-bold mt-2">

            {data.buying_insights?.length || 0}

          </p>

        </div>

      </div>

      {/* TOP PRODUCTS */}

      <div className="bg-white rounded-3xl p-6 shadow">

        <h3 className="text-xl font-bold mb-4">

          Top Products

        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {data.top_products?.map((item,index)=>(

            <div
              key={index}
              className="
              bg-blue-50
              rounded-2xl
              p-4
              "
            >

              <h4 className="font-bold">

                {item.product}

              </h4>

              <p>

                Sales :
                {" "}
                {item.total_sales?.toLocaleString()}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* HIGH REVENUE */}

      <div className="bg-white rounded-3xl p-6 shadow">

        <h3 className="text-xl font-bold mb-4">

          High Revenue Products

        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {data.high_revenue_products?.map((item,index)=>(

            <div
              key={index}
              className="
              bg-green-50
              rounded-2xl
              p-4
              "
            >

              <h4 className="font-bold">

                {item.product}

              </h4>

              <p>

                Revenue :
                {" "}
                ₹
                {item.total_sales?.toLocaleString()}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="bg-white rounded-3xl p-6 shadow">

        <h3 className="text-xl font-bold mb-4">

          AI Buying Insights

        </h3>

        <div className="space-y-3">

          {data.buying_insights?.map((insight,index)=>(

            <div
              key={index}
              className="
              bg-purple-50
              rounded-xl
              p-4
              "
            >

              {insight}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

const renderModelComparison = () => {

  if (!Array.isArray(data)) return null;

  const bestModel =
    [...data].sort(
      (a,b)=>
      (b.confidence_score || 0)
      -
      (a.confidence_score || 0)
    )[0];

  return (

    <div className="space-y-6">

      <div
        className="
        bg-gradient-to-r
        from-green-500
        to-emerald-600
        text-white
        rounded-3xl
        p-6
        shadow-xl
        "
      >

        <h2 className="text-2xl font-bold">

          🏆 Best Model

        </h2>

        <p className="mt-3 text-xl">

          {bestModel?.model}

        </p>

        <p>

          Confidence :
          {" "}
          {bestModel?.confidence_score}%

        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow mb-6">

        <h3 className="font-bold text-xl mb-4">

          Model Accuracy Comparison

        </h3>

        <div 
          className="w-full"
          style={{ width: "100%", height: 350 }}
        >

          <ResponsiveContainer
            width= "100%"
            height= "100%"
          >

            <BarChart data={data}>

              <XAxis dataKey="model" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="confidence_score"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="overflow-auto">

        <table
          className="
          w-full
          table-fixed
          bg-white
          rounded-3xl
          shadow-lg
          "
        >

          <thead>

            <tr className="bg-blue-100">

              <th className="p-4 text-left">

                Model

              </th>

              <th className="p-4 text-left">

                MAE

              </th>

              <th className="p-4 text-left">

                RMSE

              </th>

              <th className="p-4 text-left">

                R²

              </th>

              <th className="p-4 text-left">

                Confidence

              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item,index)=>(

              <tr
                key={index}
                className="border-b"
              >

                <td className="p-4 font-semibold">

                  {item.model}

                </td>

                <td className="p-4 text-left">

                  {item.mae}

                </td>

                <td className="p-4 text-left">

                  {item.rmse}

                </td>

                <td className="p-4 text-left">

                  {item.r2_score}

                </td>

                <td className="p-4 text-left">

                  <div className="flex items-center gap-3">

                    <div className="w-32 bg-gray-200 rounded-full h-3">

                      <div
                        className="
                        bg-green-500
                        h-3
                        rounded-full
                        "
                        style={{
                          width:
                          `${item.confidence_score}%`
                        }}
                      />

                    </div>

                    <span>

                      {item.confidence_score}%

                    </span>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

const renderHistoricalComparison = () => {

  if (!Array.isArray(data)) return null;

  return (

    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-blue-100 rounded-3xl p-5">

          <h3 className="font-bold text-blue-800">

            Total Models

          </h3>

          <p className="text-3xl font-bold mt-2">

            {data.length}

          </p>

        </div>

        <div className="bg-green-100 rounded-3xl p-5">

          <h3 className="font-bold text-green-800">

            Average Accuracy

          </h3>

          <p className="text-3xl font-bold mt-2">

            {
              (
                data.reduce(
                  (sum,item)=>
                  sum + (item.accuracy || 0),
                  0
                ) / data.length
              ).toFixed(2)
            }%

          </p>

        </div>

        <div className="bg-purple-100 rounded-3xl p-5">

          <h3 className="font-bold text-purple-800">

            History Records

          </h3>

          <p className="text-3xl font-bold mt-2">

            {data.length}

          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-auto max-h-[400px]">

        <table className="w-full table-fixed">

          <thead>

            <tr className="bg-blue-100">

              <th className="p-4 text-left">

                Model

              </th>

              <th className="p-4 text-left">

                Accuracy

              </th>

              <th className="p-4 text-left">

                Created At

              </th>

            </tr>

          </thead>

          <tbody>

            {data.slice(0,5).map((item,index)=>(

              <tr
                key={index}
                className="border-b"
              >

                <td className="p-4 text-left">

                  {item.model}

                </td>

                <td className="p-4 text-left">

                  {item.accuracy}%

                </td>

                <td className="p-4 text-left">

                  {item.created_at}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

const renderTrendRecommendations = () => {

  if (!data) return null;

  return (

    <div
      className="
      bg-gradient-to-r
      from-indigo-50
      via-blue-50
      to-cyan-50
      rounded-3xl
      p-10
      shadow-xl
      "
    >

      <div className="text-center">

        <div className="text-6xl mb-5">

          📈

        </div>

        <h2
          className="
          text-4xl
          font-bold
          text-blue-900
          "
        >

          {data.trend}

        </h2>

      </div>

      <div
        className="
        mt-8
        bg-white
        rounded-3xl
        p-8
        shadow
        "
      >

        <h3
          className="
          text-xl
          font-bold
          mb-3
          "
        >

          AI Recommendation

        </h3>

        <p
          className="
          text-lg
          text-gray-700
          "
        >

          {data.recommendation}

        </p>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span>

            Confidence Score

          </span>

          <span>

            {data.confidence_score}%

          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-5">

          <div
            className="
            bg-green-500
            h-5
            rounded-full
            "
            style={{
              width:
              `${data.confidence_score}%`
            }}
          />

        </div>

      </div>

    </div>

  );
};

const renderFeatureContent = () => {

  switch(selectedFeature){

    case "business-insights":
      return renderBusinessInsights();

    case "inventory-risk":
      return renderInventoryRisk();

    case "anomaly-detection":
      return renderAnomalyDetection();

    case "demand-recommendations":
      return renderDemandRecommendations();

    case "demand-spike":
      return renderDemandSpike();

    case "low-stock":
      return renderLowStock();

    case "inventory-optimization":
      return renderInventoryOptimization();

    case "buying-behavior":
      return renderBuyingBehavior();

    case "model-comparison":
      return renderModelComparison();

    case "historical-comparison":
      return renderHistoricalComparison();

    case "trend-recommendations":
      return renderTrendRecommendations();

    default:

      return (

        <pre>

          {
            JSON.stringify(
              data,
              null,
              2
            )
          }

        </pre>

      );

    }

  };

  return (

    <MainLayout>

      <div className="grid grid-cols-12 gap-8">
      
              {/* ----------------------------------- */}
        {/* LEFT FEATURE MENU */}
        {/* ----------------------------------- */}

        <div className="col-span-12 lg:col-span-3">

          <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-6 shadow-xl sticky top-24">

            <h2 className="text-2xl font-bold text-blue-950 mb-6">

              AI Control Center

            </h2>

            <div className="space-y-3">

              <button
                onClick={() =>
                  setSelectedFeature(
                    "business-insights"
                  )
                }
                  className={`

                  w-full

                  text-left

                  p-4

                  rounded-2xl

                  transition-all

                  ${
                  selectedFeature ===
                  "business-insights"

                  ? "bg-blue-600 text-white"

                  : "bg-white"
                }
                `}
              >
                Business Insights
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "inventory-risk"
                  )
                }
                 className={`

                  w-full

                  text-left

                  p-4

                  rounded-2xl

                  transition-all

                  ${
                  selectedFeature ===
                  "inventory-risk"

                  ? "bg-blue-600 text-white"

                  : "bg-white"
                }
                `}
              >
                Inventory Risk
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "anomaly-detection"
                  )
                }
                  className={`

                  w-full

                  text-left

                  p-4

                  rounded-2xl

                  transition-all

                  ${
                  selectedFeature ===
                  "anomaly-detection"

                  ? "bg-blue-600 text-white"

                  : "bg-white"
                }
                `}
              >
                Anomaly Detection
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "demand-recommendations"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "demand-recommendations"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Demand Recommendations
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "demand-spike"
                  )
                }
                  className={`

                  w-full

                  text-left

                  p-4

                  rounded-2xl

                  transition-all

                  ${
                  selectedFeature ===
                  "demand-spike"

                  ? "bg-blue-600 text-white"

                  : "bg-white"
                }
                `}
              >
                Demand Spike Prediction
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "low-stock"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "low-stock"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Low Stock Prediction
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "inventory-optimization"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "inventory-optimization"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Inventory Optimization
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "buying-behavior"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "buying-behavior"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Customer Buying Behavior
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "model-comparison"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "model-comparison"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Model Comparison
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "historical-comparison"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "historical-comparison"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Historical Comparison
              </button>

              <button
                onClick={() =>
                  setSelectedFeature(
                    "trend-recommendations"
                  )
                }
                className={`

                w-full

                text-left

                p-4

                rounded-2xl

                transition-all

                ${
                selectedFeature ===
                "trend-recommendations"

                ? "bg-blue-600 text-white"

                : "bg-white"
              }
              `}
              >
                Trend Recommendations
              </button>

            </div>

          </div>

        </div>

        {/* ----------------------------------- */}
        {/* RIGHT CONTENT */}
        {/* ----------------------------------- */}

        <div className="col-span-12 lg:col-span-9">

          <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

            <h1 className="text-4xl font-bold text-blue-950 mb-6">

              {selectedFeature
                .replaceAll("-", " ")
                .toUpperCase()}

            </h1>

            {
              loading ? (

                <h2 className="text-2xl font-bold">

                  Loading AI Insights...

                </h2>

              ) : (

                renderFeatureContent()

              )
            } 

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default AIFeatures;