import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  ShieldCheck,
  GitBranch,
  Archive,
  CheckCircle2,
  Clock3,
  Search,
  Plus,
  Activity,
  FileStack,
  Settings,
  TrendingUp,
  X
} from "lucide-react";

const ForecastGovernance = () => {

  const [records, setRecords] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [selectedRecord,
    setSelectedRecord] =
    useState(null);

  const [showLifecycleModal,
    setShowLifecycleModal] =
    useState(false);

  const [showApprovalModal,
    setShowApprovalModal] =
    useState(false);

  const [lifecycleStatus,
    setLifecycleStatus] =
    useState("draft");

  const [approvalStatus,
    setApprovalStatus] =
    useState("pending");

  const [formData,
    setFormData] =
    useState({

      forecast_id: "",

      version_number: 1,

      change_summary: ""

    });

  useEffect(() => {

    loadGovernance();

    loadSummary();

  }, []);

  const loadGovernance =
    async () => {

      try {

        const response =
          await API.get(
            "/forecast-governance/"
          );

        setRecords(
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
            "/forecast-governance/stats/summary"
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

  const createGovernanceRecord =
    async () => {

      try {

        await API.post(

          "/forecast-governance/",

          {

            forecast_id:
              Number(
                formData.forecast_id
              ),

            version_number:
              Number(
                formData.version_number
              ),

            change_summary:
              formData.change_summary

          }

        );

        setMessage(
          "✅ Governance record created successfully"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          forecast_id: "",

          version_number: 1,

          change_summary: ""

        });

        loadGovernance();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create governance record"
        );

      }

    };

  const openLifecycleModal =
    (record) => {

      setSelectedRecord(
        record
      );

      setLifecycleStatus(
        record.lifecycle_status
      );

      setShowLifecycleModal(
        true
      );

    };

  const openApprovalModal =
    (record) => {

      setSelectedRecord(
        record
      );

      setApprovalStatus(
        record.approval_status
      );

      setShowApprovalModal(
        true
      );

    };

  const updateLifecycle =
    async () => {

      try {

        await API.put(

          `/forecast-governance/lifecycle/${selectedRecord.id}`,

          {

            lifecycle_status:
              lifecycleStatus

          }

        );

        setShowLifecycleModal(
          false
        );

        loadGovernance();

      } catch (error) {

        console.log(error);

      }

    };

  const updateApproval =
    async () => {

      try {

        await API.put(

          `/forecast-governance/approval-status/${selectedRecord.id}`,

          {

            approval_status:
              approvalStatus

          }

        );

        setShowApprovalModal(
          false
        );

        loadGovernance();

        loadSummary();

      } catch (error) {

        console.log(error);

      }

    };

  const governanceScore =

    summary?.total_records > 0

      ?

      Math.round(

        (
          summary.approved /
          summary.total_records
        ) * 100

      )

      :

      0;

  const filteredRecords =
    records.filter(

      (record) =>

        record.forecast_id
          ?.toString()
          .includes(searchTerm)

        ||

        record.lifecycle_status
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        record.approval_status
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    );

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">

          <h1 className="text-3xl text-white font-bold">

            Loading Governance Center...

          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8 px-6">

        {/* HERO SECTION */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-10 shadow-2xl">

          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full mb-5">

                <ShieldCheck size={18} />

                Forecast Governance Center

              </div>

              <h1 className="text-5xl font-bold text-white">

                Forecast Lifecycle Governance

              </h1>

              <p className="text-slate-300 mt-4 text-lg max-w-3xl">

                Enterprise governance, lifecycle tracking,
                version management and approval oversight
                for forecasting operations.

              </p>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10">

                <p className="text-slate-300 text-sm">

                  Governance Health

                </p>

                <h2 className="text-6xl font-bold text-cyan-400 mt-2">

                  {governanceScore}%

                </h2>

              </div>

            </div>

          </div>

        </div>

                {/* GOVERNANCE METRICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Total Records

                </p>

                <h2 className="text-5xl font-bold text-blue-950 mt-2">

                  {summary?.total_records || 0}

                </h2>

              </div>

              <FileStack
                size={42}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Approved

                </p>

                <h2 className="text-5xl font-bold text-green-600 mt-2">

                  {summary?.approved || 0}

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

                  Pending

                </p>

                <h2 className="text-5xl font-bold text-amber-500 mt-2">

                  {summary?.pending || 0}

                </h2>

              </div>

              <Clock3
                size={42}
                className="text-amber-500"
              />

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Archived

                </p>

                <h2 className="text-5xl font-bold text-purple-600 mt-2">

                  {summary?.archived || 0}

                </h2>

              </div>

              <Archive
                size={42}
                className="text-purple-600"
              />

            </div>

          </div>

        </div>

        {/* FORECAST LIFECYCLE PIPELINE */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <GitBranch
              size={28}
              className="text-indigo-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Forecast Lifecycle Pipeline

            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-slate-100 rounded-3xl p-8 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">

                1

              </div>

              <h3 className="font-bold text-xl mt-4">

                Draft

              </h3>

              <p className="text-slate-500 mt-2">

                Forecast Creation

              </p>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                2

              </div>

              <h3 className="font-bold text-xl mt-4">

                Review

              </h3>

              <p className="text-slate-500 mt-2">

                Governance Review

              </p>

            </div>

            <div className="bg-green-50 rounded-3xl p-8 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-green-600 flex items-center justify-center text-white font-bold">

                3

              </div>

              <h3 className="font-bold text-xl mt-4">

                Approved

              </h3>

              <p className="text-slate-500 mt-2">

                Business Ready

              </p>

            </div>

            <div className="bg-purple-50 rounded-3xl p-8 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">

                4

              </div>

              <h3 className="font-bold text-xl mt-4">

                Archived

              </h3>

              <p className="text-slate-500 mt-2">

                Historical Version

              </p>

            </div>

          </div>

        </div>

        {/* GOVERNANCE ACTION CENTER */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Plus
                size={28}
                className="text-indigo-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Create Governance Record

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

                type="number"

                name="forecast_id"

                value={formData.forecast_id}

                onChange={handleChange}

                placeholder="Forecast ID"

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

                name="version_number"

                value={formData.version_number}

                onChange={handleChange}

                placeholder="Version Number"

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                "
              />

            </div>

            <textarea

              rows={5}

              name="change_summary"

              value={formData.change_summary}

              onChange={handleChange}

              placeholder="Describe forecast changes..."

              className="
                w-full
                mt-6
                p-4
                rounded-2xl
                border
                border-slate-300
                resize-none
              "
            />

            <button

              onClick={createGovernanceRecord}

              className="
                mt-6
                bg-gradient-to-r
                from-indigo-600
                to-cyan-600
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
              "
            >

              Create Governance Record

            </button>

          </div>

          {/* INSIGHT PANEL */}

          <div className="space-y-6">

            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-[30px] p-8 text-white shadow-xl">

              <TrendingUp size={40} />

              <h3 className="text-2xl font-bold mt-5">

                Governance Insights

              </h3>

              <p className="mt-3 text-indigo-100">

                Monitor lifecycle compliance,
                audit readiness and version control.

              </p>

            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl">

              <h3 className="font-bold text-xl text-blue-950 mb-5">

                Governance Statistics

              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Total Versions</span>

                  <span className="font-bold">

                    {summary?.total_records || 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Approved</span>

                  <span className="font-bold text-green-600">

                    {summary?.approved || 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Pending</span>

                  <span className="font-bold text-amber-500">

                    {summary?.pending || 0}

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

              placeholder="Search Forecast ID, Lifecycle Status or Approval Status..."

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

               

        {/* GOVERNANCE CONTROL CENTER */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

        <div className="flex items-center justify-between mb-8">

            <div>

            <h2 className="text-3xl font-bold text-blue-950">

                Governance Control Center

            </h2>

            <p className="text-slate-500 mt-2">

                Manage lifecycle and approval status directly from a single governance table.

            </p>

            </div>

            <div className="bg-indigo-100 px-4 py-3 rounded-2xl">

            <span className="font-semibold text-indigo-700">

                {filteredRecords.length} Records

            </span>

            </div>

        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

            <thead>

                <tr className="bg-slate-100">

                <th className="px-6 py-5 text-left">

                    Forecast

                </th>

                <th className="px-6 py-5 text-left">

                    Version

                </th>

                <th className="px-6 py-5 text-left">

                    Lifecycle

                </th>

                <th className="px-6 py-5 text-left">

                    Approval

                </th>

                <th className="px-6 py-5 text-left">

                    Modified By

                </th>

                <th className="px-6 py-5 text-left">

                    Created

                </th>

                <th className="px-6 py-5 text-center">

                    Actions

                </th>

                </tr>

            </thead>

            <tbody>

                {

                filteredRecords.map(

                    (record) => (

                    <tr

                        key={record.id}

                        className="
                        border-t
                        border-slate-200
                        hover:bg-slate-50
                        "
                    >

                        <td className="px-6 py-5 font-semibold">

                        #{record.forecast_id}

                        </td>

                        <td className="px-6 py-5">

                        V{record.version_number}

                        </td>

                        <td className="px-6 py-5">

                        {

                            record.lifecycle_status === "approved"

                            ?

                            <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm">

                            Approved

                            </span>

                            :

                            record.lifecycle_status === "review"

                            ?

                            <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm">

                            Review

                            </span>

                            :

                            record.lifecycle_status === "archived"

                            ?

                            <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm">

                            Archived

                            </span>

                            :

                            <span className="bg-slate-100 text-slate-700 px-3 py-2 rounded-full text-sm">

                            Draft

                            </span>

                        }

                        </td>

                        <td className="px-6 py-5">

                        {

                            record.approval_status === "approved"

                            ?

                            <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm">

                            Approved

                            </span>

                            :

                            record.approval_status === "pending"

                            ?

                            <span className="bg-amber-100 text-amber-700 px-3 py-2 rounded-full text-sm">

                            Pending

                            </span>

                            :

                            <span className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm">

                            Rejected

                            </span>

                        }

                        </td>

                        <td className="px-6 py-5">

                        User #{record.modified_by}

                        </td>

                        <td className="px-6 py-5">

                        {

                            record.created_at

                            ?

                            new Date(
                            record.created_at
                            ).toLocaleDateString()

                            :

                            "-"
                        }

                        </td>

                        <td className="px-6 py-5">

                        <div className="flex gap-2 justify-center">

                            <button

                            onClick={() =>
                                openLifecycleModal(
                                record
                                )
                            }

                            className="
                                bg-indigo-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                            "
                            >

                            Lifecycle

                            </button>

                            <button

                            onClick={() =>
                                openApprovalModal(
                                record
                                )
                            }

                            className="
                                bg-green-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                            "
                            >

                            Approval

                            </button>

                        </div>

                        </td>

                    </tr>

                    )

                )

                }

            </tbody>

            </table>

        </div>

        </div>

        {/* LIFECYCLE MODAL */}

        {

          showLifecycleModal && (

            <div className="fixed inset-0 bg-black/50 overflow-y-auto z-50 pt-32">

              <div className="bg-white rounded-[30px] p-8 w-full max-w-lg mx-auto">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-bold">

                    Update Lifecycle

                  </h2>

                  <button

                    onClick={() =>
                      setShowLifecycleModal(
                        false
                      )
                    }

                  >

                    <X size={24} />

                  </button>

                </div>

                <select

                  value={lifecycleStatus}

                  onChange={(e) =>
                    setLifecycleStatus(
                      e.target.value
                    )
                  }

                  className="
                    w-full
                    p-4
                    border
                    rounded-2xl
                  "
                >

                  <option value="draft">

                    Draft

                  </option>

                  <option value="review">

                    Review

                  </option>

                  <option value="approved">

                    Approved

                  </option>

                  <option value="archived">

                    Archived

                  </option>

                </select>

                <button

                  onClick={updateLifecycle}

                  className="
                    mt-6
                    w-full
                    bg-indigo-600
                    text-white
                    py-4
                    rounded-2xl
                  "
                >

                  Save Changes

                </button>

              </div>

            </div>

          )

        }

        {/* APPROVAL MODAL */}

        {

          showApprovalModal && (

            <div className="fixed inset-0 bg-black/50 overflow-y-auto z-50 pt-32">

              <div className="bg-white rounded-[30px] p-8 w-full max-w-lg mx-auto">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-bold">

                    Update Approval Status

                  </h2>

                  <button

                    onClick={() =>
                      setShowApprovalModal(
                        false
                      )
                    }

                  >

                    <X size={24} />

                  </button>

                </div>

                <select

                  value={approvalStatus}

                  onChange={(e) =>
                    setApprovalStatus(
                      e.target.value
                    )
                  }

                  className="
                    w-full
                    p-4
                    border
                    rounded-2xl
                  "
                >

                  <option value="pending">

                    Pending

                  </option>

                  <option value="approved">

                    Approved

                  </option>

                  <option value="rejected">

                    Rejected

                  </option>

                </select>

                <button

                  onClick={updateApproval}

                  className="
                    mt-6
                    w-full
                    bg-green-600
                    text-white
                    py-4
                    rounded-2xl
                  "
                >

                  Save Changes

                </button>

              </div>

            </div>

          )

        }

      </div>

    </MainLayout>

  );

};

export default ForecastGovernance;