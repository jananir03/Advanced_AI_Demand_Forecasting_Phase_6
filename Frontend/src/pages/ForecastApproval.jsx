import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  CheckCircle2,
  Clock3,
  XCircle,
  FileCheck,
  Search,
  Send,
  X
} from "lucide-react";

const ForecastApproval = () => {

  const [approvals,
    setApprovals] =
    useState([]);

  const [summary,
    setSummary] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [message,
    setMessage] =
    useState("");

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [showActionModal,
    setShowActionModal] =
    useState(false);

  const [actionType,
    setActionType] =
    useState("");

  const [selectedApproval,
    setSelectedApproval] =
    useState(null);

  const [actionComments,
    setActionComments] =
    useState("");

  const [formData,
    setFormData] =
    useState({

      forecast_id: "",

      comments: ""

    });

  useEffect(() => {

    loadApprovals();

    loadSummary();

  }, []);

  const loadApprovals =
    async () => {

      try {

        const response =
          await API.get(
            "/forecast-approvals/"
          );

        setApprovals(
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
            "/forecast-approvals/stats/summary"
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

  const submitForecast =
    async () => {

      try {

        await API.post(

          "/forecast-approvals/submit",

          {

            forecast_id:
              Number(
                formData.forecast_id
              ),

            comments:
              formData.comments

          }

        );

        setMessage(
          "✅ Forecast submitted successfully for approval!"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          forecast_id: "",

          comments: ""

        });

        loadApprovals();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to submit forecast"
        );
      }
    };

  const openActionModal =
    (

      approval,

      type

    ) => {

      setSelectedApproval(
        approval
      );

      setActionType(
        type
      );

      setActionComments(
        ""
      );

      setShowActionModal(
        true
      );
    };

  const submitAction =
    async () => {

      try {

        if (
          actionType ===
          "approve"
        ) {

          await API.post(

            `/forecast-approvals/approve/${selectedApproval.id}`,

            {

              comments:
                actionComments

            }

          );

        } else {

          await API.post(

            `/forecast-approvals/reject/${selectedApproval.id}`,

            {

              comments:
                actionComments

            }

          );
        }

        setShowActionModal(
          false
        );

        loadApprovals();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Action failed"
        );
      }
    };

  const filteredApprovals =
    approvals.filter(

      (approval) =>

        approval.forecast_id
          ?.toString()
          .includes(
            searchTerm
          )

        ||

        approval.status
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    );

  if (loading) {

    return (

      <MainLayout>

        <h1 className="text-3xl font-bold text-white">

          Loading Forecast Approvals...

        </h1>

      </MainLayout>

    );
  }

  return (
    <MainLayout>

  <div className="w-full px-6 space-y-10">

    {/* PAGE HEADER */}

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1 className="text-5xl font-bold text-white">

            Forecast Approval Center

          </h1>

          <p className="text-slate-300 text-lg mt-4">

            Submit forecasts, review approval requests and manage approval workflows.

          </p>

        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-3xl shadow-xl">

          <FileCheck
            size={60}
            className="text-white"
          />

        </div>

      </div>

    </div>

    {/* SUMMARY CARDS */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* TOTAL */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm">

              Total Requests

            </p>

            <h2 className="text-5xl font-bold text-blue-950 mt-3">

              {summary?.total || 0}

            </h2>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">

            <FileCheck
              size={34}
              className="text-blue-600"
            />

          </div>

        </div>

      </div>

      {/* PENDING */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm">

              Pending

            </p>

            <h2 className="text-5xl font-bold text-amber-500 mt-3">

              {summary?.pending || 0}

            </h2>

          </div>

          <div className="bg-amber-100 p-4 rounded-2xl">

            <Clock3
              size={34}
              className="text-amber-600"
            />

          </div>

        </div>

      </div>

      {/* APPROVED */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm">

              Approved

            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-3">

              {summary?.approved || 0}

            </h2>

          </div>

          <div className="bg-green-100 p-4 rounded-2xl">

            <CheckCircle2
              size={34}
              className="text-green-600"
            />

          </div>

        </div>

      </div>

      {/* REJECTED */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm">

              Rejected

            </p>

            <h2 className="text-5xl font-bold text-red-600 mt-3">

              {summary?.rejected || 0}

            </h2>

          </div>

          <div className="bg-red-100 p-4 rounded-2xl">

            <XCircle
              size={34}
              className="text-red-600"
            />

          </div>

        </div>

      </div>

    </div>

    {/* SEARCH */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-6">

      <div className="relative">

        <Search
          size={22}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input

          type="text"

          placeholder="Search by Forecast ID or Status..."

          value={searchTerm}

          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }

          className="
            w-full
            pl-14
            pr-5
            py-4
            rounded-2xl
            border
            border-slate-300
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />

      </div>

    </div>

        {/* SUBMIT FORECAST */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl">

          <Send
            size={28}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-blue-950">

            Submit Forecast For Approval

          </h2>

          <p className="text-slate-600 mt-2">

            Send forecast results for management review and approval.

          </p>

        </div>

      </div>

      {/* SUCCESS MESSAGE */}

      {

        message && (

          <div
            className="
              mb-6
              bg-green-100
              border
              border-green-300
              text-green-700
              px-5
              py-4
              rounded-2xl
              font-medium
            "
          >

            {message}

          </div>

        )

      }

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FORECAST ID */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Forecast ID

          </label>

          <input

            type="number"

            name="forecast_id"

            value={formData.forecast_id}

            onChange={handleChange}

            placeholder="Enter Forecast ID"

            className="
              w-full
              p-4
              rounded-2xl
              border
              border-slate-300
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

        </div>

        {/* STATUS PREVIEW */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Initial Status

          </label>

          <input

            type="text"

            value="Pending Approval"

            disabled

            className="
              w-full
              p-4
              rounded-2xl
              bg-slate-100
              border
              border-slate-300
              text-slate-500
            "
          />

        </div>

      </div>

      {/* COMMENTS */}

      <div className="mt-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">

          Submission Comments

        </label>

        <textarea

          rows={5}

          name="comments"

          value={formData.comments}

          onChange={handleChange}

          placeholder="Provide additional information about the forecast submission..."

          className="
            w-full
            p-4
            rounded-2xl
            border
            border-slate-300
            outline-none
            focus:ring-2
            focus:ring-orange-500
            resize-none
          "
        />

      </div>

      {/* ACTION BUTTON */}

      <div className="mt-8 flex justify-end">

        <button

          onClick={submitForecast}

          className="
            flex
            items-center
            gap-3
            bg-gradient-to-r
            from-orange-500
            to-red-500
            text-white
            px-8
            py-4
            rounded-2xl
            font-semibold
            shadow-xl
            hover:scale-105
            transition-all
            duration-300
          "
        >

          <Send size={20} />

          Submit For Approval

        </button>

      </div>

    </div>

        {/* APPROVAL REQUESTS TABLE */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-blue-950">

            Approval Requests

          </h2>

          <p className="text-slate-600 mt-2">

            Review submitted forecasts and take approval actions.

          </p>

        </div>

        <div className="bg-orange-100 px-4 py-3 rounded-2xl">

          <span className="font-semibold text-orange-700">

            {filteredApprovals.length} Requests

          </span>

        </div>

      </div>

      {

        filteredApprovals.length > 0 ? (

          <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    ID

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Forecast ID

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Submitted By

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Status

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Comments

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Created

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Approved Date

                  </th>

                  <th className="px-6 py-5 text-center font-bold text-blue-950">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredApprovals.map(

                    (approval) => (

                      <tr

                        key={approval.id}

                        className="
                          border-t
                          border-slate-200
                          hover:bg-slate-50
                          transition-all
                        "
                      >

                        <td className="px-6 py-5">

                          #{approval.id}

                        </td>

                        <td className="px-6 py-5 font-semibold text-blue-950">

                          {approval.forecast_id}

                        </td>

                        <td className="px-6 py-5">

                          User #{approval.submitted_by}

                        </td>

                        <td className="px-6 py-5">

                          {

                            approval.status === "approved"

                              ? (

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Approved

                                </span>

                              )

                              : approval.status === "rejected"

                              ? (

                                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Rejected

                                </span>

                              )

                              : (

                                <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Pending

                                </span>

                              )

                          }

                        </td>

                        <td className="px-6 py-5 max-w-[300px]">

                          <p className="truncate">

                            {approval.comments}

                          </p>

                        </td>

                        <td className="px-6 py-5">

                          {

                            approval.created_at

                              ?

                              new Date(

                                approval.created_at

                              ).toLocaleDateString()

                              :

                              "-"
                          }

                        </td>

                        <td className="px-6 py-5">

                          {

                            approval.approved_at

                              ?

                              new Date(

                                approval.approved_at

                              ).toLocaleDateString()

                              :

                              "-"
                          }

                        </td>

                        <td className="px-6 py-5">

                          {

                            approval.status === "pending"

                              ? (

                                <div className="flex justify-center gap-3">

                                  <button

                                    onClick={() =>
                                      openActionModal(
                                        approval,
                                        "approve"
                                      )
                                    }

                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      bg-green-500
                                      hover:bg-green-600
                                      text-white
                                      px-4
                                      py-2
                                      rounded-xl
                                      transition-all
                                    "
                                  >

                                    <CheckCircle2 size={16} />

                                    Approve

                                  </button>

                                  <button

                                    onClick={() =>
                                      openActionModal(
                                        approval,
                                        "reject"
                                      )
                                    }

                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      bg-red-500
                                      hover:bg-red-600
                                      text-white
                                      px-4
                                      py-2
                                      rounded-xl
                                      transition-all
                                    "
                                  >

                                    <XCircle size={16} />

                                    Reject

                                  </button>

                                </div>

                              )

                              : (

                                <span className="text-slate-400 font-medium">

                                  Completed

                                </span>

                              )

                          }

                        </td>

                      </tr>

                    )

                  )

                }

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center py-20">

            <FileCheck

              size={80}

              className="mx-auto text-slate-300"

            />

            <h3 className="text-2xl font-bold text-slate-500 mt-6">

              No Approval Requests Found

            </h3>

            <p className="text-slate-400 mt-3">

              Submit a forecast to start the approval workflow.

            </p>

          </div>

        )

      }

    </div>

        {/* APPROVE / REJECT MODAL */}

    {

      showActionModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl p-10 relative">

            {/* CLOSE */}

            <button

              onClick={() =>
                setShowActionModal(false)
              }

              className="
                absolute
                top-6
                right-6
                p-2
                rounded-xl
                hover:bg-slate-100
                transition-all
              "
            >

              <X
                size={24}
                className="text-slate-600"
              />

            </button>

            {/* HEADER */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-blue-950">

                {

                  actionType === "approve"

                    ?

                    "Approve Forecast"

                    :

                    "Reject Forecast"

                }

              </h2>

              <p className="text-slate-600 mt-2">

                Forecast ID:

                {" "}

                <span className="font-semibold">

                  {selectedApproval?.forecast_id}

                </span>

              </p>

            </div>

            {/* COMMENTS */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Comments

              </label>

              <textarea

                rows={6}

                value={actionComments}

                onChange={(e) =>
                  setActionComments(
                    e.target.value
                  )
                }

                placeholder="Enter approval or rejection comments..."

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                  outline-none
                  focus:ring-2
                  focus:ring-orange-500
                  resize-none
                "
              />

            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-4 mt-10">

              <button

                onClick={() =>
                  setShowActionModal(false)
                }

                className="
                  px-6
                  py-3
                  rounded-2xl
                  border
                  border-slate-300
                  text-slate-700
                  font-semibold
                  hover:bg-slate-100
                  transition-all
                "
              >

                Cancel

              </button>

              <button

                onClick={submitAction}

                className={`
                  px-8
                  py-3
                  rounded-2xl
                  text-white
                  font-semibold
                  shadow-xl
                  transition-all
                  hover:scale-105

                  ${
                    actionType === "approve"

                      ?

                      "bg-gradient-to-r from-green-500 to-emerald-600"

                      :

                      "bg-gradient-to-r from-red-500 to-rose-600"
                  }
                `}
              >

                {

                  actionType === "approve"

                    ?

                    "Approve Forecast"

                    :

                    "Reject Forecast"

                }

              </button>

            </div>

          </div>

        </div>

      )

    }

  </div>

</MainLayout>

);

};

export default ForecastApproval;