import {
  useEffect,
  useState
} from "react";

import {
  Briefcase,
  MessageSquare,
  Activity,
  Plus
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const ForecastWorkspace = () => {

  const [
    workspaces,
    setWorkspaces
  ] = useState([]);

  const [
    comments,
    setComments
  ] = useState([]);

  const [
    timeline,
    setTimeline
  ] = useState([]);

  const [
    form,
    setForm
  ] = useState({

    workspace_name: "",

    description: ""
  });

  const fetchWorkspaces =
  async () => {

    try {

      const response =
      await API.get(
        "/forecast-workspaces"
      );

      setWorkspaces(
        response.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchComments =
  async () => {

    try {

      const response =
      await API.get(
        "/forecast-collaboration/comments"
      );

      setComments(
        response.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchTimeline =
  async () => {

    try {

      const response =
      await API.get(
        "/forecast-collaboration/activity-timeline"
      );

      setTimeline(
        response.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  const createWorkspace =
  async () => {

    try {

      await API.post(

        "/forecast-workspaces/create",

        {

          workspace_name:
            form.workspace_name,

          description:
            form.description,

          owner_id: 8
        }
      );

      alert(
        "Workspace Created Successfully"
      );

      setForm({

        workspace_name: "",

        description: ""
      });

      fetchWorkspaces();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchWorkspaces();

    fetchComments();

    fetchTimeline();

  }, []);

  return (

    <MainLayout>

      <div className="relative min-h-screen overflow-hidden p-6">


        <div className="relative z-10 w-full">

          {/* HERO */}

          <div className="relative z-10 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 rounded-3xl shadow-xl p-10">

            <h1 className="text-5xl font-bold text-slate-900">

              Forecast Workspace & Collaboration

            </h1>

            <p className="text-slate-600 mt-4 text-lg">

              Create collaborative forecasting workspaces,
              manage forecast discussions, track activity
              history and streamline forecasting operations.

            </p>

          </div>

          {/* STATS */}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 shadow-lg border border-blue-100">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-600">

                  Workspaces

                </h3>

                <Briefcase size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4 text-slate-900">

                {workspaces.length}

              </h1>

            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 shadow-lg border border-blue-100">
              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-600">

                  Activities

                </h3>

                <Activity size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4 text-slate-900">

                {timeline.length}

              </h1>

            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 shadow-lg border border-blue-100">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-slate-600">

                  Collaboration Notes

                </h3>

                <MessageSquare size={24} />

              </div>

              <h1 className="text-4xl font-bold mt-4 text-slate-900">

                {comments.length}

              </h1>

            </div>

          </div>

                    {/* CREATE WORKSPACE */}

          <div className="mt-10 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 backdrop-blur-xl border border-blue-100 backdrop-blur-xl border border-white/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">

            <div className="flex items-center gap-3 mb-8">

              <Plus size={30} />

              <h2 className="text-3xl font-bold text-slate-900">

                Create Workspace

              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-semibold text-slate-600">

                  Workspace Name

                </label>

                <input

                  type="text"

                  value={form.workspace_name}

                  onChange={(e) =>

                    setForm({

                      ...form,

                      workspace_name:
                        e.target.value
                    })
                  }

                  className="w-full mt-2 p-4 rounded-2xl border border-slate-300"

                  placeholder="Retail Forecast Workspace"

                />

              </div>

              <div>

                <label className="font-semibold text-slate-600">

                  Description

                </label>

                <input

                  type="text"

                  value={form.description}

                  onChange={(e) =>

                    setForm({

                      ...form,

                      description:
                        e.target.value
                    })
                  }

                  className="w-full mt-2 p-4 rounded-2xl border border-slate-300"

                  placeholder="Workspace for retail demand planning"

                />

              </div>

            </div>

            <button

              onClick={createWorkspace}

              className="mt-8 bg-blue-600 hover:bg-blue-700 text-slate-900 px-8 py-4 rounded-2xl font-semibold shadow-lg"

            >

              Create Workspace

            </button>

          </div>

          {/* ACTIVE WORKSPACES */}

          <div className="mt-10 bg-gradient-to-br from-slate-50 to-blue-50 backdrop-blur-xl border border-blue-100 backdrop-blur-xl border border-white/50  backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">

            <div className="flex items-center gap-3 mb-8">

              <Briefcase size={30} />

              <h2 className="text-3xl font-bold text-slate-900">

                Active Workspaces

              </h2>

            </div>

            {

              workspaces.length > 0 ? (

                <div className="overflow-x-auto">

                  <table className="w-full text-slate-700">

                    <thead>

                      <tr className="border-b border-slate-200">

                        <th className="text-left p-4">

                          Workspace

                        </th>

                        <th className="text-left p-4">

                          Description

                        </th>

                        <th className="text-left p-4">

                          Status

                        </th>

                        <th className="text-left p-4">

                          Owner

                        </th>

                        <th className="text-left p-4">

                          Created

                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        workspaces.map(

                          (workspace) => (

                            <tr

                              key={workspace.id}

                              className="border-b border-slate-800 hover:bg-slate-800/30"

                            >

                              <td className="p-4 font-semibold">

                                {

                                  workspace.workspace_name

                                }

                              </td>

                              <td className="p-4">

                                {

                                  workspace.description

                                }

                              </td>

                              <td className="p-4">

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">

                                  {

                                    workspace.status

                                  }

                                </span>

                              </td>

                              <td className="p-4">

                                {

                                  workspace.owner_id

                                }

                              </td>

                              <td className="p-4">

                                {

                                  workspace.created_at
                                    ?.split("T")[0]

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

                <div className="bg-white/30 rounded-2xl p-6">

                  No workspaces found.

                </div>

              )

            }

          </div>

                    {/* COLLABORATION + TIMELINE */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* COLLABORATION NOTES */}

            <div className="bg-gradient-to-br from-violet-50 to-purple-100 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">

              <div className="flex items-center gap-3 mb-6">

                <MessageSquare size={28} />

                <h2 className="text-3xl font-bold text-slate-900">

                  Collaboration Notes

                </h2>

              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto">

                {

                  comments.length > 0 ? (

                    comments.map(

                      (item) => (

                        <div

                          key={item.id}

                          className="bg-white/40 rounded-2xl p-5 shadow"

                        >

                          <p className="text-slate-900 font-medium">

                            {

                              item.comment

                            }

                          </p>

                          <div className="mt-3 text-sm text-slate-600">

                            User #

                            {

                              item.user_id

                            }

                          </div>

                          <div className="text-xs text-slate-500 mt-1">

                            {

                              new Date(
                                item.created_at
                              ).toLocaleString()
                            }

                          </div>

                        </div>
                      )
                    )

                  ) : (

                    <div className="bg-white/30 rounded-2xl p-6">

                      No collaboration notes available.

                    </div>

                  )

                }

              </div>

            </div>

            {/* ACTIVITY TIMELINE */}

            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">

              <div className="flex items-center gap-3 mb-6">

                <Activity size={28} />

                <h2 className="text-3xl font-bold text-slate-900">

                  Activity Timeline

                </h2>

              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto">

                {

                  timeline.length > 0 ? (

                    timeline.map(

                      (item, index) => (

                        <div

                          key={index}

                          className="bg-white/40 rounded-2xl p-5 shadow"

                        >

                         <div className="flex items-start gap-3">
                          <div className="w-3 h-3 mt-2 rounded-full bg-cyan-400"></div>
                          <div>
                            <p>{item.activity}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(item.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>

                          <div className="mt-3 text-sm text-slate-600">

                            User #

                            {

                              item.user_id

                            }

                          </div>

                          <div className="text-xs text-slate-500 mt-1">

                            {

                              new Date(
                                item.created_at
                              ).toLocaleString()
                            }

                          </div>

                        </div>
                      )
                    )

                  ) : (

                    <div className="bg-white/30 rounded-2xl p-6">

                      No activity records available.

                    </div>

                  )

                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default ForecastWorkspace;