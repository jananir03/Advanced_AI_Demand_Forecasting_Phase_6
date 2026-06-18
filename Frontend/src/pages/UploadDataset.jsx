import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  UploadCloud,
  Database,
  Search,
  History,
  Archive,
  Plus
} from "lucide-react";

const UploadDataset = () => {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [datasets, setDatasets] =
    useState([]);

  const [versions, setVersions] =
    useState([]);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [selectedDataset,
    setSelectedDataset] =
    useState("");

  const [versionName,
    setVersionName] =
    useState("");

  const [creatingVersion,
    setCreatingVersion] =
    useState(false);


  // -----------------------------------
  // Initial Load
  // -----------------------------------

  useEffect(() => {

    fetchDatasets();

    fetchVersions();

  }, []);


  // -----------------------------------
  // Fetch Datasets
  // -----------------------------------

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
  // Fetch Versions
  // -----------------------------------

  const fetchVersions = async () => {

    try {

      const response =
        await API.get(
          "/dataset-versioning/"
        );

      setVersions(
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
  // Upload Dataset
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
  // Create Version
  // -----------------------------------

  const handleCreateVersion =
    async () => {

      if (
        !selectedDataset ||
        !versionName
      ) {

        setError(
          "Select dataset and enter version name"
        );

        return;
      }

      try {

        setCreatingVersion(
          true
        );

        await API.post(

          "/dataset-versioning/create",

          {

            dataset_id:
              parseInt(
                selectedDataset
              ),

            version_name:
              versionName,

            uploaded_by: 1

          }
        );

        setVersionName("");

        setSelectedDataset("");

        fetchVersions();

        setMessage(
          "Dataset version created successfully"
        );

      } catch (error) {

        setError(
          "Failed to create version"
        );

      } finally {

        setCreatingVersion(
          false
        );
      }
    };


  // -----------------------------------
  // Archive Version
  // -----------------------------------

  const handleArchiveVersion =
    async (versionId) => {

      try {

        await API.put(

          `/dataset-versioning/archive/${versionId}`

        );

        fetchVersions();

      } catch (error) {

        console.log(error);
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

      <div className="w-full px-6 space-y-10">


        {/* Heading */}

        <div>

          <h1 className="text-6xl font-bold text-white-950">

            Upload Dataset

          </h1>

          <p className="text-white-700 text-xl mt-4">

            Upload CSV or Excel datasets for AI forecasting analysis.

          </p>

        </div>


        {/* Upload Card */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-xl p-8">


          <div

            className="border-2 border-dashed border-blue-300 rounded-[28px] p-10 text-center bg-blue-50/40 hover:bg-blue-100/40 transition duration-300"

            onDragOver={(e) =>
              e.preventDefault()
            }

            onDrop={handleDrop}
          >

              <div className="flex justify-center mb-10">

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full shadow-xl">

                <UploadCloud
                  size={40}
                  className="text-white"
                />

              </div>

            </div>


            <h2 className="text-3xl font-bold text-blue-950">

              Drag & Drop Files

            </h2>

            <p className="text-slate-600 mt-3">

              or click below to browse files

            </p>

            <p className="text-slate-500 mt-3">

              Supported formats: CSV, XLSX

            </p>


            <div className="mt-6">

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


            <div className="mt-6">

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


            {

              message && (

                <div className="mt-10 bg-green-100 text-green-700 p-5 rounded-2xl text-lg max-w-xl mx-auto">

                  {message}

                </div>

              )
            }


            {

              error && (

                <div className="mt-10 bg-red-100 text-red-700 p-5 rounded-2xl text-lg max-w-xl mx-auto">

                  {error}

                </div>

              )
            }

          </div>

        </div>


        {/* DATASET TABLE */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[40px] shadow-2xl p-10">


          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

            <div>

              <h2 className="text-4xl font-bold text-blue-950">

                Uploaded Datasets

              </h2>

              <p className="text-slate-600 mt-3">

                Search and manage uploaded datasets

              </p>

            </div>


            <div className="relative w-full lg:w-[400px]">

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


          <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100 text-left">

                  <th className="px-6 py-5 text-blue-950 font-bold">

                    Dataset ID

                  </th>

                  <th className="px-6 py-5 text-blue-950 font-bold">

                    Dataset Name

                  </th>

                  <th className="px-6 py-5 text-blue-950 font-bold">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

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

                      <tr
                        key={dataset.id}
                        className="border-t border-slate-200 hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          #{dataset.id}

                        </td>

                        <td className="px-6 py-5 font-medium">

                          {dataset.name}

                        </td>

                        <td className="px-6 py-5">

                          <button

                            onClick={() =>

                              setSelectedDataset(
                                dataset.id
                              )
                            }

                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                          >

                            <Plus size={16} />

                            Create Version

                          </button>

                        </td>

                      </tr>

                    ))

                }

              </tbody>

            </table>

          </div>

        </div>

                {/* DATASET VERSIONING */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[40px] shadow-2xl p-10">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl">

              <History
                className="text-white"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-blue-950">

                Dataset Versioning

              </h2>

              <p className="text-slate-600 mt-2">

                Manage dataset versions and track upload history

              </p>

            </div>

          </div>


          {/* CREATE VERSION */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

            <select

              value={selectedDataset}

              onChange={(e) =>

                setSelectedDataset(
                  e.target.value
                )
              }

              className="px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">

                Select Dataset

              </option>

              {

                datasets.map((dataset) => (

                  <option
                    key={dataset.id}
                    value={dataset.id}
                  >

                    {dataset.name}

                  </option>

                ))
              }

            </select>


            <input

              type="text"

              placeholder="Version Name (Ex: v1.0)"

              value={versionName}

              onChange={(e) =>

                setVersionName(
                  e.target.value
                )
              }

              className="px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
            />


            <button

              onClick={handleCreateVersion}

              disabled={creatingVersion}

              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >

              {

                creatingVersion

                  ? "Creating..."

                  : "Create Version"

              }

            </button>

          </div>


          {/* VERSION HISTORY TABLE */}

          <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100 text-left">

                  <th className="px-6 py-5 font-bold text-blue-950">

                    Version ID

                  </th>

                  <th className="px-6 py-5 font-bold text-blue-950">

                    Dataset ID

                  </th>

                  <th className="px-6 py-5 font-bold text-blue-950">

                    Version Name

                  </th>

                  <th className="px-6 py-5 font-bold text-blue-950">

                    Status

                  </th>

                  <th className="px-6 py-5 font-bold text-blue-950">

                    Created At

                  </th>

                  <th className="px-6 py-5 font-bold text-blue-950">

                    Action

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  versions.map((version) => (

                    <tr

                      key={version.id}

                      className="border-t border-slate-200 hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        #{version.id}

                      </td>

                      <td className="px-6 py-5">

                        {version.dataset_id}

                      </td>

                      <td className="px-6 py-5 font-medium">

                        {version.version_name}

                      </td>

                      <td className="px-6 py-5">

                        <span

                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            version.status === "active"

                              ? "bg-green-100 text-green-700"

                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {version.status}

                        </span>

                      </td>

                      <td className="px-6 py-5">

                        {

                          version.created_at

                            ? new Date(
                                version.created_at
                              ).toLocaleDateString()

                            : "-"
                        }

                      </td>

                      <td className="px-6 py-5">

                        {

                          version.status === "active" && (

                            <button

                              onClick={() =>

                                handleArchiveVersion(
                                  version.id
                                )
                              }

                              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                            >

                              <Archive size={16} />

                              Archive

                            </button>

                          )
                        }

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

export default UploadDataset;