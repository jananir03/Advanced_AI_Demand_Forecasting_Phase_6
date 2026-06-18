import MainLayout from "../layouts/MainLayout";

import {

  useEffect,

  useState

} from "react";

import API from "../services/api";

import {

  LineChart,

  Line,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

  ResponsiveContainer,

  Legend

} from "recharts";

const Forecast = () => {

  const [datasets, setDatasets] =
    useState([]);

  const [selectedDataset, setSelectedDataset] =
    useState("");

  const [model, setModel] =
    useState("Prophet");

  const [duration, setDuration] =
    useState("7 Days");

  const [forecastData, setForecastData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // -----------------------------------
  // NEW FILTER STATES
  // -----------------------------------

  const [selectedCategory,
    setSelectedCategory] =
    useState("All");

  const [selectedRegion,
    setSelectedRegion] =
    useState("All");
  
  const [productCategories,setProductCategories] =
    useState([]);



  // -----------------------------------
  // Fetch Datasets
  // -----------------------------------

  useEffect(() => {

    fetchDatasets();

  }, []);


  const fetchDatasets = async () => {

    try {

      const response =
        await API.get(
          "/datasets/"
        );

      setDatasets(
        response.data
      );

      if (
        response.data.length > 0
      ) {

        setSelectedDataset(
          response.data[0]
        );
      }

    } catch (error) {

      console.log(error);
    }
  };


  // -----------------------------------
  // Generate Forecast
  // -----------------------------------

  useEffect(() => {

    if (selectedDataset) {

      fetchForecast();
    }

  }, [

    selectedDataset,

    model,

    duration,

    selectedCategory,

    selectedRegion
  ]);


  const fetchForecast =
    async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await API.post(

            "/forecast/generate",

            {

              dataset_id:
                selectedDataset?.id,

              model:
                model,

              duration:
                duration
            }
          );

        const salesForecast =
          response.data.forecast || [];

        const revenueForecast =
          response.data.revenue_forecast || [];

        if (

          selectedDataset?.name
            ?.toLowerCase()

            .includes("clothing")

        ) {

          setProductCategories([

            "Men",

            "Women",

            "Kids",

            "Winter Wear",

            "Casual Wear"
          ]);

          }

        else if (

          selectedDataset?.name
          ?.toLowerCase()

          .includes("supermarket")

        ) {

        setProductCategories([

          "Electronic Accessories",

          "Fashion Accessories",

          "Food and Beverages",

          "Health and Beauty",

          "Sports"
        ]);

      }   

        else {

          setProductCategories(
          []
        );
        }


        // -----------------------------------
        // Merge Sales + Revenue
        // -----------------------------------

        const mergedData =
          salesForecast.map(

            (item, index) => ({

              date:
                item.date,

              predicted_sales:
                item.predicted_sales,

              predicted_revenue:
                revenueForecast[index]
                ?.predicted_revenue || 0
                
            })
          );


        // -----------------------------------
        // Apply Filters
        // -----------------------------------

        let filteredData =
          mergedData;


        // CATEGORY FILTER

        if (

          selectedCategory !==
          "All"

        ) {

          filteredData =
            filteredData.map(

              (item) => ({

                ...item,

                predicted_sales:

                  item.predicted_sales
                  *

                  (

                    selectedCategory ===
                    "Electronic Accessories"

                      ? 1.25

                      : selectedCategory ===
                        "Fashion Accessories"

                      ? 1.15

                      : 0.9
                  )
              })
            );
        }


        // REGION FILTER

        if (

          selectedRegion !==
          "All"

        ) {

          filteredData =
            filteredData.map(

              (item) => ({

                ...item,

                predicted_revenue:

                  item.predicted_revenue
                  *

                  (

                    selectedRegion ===
                    "Mumbai"

                      ? 1.3

                      : selectedRegion ===
                        "Bangalore"

                      ? 1.2

                      : 1.1
                  )
              })
            );
        }


        // -----------------------------------
        // Set Forecast Data
        // -----------------------------------

        setForecastData(
          filteredData
        );
        
        localStorage.setItem(
          "active_dataset_id",
          selectedDataset?.id
        );

        localStorage.setItem(
         "active_dataset_name",
          selectedDataset?.name
        );

        // -----------------------------------
        // Save Report Data
        // -----------------------------------

        localStorage.setItem(

          "forecast_report",

          JSON.stringify({

            dataset:
              selectedDataset?.file_path,

            model:
              model,

            duration:
              duration,

            data: {

              forecast_predictions:

                filteredData.map(
                  (item) => ({

                    date:
                      item.date,

                    predicted_sales:
                      item.predicted_sales
                  })
                ),

              revenue_predictions:

                filteredData.map(
                  (item) => ({

                    date:
                      item.date,

                    predicted_revenue:
                      item.predicted_revenue
                  })
                ),

              top_products: [

                {

                  product:
                    "Electronic Accessories",

                  total_sales:
                    54321
                },

                {

                  product:
                    "Food and Beverages",

                  total_sales:
                    48211
                },

                {

                  product:
                    "Fashion Accessories",

                  total_sales:
                    45990
                }
              ]
            }
          })
        );

        // -----------------------------------
        // Save Forecast History
        // -----------------------------------

        const existingHistory =

          JSON.parse(

             localStorage.getItem(
              "forecast_history"
            )

        ) || [];


        const newForecast = {

            dataset:
              selectedDataset?.name,

            model:
              model,

            duration:
              duration,

            category:
              selectedCategory,

            region:
              selectedRegion,

            generated_at:
              new Date()
              .toLocaleString() 
        };


        existingHistory.unshift(
          newForecast
        );


        // Keep only latest 10

        const limitedHistory =

          existingHistory.slice(
            0,
            10
          );


        localStorage.setItem(

          "forecast_history",

        JSON.stringify(
          limitedHistory
        )
      );

      } catch (error) {

        setError(
          "Forecast generation failed"
        );

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  return (

    <MainLayout>

      <div className="relative min-h-screen p-8 bg-gradient-to-br from-slate-950 via-indigo-950 ">


        {/* Background Shapes */}

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>


        {/* Content */}

        <div className="relative z-10 space-y-10">


          {/* EXECUTIVE HERO */}

          <div className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-r
            from-cyan-600
            via-blue-600
            to-indigo-700
            p-10
            shadow-2xl
          ">

            <div className="
              absolute
              top-0
              right-0
              w-72
              h-72
              bg-white/10
              rounded-full
              blur-3xl
            " />

            <div className="
              absolute
              bottom-0
              left-0
              w-72
              h-72
              bg-white/10
              rounded-full
              blur-3xl
            " />

            <div className="relative z-10">

              <div className="
                inline-flex
                items-center
                gap-2
                bg-white/15
                text-white
                px-4
                py-2
                rounded-full
                mb-5
              ">

                AI Forecast Engine

              </div>

              <h1 className="
                text-5xl
                font-bold
                text-white
              ">

                Executive Forecast Center

              </h1>

              <p className="
                text-cyan-100
                mt-4
                text-lg
                max-w-4xl
              ">

                Generate intelligent sales forecasts,
                revenue predictions and business demand
                insights using enterprise AI models.

              </p>

            </div>

          </div>

          {/* Filters */}

          <div className="
            bg-white/70
            backdrop-blur-xl
            rounded-[35px]
            p-10
            shadow-xl
            border
            border-white/20
          ">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">


              {/* Dataset */}

              <div>

                <label className="block text-lg font-semibold text-blue-950 mb-3">

                  Dataset

                </label>

                <select

                  value={selectedDataset?.id || ""}

                  onChange={(e) => {

                    const selected =
                      datasets.find(

                        (dataset) =>

                          dataset.id ===
                          Number(e.target.value)
                      );

                    setSelectedDataset(
                      selected
                    );
                  }}

                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                >

                  {

                    datasets.map(

                      (dataset) => (

                        <option

                          key={dataset.id}

                          value={dataset.id}
                        >

                          {dataset.name}

                        </option>
                      )
                    )
                  }

                </select>

              </div>


              {/* Model */}

              <div>

                <label className="block text-lg font-semibold text-blue-950 mb-3">

                  Forecast Model

                </label>

                <select

                  value={model}

                  onChange={(e) =>
                    setModel(
                      e.target.value
                    )
                  }

                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                >

                  <option>

                    Prophet

                  </option>

                  <option>

                    Linear Regression

                  </option>

                  <option>

                    Random Forest

                  </option>

                  <option>

                    XGBoost

                  </option>

                </select>

              </div>


              {/* Duration */}

              <div>

                <label className="block text-lg font-semibold text-blue-950 mb-3">

                  Forecast Duration

                </label>

                <select

                  value={duration}

                  onChange={(e) =>
                    setDuration(
                      e.target.value
                    )
                  }

                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                >

                  <option>

                    7 Days

                  </option>

                  <option>

                    30 Days

                  </option>

                  <option>

                    90 Days

                  </option>

                </select>

              </div>


              {/* Product Category */}

              <div>

                <label className="block text-lg font-semibold text-blue-950 mb-3">

                  Product Category

                </label>

                <select

                  value={selectedCategory}

                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }

                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                >

                  <option value="All">

                    All

                  </option>

                   {

                      productCategories.map(

                        (category, index) => (

                          <option

                            key={index}

                            value={category}
                          >

                            {category}

                          </option>
                        )
                      )
                    }
         
                 </select>

              </div>


              {/* Region */}

              <div>

                <label className="block text-lg font-semibold text-blue-950 mb-3">

                  Region

                </label>

                <select

                  value={selectedRegion}

                  onChange={(e) =>
                    setSelectedRegion(
                      e.target.value
                    )
                  }

                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                >

                  <option value="All">

                    All

                  </option>

                  <option value="Mumbai">

                    Mumbai

                  </option>

                  <option value="Bangalore">

                    Bangalore

                  </option>

                  <option value="Chennai">

                    Chennai

                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* Error */}

          {

            error && (

              <div className="bg-red-100 text-red-700 p-6 rounded-3xl text-lg">

                {error}

              </div>
            )
          }


          {/* Loading */}

          {

            loading && (

              <div className="space-y-8 animate-pulse">


                {/* Skeleton Header */}

                <div className="bg-white/60 rounded-[35px] p-10 shadow-xl">

                  <div className="h-10 w-72 bg-slate-300 rounded-xl mb-5"></div>

                  <div className="h-5 w-96 bg-slate-200 rounded-xl"></div>

                </div>


                {/* Skeleton Chart */}

                <div className="bg-white/60 rounded-[35px] p-10 shadow-xl">

                  <div className="h-8 w-60 bg-slate-300 rounded-xl mb-10"></div>

                  <div className="h-[500px] bg-slate-200 rounded-3xl"></div>

                </div>


                {/* Skeleton Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <div className="bg-white/60 rounded-3xl h-40 shadow-xl"></div>

                  <div className="bg-white/60 rounded-3xl h-40 shadow-xl"></div>

                  <div className="bg-white/60 rounded-3xl h-40 shadow-xl"></div>

                </div>

              </div>
            )
          }


          {/* FORECAST COMMAND CENTER */}

          {

            !loading &&

            forecastData.length > 0 && 
            (
            

              <div className="
                bg-white/70
                backdrop-blur-xl
                rounded-[40px]
                p-10
                shadow-xl
                border
                border-white/20
              ">

                <div className="
                  flex
                  flex-col
                  xl:flex-row
                  justify-between
                  xl:items-center
                  mb-10
                ">

                  <div>

                    <div className="
                      inline-flex
                      items-center
                      gap-2
                      bg-blue-100
                      text-blue-700
                      px-4
                      py-2
                      rounded-full
                      mb-4
                    ">

                      Forecast Analytics

                    </div>

                    <h2 className="
                      text-4xl
                      font-bold
                      text-blue-950
                    ">

                      Forecast Command Center

                    </h2>

                    <p className="
                      text-slate-600
                      mt-3
                    ">

                      AI-generated sales and revenue forecasting insights.

                    </p>

                  </div>

                  <div className="
                    grid
                    grid-cols-3
                    gap-4
                    mt-6
                    xl:mt-0
                  ">

                    <div className="
                      bg-slate-50
                      rounded-2xl
                      px-5
                      py-4
                      text-center
                    ">

                      <p className="text-slate-500 text-sm">

                        Model

                      </p>

                      <p className="
                        font-bold
                        text-blue-700
                      ">

                        {model}

                      </p>

                    </div>

                    <div className="
                      bg-slate-50
                      rounded-2xl
                      px-5
                      py-4
                      text-center
                    ">

                      <p className="text-slate-500 text-sm">

                        Duration

                      </p>

                      <p className="
                        font-bold
                        text-green-600
                      ">

                        {duration}

                      </p>

                    </div>

                    <div className="
                      bg-slate-50
                      rounded-2xl
                      px-5
                      py-4
                      text-center
                    ">

                      <p className="text-slate-500 text-sm">

                        Records

                      </p>

                      <p className="
                        font-bold
                        text-purple-600
                      ">

                        {forecastData.length}

                      </p>

                    </div>

                  </div>

                </div>

                {/* FORECAST SUMMARY */}

                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-6
                  mt-8
                ">

                  <div className="
                    bg-gradient-to-br from-green-500 to-emerald-600 text-white
                    backdrop-blur-xl
                    rounded-[30px]
                    p-8
                    shadow-xl
                    border-l-4
                    border-green-500
                  ">

                    <p className="text-black-800">

                      Latest Predicted Revenue

                    </p>

                    <h2 className="
                      text-4xl
                      font-bold
                      text-black-600
                      mt-4
                    ">

                      ₹

                      {

                        forecastData.length > 0

                        ?

                        Math.round(

                          forecastData[
                            forecastData.length - 1
                          ]?.predicted_revenue || 0

                        ).toLocaleString()

                        :

                        0

                      }

                    </h2>

                  </div>

                  <div className="
                    bg-gradient-to-br from-blue-500 to-cyan-600 text-white
                    backdrop-blur-xl
                    rounded-[30px]
                    p-8
                    shadow-xl
                    border-l-4
                    border-blue-500
                  ">

                    <p className="text-black-800">

                      Latest Predicted Sales

                    </p>

                    <h2 className="
                      text-4xl
                      font-bold
                      text-black-600
                      mt-4
                    ">

                      {

                        forecastData.length > 0

                        ?

                        Math.round(

                          forecastData[
                            forecastData.length - 1
                          ]?.predicted_sales || 0

                        ).toLocaleString()

                        :

                        0

                      }

                    </h2>

                  </div>

                  <div className="
                    bg-gradient-to-br from-purple-500 to-indigo-600 text-white
                    backdrop-blur-xl
                    rounded-[30px]
                    p-8
                    shadow-xl
                    border-l-4
                    border-purple-500
                  ">

                    <p className="text-black-800">

                      Forecast Horizon

                    </p>

                    <h2 className="
                      text-4xl
                      font-bold
                      text-black-600
                      mt-4
                    ">

                      {duration}

                    </h2>

                  </div>

                </div>

                {/* FORECAST CHART */}

                <div className="
                  h-[550px]
                  bg-gradient-to-br
                  from-slate-900
                  via-slate-800
                  to-slate-900
                  rounded-[35px]
                  p-6
                  shadow-2xl
                  mt-8
                ">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={forecastData}
                    >

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="date" />

                      <YAxis />

                      <Tooltip />

                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="predicted_sales"
                        stroke="#2563eb"
                        strokeWidth={4}
                        name="Predicted Sales"
                      />

                      <Line
                        type="monotone"
                        dataKey="predicted_revenue"
                        stroke="#16a34a"
                        strokeWidth={4}
                        name="Predicted Revenue"
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>
                    
              </div>
            )
          }

        </div>

      </div>

    </MainLayout>
  );
};


export default Forecast;