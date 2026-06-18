import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  Workflow,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  Activity,
  Zap,
  Settings,
  ArrowDown
} from "lucide-react";

const WorkflowAutomation = () => {

  const [workflows, setWorkflows] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [formData,
    setFormData] =
    useState({

      workflow_name: "",

      workflow_type: "",

      trigger_event: ""

    });

  useEffect(() => {

    loadWorkflows();

    loadSummary();

  }, []);

  const loadWorkflows =
    async () => {

      try {

        const response =
          await API.get(
            "/workflow-automation/"
          );

        setWorkflows(
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
            "/workflow-automation/stats/summary"
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

  const createWorkflow =
    async () => {

      try {

        await API.post(

          "/workflow-automation/",

          {

            workflow_name:
              formData.workflow_name,

            workflow_type:
              formData.workflow_type,

            trigger_event:
              formData.trigger_event

          }

        );

        setMessage(
          "🚀 Workflow deployed successfully"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          workflow_name: "",

          workflow_type: "",

          trigger_event: ""

        });

        loadWorkflows();

        loadSummary();

      } catch (error) {

        console.log(error);

      }

    };

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">

          <h1 className="text-3xl font-bold">

            Loading Workflow Engine...

          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8 px-6">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 p-10 shadow-2xl">

          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full mb-5">

                <Workflow size={18} />

                Workflow Automation Control Tower

              </div>

              <h1 className="text-5xl font-bold text-white">

                Intelligent Workflow Engine

              </h1>

              <p className="text-slate-300 mt-4 text-lg max-w-3xl">

                Build, deploy, execute and monitor
                automated business workflows across
                forecasting operations.

              </p>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">

                <p className="text-slate-300">

                  Active Automations

                </p>

                <h2 className="text-6xl font-bold text-orange-400 mt-2">

                  {summary?.active || 0}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* WORKFLOW PIPELINE */}

        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center gap-3 mb-10">

            <Zap
              size={30}
              className="text-orange-600"
            />

            <h2 className="text-3xl font-bold text-blue-950">

              Workflow Lifecycle Engine

            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">

            <div className="bg-blue-50 rounded-3xl p-6 text-center">

              <Settings
                size={40}
                className="mx-auto text-blue-600"
              />

              <h3 className="font-bold mt-3">

                Created

              </h3>

            </div>

            <div className="flex justify-center">

              <ArrowDown
                className="text-slate-400"
                size={28}
              />

            </div>

            <div className="bg-green-50 rounded-3xl p-6 text-center">

              <PlayCircle
                size={40}
                className="mx-auto text-green-600"
              />

              <h3 className="font-bold mt-3">

                Active

              </h3>

            </div>

            <div className="flex justify-center">

              <ArrowDown
                className="text-slate-400"
                size={28}
              />

            </div>

            <div className="bg-yellow-50 rounded-3xl p-6 text-center">

              <Activity
                size={40}
                className="mx-auto text-yellow-600"
              />

              <h3 className="font-bold mt-3">

                Executing

              </h3>

            </div>

            <div className="flex justify-center">

              <ArrowDown
                className="text-slate-400"
                size={28}
              />

            </div>

            <div className="bg-purple-50 rounded-3xl p-6 text-center">

              <CheckCircle2
                size={40}
                className="mx-auto text-purple-600"
              />

              <h3 className="font-bold mt-3">

                Completed

              </h3>

            </div>

          </div>

        </div>

                {/* WORKFLOW STUDIO */}

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

          {/* DEPLOYMENT STUDIO */}

          <div className="xl:col-span-3 bg-white rounded-[35px] p-10 shadow-xl">

            <div className="flex items-center gap-3 mb-8">

              <Workflow
                size={28}
                className="text-orange-600"
              />

              <h2 className="text-3xl font-bold text-blue-950">

                Workflow Studio

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

            <div className="space-y-6">

              <div>

                <label className="block mb-2 font-semibold text-slate-700">

                  Workflow Name

                </label>

                <input

                  type="text"

                  name="workflow_name"

                  value={formData.workflow_name}

                  onChange={handleChange}

                  placeholder="Forecast Approval Automation"

                  className="
                    w-full
                    p-4
                    rounded-2xl
                    border
                    border-slate-300
                  "
                />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-2 font-semibold text-slate-700">

                    Workflow Type

                  </label>

                  <select

                    name="workflow_type"

                    value={formData.workflow_type}

                    onChange={handleChange}

                    className="
                      w-full
                      p-4
                      rounded-2xl
                      border
                      border-slate-300
                    "
                  >

                    <option value="">

                      Select Type

                    </option>

                    <option value="Forecast">

                      Forecast Automation

                    </option>

                    <option value="Approval">

                      Approval Workflow

                    </option>

                    <option value="Notification">

                      Notification Workflow

                    </option>

                    <option value="Data Quality">

                      Data Quality Workflow

                    </option>

                    <option value="Inventory">

                      Inventory Workflow

                    </option>

                  </select>

                </div>

                <div>

                  <label className="block mb-2 font-semibold text-slate-700">

                    Trigger Event

                  </label>

                  <select

                    name="trigger_event"

                    value={formData.trigger_event}

                    onChange={handleChange}

                    className="
                      w-full
                      p-4
                      rounded-2xl
                      border
                      border-slate-300
                    "
                  >

                    <option value="">

                      Select Trigger

                    </option>

                    <option value="Dataset Upload">

                      Dataset Upload

                    </option>

                    <option value="Forecast Generated">

                      Forecast Generated

                    </option>

                    <option value="Approval Request">

                      Approval Request

                    </option>

                    <option value="Quality Alert">

                      Quality Alert

                    </option>

                    <option value="Inventory Threshold">

                      Inventory Threshold

                    </option>

                  </select>

                </div>

              </div>

            </div>

            <div className="mt-10">

              <button

                onClick={createWorkflow}

                className="
                  bg-gradient-to-r
                  from-orange-600
                  to-yellow-500
                  text-white
                  px-10
                  py-4
                  rounded-2xl
                  font-semibold
                  shadow-lg
                "
              >

                🚀 Deploy Workflow

              </button>

            </div>

          </div>

          {/* AUTOMATION TEMPLATES */}

          <div className="xl:col-span-2 space-y-6">

            <div className="bg-gradient-to-br from-orange-600 to-yellow-500 rounded-[35px] p-8 text-white shadow-xl">

              <Zap size={42} />

              <h3 className="text-2xl font-bold mt-5">

                Automation Templates

              </h3>

              <p className="mt-3 text-orange-100">

                Deploy pre-built workflow patterns
                used across forecasting operations.

              </p>

            </div>

            <div className="bg-white rounded-[35px] p-8 shadow-xl">

              <h3 className="font-bold text-xl text-blue-950 mb-6">

                Popular Templates

              </h3>

              <div className="space-y-4">

                <div className="border border-slate-200 rounded-2xl p-4">

                  <h4 className="font-semibold">

                    Forecast Approval Flow

                  </h4>

                  <p className="text-sm text-slate-500 mt-1">

                    Trigger approval automatically
                    after forecast generation.
                  </p>

                </div>

                <div className="border border-slate-200 rounded-2xl p-4">

                  <h4 className="font-semibold">

                    Data Quality Validation

                  </h4>

                  <p className="text-sm text-slate-500 mt-1">

                    Run validation checks after
                    dataset upload.
                  </p>

                </div>

                <div className="border border-slate-200 rounded-2xl p-4">

                  <h4 className="font-semibold">

                    Inventory Alert Workflow

                  </h4>

                  <p className="text-sm text-slate-500 mt-1">

                    Notify stakeholders when stock
                    crosses risk threshold.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* QUICK AUTOMATION LAUNCHER */}

        <div className="bg-slate-900 rounded-[35px] p-10 shadow-2xl">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-white">

                Quick Automation Launcher

              </h2>

              <p className="text-slate-400 mt-2">

                Frequently used workflow automations.

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <PlayCircle
                size={40}
                className="text-green-400"
              />

              <h3 className="text-white font-bold mt-4">

                Auto Forecast

              </h3>

              <p className="text-slate-400 text-sm mt-2">

                Execute forecast generation workflow.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <Workflow
                size={40}
                className="text-orange-400"
              />

              <h3 className="text-white font-bold mt-4">

                Approval Chain

              </h3>

              <p className="text-slate-400 text-sm mt-2">

                Launch approval workflow sequence.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <Activity
                size={40}
                className="text-cyan-400"
              />

              <h3 className="text-white font-bold mt-4">

                Quality Audit

              </h3>

              <p className="text-slate-400 text-sm mt-2">

                Run automated quality validation.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <Settings
                size={40}
                className="text-purple-400"
              />

              <h3 className="text-white font-bold mt-4">

                Inventory Sync

              </h3>

              <p className="text-slate-400 text-sm mt-2">

                Trigger inventory monitoring automation.

              </p>

            </div>

          </div>

        </div>

                {/* LIVE AUTOMATION BOARD */}

        <div className="bg-white rounded-[35px] p-10 shadow-xl">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-blue-950">

                Live Automation Board

              </h2>

              <p className="text-slate-500 mt-2">

                Monitor, execute and control workflow automations in real time.

              </p>

            </div>

            <div className="bg-orange-100 text-orange-700 px-5 py-3 rounded-2xl font-semibold">

              {workflows.length} Workflows

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-4 text-left">

                    Workflow

                  </th>

                  <th className="px-6 py-4 text-left">

                    Type

                  </th>

                  <th className="px-6 py-4 text-left">

                    Trigger

                  </th>

                  <th className="px-6 py-4 text-left">

                    Status

                  </th>

                  <th className="px-6 py-4 text-left">

                    Last Execution

                  </th>

                  <th className="px-6 py-4 text-center">

                    Controls

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  workflows.map(

                    (workflow) => (

                      <tr

                        key={workflow.id}

                        className="
                          border-t
                          hover:bg-slate-50
                        "
                      >

                        <td className="px-6 py-5">

                          <div>

                            <h3 className="font-semibold text-blue-950">

                              {workflow.workflow_name}

                            </h3>

                            <p className="text-sm text-slate-500">

                              ID #{workflow.id}

                            </p>

                          </div>

                        </td>

                        <td className="px-6 py-5">

                          {workflow.workflow_type}

                        </td>

                        <td className="px-6 py-5">

                          {workflow.trigger_event}

                        </td>

                        <td className="px-6 py-5">

                          {

                            workflow.execution_status === "active"

                            ? (

                              <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-semibold">

                                Active

                              </span>

                            )

                            : workflow.execution_status === "paused"

                            ? (

                              <span className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full text-sm font-semibold">

                                Paused

                              </span>

                            )

                            : (

                              <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-semibold">

                                Completed

                              </span>

                            )

                          }

                        </td>

                        <td className="px-6 py-5">

                          {

                            workflow.last_execution

                            ?

                            new Date(
                              workflow.last_execution
                            ).toLocaleString()

                            :

                            <span className="text-slate-400">

                              Never Executed

                            </span>

                          }

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex flex-wrap gap-2 justify-center">

                            <button

                              onClick={async () => {

                                try {

                                  await API.post(

                                    `/workflow-automation/execute/${workflow.id}`

                                  );

                                  loadWorkflows();

                                }

                                catch (err) {

                                  console.log(err);

                                }

                              }}

                              className="
                                bg-green-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                              "
                            >

                              Execute

                            </button>

                            <button

                              onClick={async () => {

                                try {

                                  await API.put(

                                    `/workflow-automation/pause/${workflow.id}`

                                  );

                                  loadWorkflows();

                                  loadSummary();

                                }

                                catch (err) {

                                  console.log(err);

                                }

                              }}

                              className="
                                bg-yellow-500
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                              "
                            >

                              Pause

                            </button>

                            <button

                              onClick={async () => {

                                try {

                                  await API.put(

                                    `/workflow-automation/resume/${workflow.id}`

                                  );

                                  loadWorkflows();

                                  loadSummary();

                                }

                                catch (err) {

                                  console.log(err);

                                }

                              }}

                              className="
                                bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                              "
                            >

                              Resume

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

        {/* WORKFLOW STATUS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-green-50 border border-green-200 rounded-[30px] p-8">

            <PlayCircle
              size={40}
              className="text-green-600"
            />

            <h3 className="text-4xl font-bold text-green-600 mt-4">

              {summary?.active || 0}

            </h3>

            <p className="text-slate-600 mt-2">

              Active Workflows

            </p>

          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-[30px] p-8">

            <PauseCircle
              size={40}
              className="text-yellow-600"
            />

            <h3 className="text-4xl font-bold text-yellow-600 mt-4">

              {summary?.paused || 0}

            </h3>

            <p className="text-slate-600 mt-2">

              Paused Workflows

            </p>

          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-[30px] p-8">

            <CheckCircle2
              size={40}
              className="text-purple-600"
            />

            <h3 className="text-4xl font-bold text-purple-600 mt-4">

              {summary?.completed || 0}

            </h3>

            <p className="text-slate-600 mt-2">

              Completed Workflows

            </p>

          </div>

        </div>

        

      </div>

    </MainLayout>

  );

};

export default WorkflowAutomation;