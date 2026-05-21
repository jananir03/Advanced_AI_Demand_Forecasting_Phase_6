import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {

  UploadCloud,

  Database,

  Search

} from "lucide-react";

const UploadDataset = () => {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [datasets, setDatasets] =
    useState([]);

  const [searchTerm,
    setSearchTerm] =
    useState("");


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

    } catch (error) {

      console.log(error);
    }
  };


  // -----------------------------------
  // Handle File Change
  // -----------------------------------

  const handleFileChange = (e) => {

    const selectedFile =
      e.target.files[0];

    if (selectedFile) {

      setFile(selectedFile);

      setMessage("");

      setError("");
    }
  };


  // -----------------------------------
  // Handle Upload
  // -----------------------------------

  const handleUpload = async () => {

    if (!file) {

      setError(
        "Please select a file"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      setLoading(true);

      setError("");

      const response =
        await API.post(

          "/datasets/upload",

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setMessage(
        response.data.message
      );

      fetchDatasets();

    } catch (err) {

      setError(

        err.response?.data?.detail ||

        "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };


  // -----------------------------------
  // Drag & Drop
  // -----------------------------------

  const handleDrop = (e) => {

    e.preventDefault();

    const droppedFile =
      e.dataTransfer.files[0];

    if (droppedFile) {

      setFile(droppedFile);

      setMessage("");

      setError("");
    }
  };


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto space-y-10">


        {/* Heading */}

        <div>

          <h1 className="text-6xl font-bold text-blue-950">

            Upload Dataset

          </h1>

          <p className="text-slate-700 text-xl mt-4">

            Upload CSV or Excel datasets for AI forecasting analysis.

          </p>

        </div>


        {/* Upload Card */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[40px] shadow-2xl p-14">


          {/* Drag & Drop */}

          <div

            className="border-4 border-dashed border-blue-300 rounded-[40px] p-20 text-center bg-blue-50/40 hover:bg-blue-100/40 transition duration-300"

            onDragOver={(e) =>
              e.preventDefault()
            }

            onDrop={handleDrop}
          >


            {/* Upload Icon */}

            <div className="flex justify-center mb-10">

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-full shadow-xl">

                <UploadCloud

                  size={70}

                  className="text-white"
                />

              </div>

            </div>


            {/* Heading */}

            <h2 className="text-5xl font-bold text-blue-950">

              Drag & Drop Files

            </h2>

            <p className="text-slate-600 text-xl mt-6">

              or click below to browse files

            </p>

            <p className="text-slate-500 mt-3">

              Supported formats: CSV, XLSX

            </p>


            {/* Browse Button */}

            <div className="mt-12">

              <input

                type="file"

                accept=".csv,.xlsx"

                onChange={handleFileChange}

                className="hidden"

                id="datasetUpload"
              />

              <label

                htmlFor="datasetUpload"

                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl text-xl font-semibold cursor-pointer shadow-xl hover:scale-105 transition duration-300"
              >

                Browse Files

              </label>

            </div>


            {/* Selected File */}

            {

              file && (

                <div className="mt-12 bg-white rounded-3xl p-6 shadow-lg border border-blue-100 max-w-xl mx-auto">

                  <p className="text-2xl font-bold text-blue-950">

                    Selected File

                  </p>

                  <p className="text-slate-600 text-lg mt-3">

                    {file.name}

                  </p>

                </div>
              )
            }


            {/* Upload Button */}

            <div className="mt-12">

              <button

                onClick={handleUpload}

                disabled={loading}

                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-2xl text-2xl font-bold shadow-xl hover:scale-105 transition duration-300 disabled:opacity-50"
              >

                {

                  loading

                    ? "Uploading..."

                    : "Upload Dataset"
                }

              </button>

            </div>


            {/* Success */}

            {

              message && (

                <div className="mt-10 bg-green-100 text-green-700 p-5 rounded-2xl text-lg max-w-xl mx-auto">

                  {message}

                </div>
              )
            }


            {/* Error */}

            {

              error && (

                <div className="mt-10 bg-red-100 text-red-700 p-5 rounded-2xl text-lg max-w-xl mx-auto">

                  {error}

                </div>
              )
            }

          </div>

        </div>


        {/* Uploaded Datasets */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[40px] shadow-2xl p-10">


          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">


            <div>

              <h2 className="text-4xl font-bold text-blue-950">

                Uploaded Datasets

              </h2>

              <p className="text-slate-600 mt-3">

                Search and manage uploaded datasets.

              </p>

            </div>


            {/* Search */}

            <div className="relative w-full md:w-[400px]">

              <Search

                className="absolute left-4 top-4 text-slate-400"

                size={22}
              />

              <input

                type="text"

                placeholder="Search datasets..."

                value={searchTerm}

                onChange={(e) =>

                  setSearchTerm(
                    e.target.value
                  )
                }

                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-slate-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          {/* Dataset Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


            {

              datasets

                .filter((dataset) =>

                  dataset.name
                    .toLowerCase()

                    .includes(

                      searchTerm
                        .toLowerCase()
                    )
                )

                .map((dataset) => (

                  <div

                    key={dataset.id}

                    className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-lg hover:scale-[1.02] transition duration-300 border border-white"
                  >


                    {/* Icon */}

                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6">

                      <Database

                        className="text-white"

                        size={30}
                      />

                    </div>


                    {/* Dataset Name */}

                    <h3 className="text-2xl font-bold text-blue-950 break-words">

                      {dataset.name}

                    </h3>


                    {/* Metadata */}

                    <div className="mt-5 space-y-3">

                      <p className="text-slate-700">

                        <span className="font-semibold">

                          Dataset ID:

                        </span>

                        {" "}
                        {dataset.id}

                      </p>

                      <p className="text-slate-700 break-words">

                        <span className="font-semibold">

                          File Path:

                        </span>

                        {" "}
                        {dataset.file_path}

                      </p>

                    </div>

                  </div>
                ))
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default UploadDataset;