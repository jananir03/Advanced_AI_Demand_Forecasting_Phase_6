import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const DEFAULT_WIDGETS = [
  {
    widget_name: "Revenue Analytics",
    widget_type: "analytics",
    is_visible: true,
    position: 1,
  },
  {
    widget_name: "Forecast Accuracy",
    widget_type: "analytics",
    is_visible: true,
    position: 2,
  },
  {
    widget_name: "Business Insights",
    widget_type: "insights",
    is_visible: true,
    position: 3,
  },
  {
    widget_name: "Top Products",
    widget_type: "analytics",
    is_visible: true,
    position: 4,
  },
  {
    widget_name: "Top Regions",
    widget_type: "analytics",
    is_visible: true,
    position: 5,
  },
  {
    widget_name: "Inventory Risk",
    widget_type: "risk",
    is_visible: true,
    position: 6,
  },
];

export default function DashboardWidgets() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    try {
      const res = await API.get("/dashboard-widgets/");

      if (res.data.length === 0) {
        setWidgets(DEFAULT_WIDGETS);
      } else {
        setWidgets(res.data);
      }
    } catch (error) {
      console.error(error);
      setWidgets(DEFAULT_WIDGETS);
    }
  };

  const toggleWidget = (index) => {
    const updated = [...widgets];

    updated[index].is_visible =
      !updated[index].is_visible;

    setWidgets(updated);
  };

   const deleteWidget = (index) => {
        const updated = widgets.filter(
            (_, i) => i !== index
        );

        setWidgets(updated);
    };


  const saveWidgets = async () => {
    try {
      setLoading(true);

      await API.post(
        "/dashboard-widgets/save",
        widgets
      );

      alert("Dashboard widgets saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save widgets");
    } finally {
      setLoading(false);
    }
  };

  const [showCreateModal, setShowCreateModal] = useState(false);

    const [newWidget, setNewWidget] = useState({
        widget_name: "",
        widget_type: "analytics",
        is_visible: true,
        position: widgets.length + 1,
    });

    const createWidget = () => {
        if (!newWidget.widget_name.trim()) {
            alert("Widget name is required");
            return;
        }

        setWidgets([
            ...widgets,
            {
            ...newWidget,
            position: widgets.length + 1,
            },
        ]);

        setNewWidget({
            widget_name: "",
            widget_type: "analytics",
            is_visible: true,
            position: widgets.length + 2,
        });

        setShowCreateModal(false);
    };

    const [showLayoutModal, setShowLayoutModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
   

    
  return (
    <MainLayout>
      <div className="p-8">

        {/* HERO */}

        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 rounded-[35px] p-10 shadow-xl">

          <h1 className="text-5xl font-bold text-white">
            Dashboard Widgets
          </h1>

          <p className="text-pink-100 mt-4 text-lg">
            Customize your dashboard experience,
            choose which widgets are visible and
            save your personalized dashboard layout.
          </p>

        </div>

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-[30px] p-6 text-white shadow-xl">

                <h3 className="text-xl font-bold">
                    Custom Widgets
                </h3>

                <p className="mt-3 text-violet-100">
                    Create personalized dashboard
                    widget configurations.
                </p>

                <h1 className="text-4xl font-bold mt-6">
                    {widgets.length}
                </h1>

            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-[30px] p-6 text-white shadow-xl">

                <h3 className="text-xl font-bold">
                    Visible Widgets
                </h3>

                <p className="mt-3 text-green-100">
                    Widgets currently displayed
                    on dashboard.
                </p>

                <h1 className="text-4xl font-bold mt-6">

                    {
                    widgets.filter(
                        w => w.is_visible
                    ).length
                    }

                </h1>

            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[30px] p-6 text-white shadow-xl">

                <h3 className="text-xl font-bold">
                    Saved Layouts
                </h3>

                <p className="mt-3 text-cyan-100">
                    Dashboard layout configurations.
                </p>

                <h1 className="text-4xl font-bold mt-6">
                    1
                </h1>

            </div>

            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[30px] p-6 text-white shadow-xl">

                <h3 className="text-xl font-bold">
                    Analytics Controls
                </h3>

                <p className="mt-3 text-rose-100">
                    Drill-down & cross-filter
                    readiness.
                </p>

                <h1 className="text-4xl font-bold mt-6">
                    Active
                </h1>

            </div>

        </div>

        <div className="mt-8">

            <div className="bg-white/90 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            Create Widget
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Add new dashboard widgets and analytics modules.
                        </p>
                        </div>

                        <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold shadow-lg"
                        >
                        Create Widget
                        </button>
                    
                    </div>
                </div>

        </div>

        {/* WIDGET LIST */}

        <div className="mt-10 bg-white rounded-[35px] shadow-xl border border-slate-100 p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-slate-900">
              Available Widgets
            </h2>

            <button
              onClick={saveWidgets}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
            >
              {loading ? "Saving..." : "Save Widgets"}
            </button>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {widgets.map((widget, index) => (

              <div
                key={index}
                className="bg-gradient-to-br from-white to-fuchsia-50 rounded-[28px] p-6 border border-fuchsia-100 shadow-lg"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {widget.widget_name}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      {widget.widget_type}
                    </p>

                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">

                    <input
                      type="checkbox"
                      checked={widget.is_visible}
                      onChange={() =>
                        toggleWidget(index)
                      }
                      className="sr-only peer"
                    />

                    <div className="w-12 h-6 bg-slate-300 rounded-full peer peer-checked:bg-fuchsia-500 transition"></div>

                  </label>

                </div>

                <div className="mt-6 flex justify-between items-center">

                    <span
                        className={
                        widget.is_visible
                            ? "px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold"
                            : "px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold"
                        }
                    >
                        {widget.is_visible
                        ? "Visible"
                        : "Hidden"}
                    </span>

                    <button
                        onClick={() => deleteWidget(index)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                    >
                        Delete
                    </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
      {showCreateModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white rounded-[30px] p-8 w-full max-w-lg shadow-2xl">

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Create Widget
            </h2>

            <div className="space-y-5">

                <input
                type="text"
                placeholder="Widget Name"
                value={newWidget.widget_name}
                onChange={(e) =>
                    setNewWidget({
                    ...newWidget,
                    widget_name: e.target.value,
                    })
                }
                className="w-full border rounded-xl px-4 py-3"
                />

                <select
                value={newWidget.widget_type}
                onChange={(e) =>
                    setNewWidget({
                    ...newWidget,
                    widget_type: e.target.value,
                    })
                }
                className="w-full border rounded-xl px-4 py-3"
                >
                <option value="analytics">
                    Analytics
                </option>

                <option value="forecast">
                    Forecast
                </option>

                <option value="risk">
                    Risk
                </option>

                <option value="insights">
                    Insights
                </option>
                </select>

                <div className="flex gap-4">

                <button
                    onClick={createWidget}
                    className="flex-1 py-3 rounded-xl bg-fuchsia-500 text-white font-semibold"
                >
                    Create
                </button>

                <button
                    onClick={() =>
                    setShowCreateModal(false)
                    }
                    className="flex-1 py-3 rounded-xl bg-slate-200"
                >
                    Cancel
                </button>

                </div>

            </div>

            </div>

        </div>

        )}

        
    </MainLayout>
  );
}