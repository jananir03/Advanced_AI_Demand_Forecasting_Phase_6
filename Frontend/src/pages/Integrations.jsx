import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

const Integrations = () => {

  const [integrations,
    setIntegrations] = useState([]);

  const [loading,
    setLoading] = useState(true);

  const [connectionResult,
    setConnectionResult] = useState(null);

  const [formData,
    setFormData] = useState({

      name: "",

      integration_type: "",

      api_url: "",

      api_key: ""
    });

  useEffect(() => {

    fetchIntegrations();

  }, []);

  const fetchIntegrations =
    async () => {

      try {

        const response =
          await API.get(
            "/integrations/"
          );

        setIntegrations(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
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

  const createIntegration =
    async () => {

      try {

        await API.post(

          "/integrations/",

          formData
        );

        alert(
          "Integration Created Successfully"
        );

        setFormData({

          name: "",

          integration_type: "",

          api_url: "",

          api_key: ""
        });

        fetchIntegrations();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Create Integration"
        );
      }
    };

  const toggleIntegration =
    async (id) => {

      try {

        await API.put(

          `/integrations/${id}/toggle`
        );

        fetchIntegrations();

      } catch (error) {

        console.log(error);
      }
    };

  const testConnection =
    async () => {

      try {

        const response =
          await API.get(

            "/integrations/test-connection"
          );

        setConnectionResult(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (loading) {

    return (

      <MainLayout>

        <h1 className="text-3xl font-bold">

          Loading Integrations...

        </h1>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="space-y-10">

        <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <h1 className="text-5xl font-bold text-blue-950">

            Enterprise Integrations

          </h1>

          <p className="text-lg text-slate-700 mt-4">

            Manage ERP, Inventory and External API Integrations

          </p>

        </div>

                {/* ----------------------------------- */}
        {/* CREATE INTEGRATION */}
        {/* ----------------------------------- */}

        <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-blue-950 mb-8">

            Create Integration

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

              placeholder="Integration Name"

              className="p-4 rounded-2xl border border-slate-300"
            />

            <input

              type="text"

              name="integration_type"

              value={formData.integration_type}

              onChange={handleChange}

              placeholder="Integration Type"

              className="p-4 rounded-2xl border border-slate-300"
            />

            <input

              type="text"

              name="api_url"

              value={formData.api_url}

              onChange={handleChange}

              placeholder="API URL"

              className="p-4 rounded-2xl border border-slate-300"
            />

            <input

              type="text"

              name="api_key"

              value={formData.api_key}

              onChange={handleChange}

              placeholder="API Key"

              className="p-4 rounded-2xl border border-slate-300"
            />

          </div>

          <button

            onClick={createIntegration}

            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
          >

            Create Integration

          </button>

        </div>

        {/* ----------------------------------- */}
        {/* TEST CONNECTION */}
        {/* ----------------------------------- */}

        <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <div className="flex justify-between items-center">

            <h2 className="text-3xl font-bold text-blue-950">

              External API Connection Test

            </h2>

            <button

              onClick={testConnection}

              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold"
            >

              Test Connection

            </button>

          </div>

          {

            connectionResult && (

              <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200">

                <p className="text-lg">

                  <strong>Status:</strong>

                  {" "}

                  {connectionResult.status}

                </p>

                <p className="text-lg mt-2">

                  <strong>Connection:</strong>

                  {" "}

                  {connectionResult.connection}

                </p>

                <p className="text-lg mt-2">

                  <strong>Message:</strong>

                  {" "}

                  {connectionResult.message}

                </p>

              </div>

            )
          }

        </div>

                {/* ----------------------------------- */}
        {/* INTEGRATION LIST */}
        {/* ----------------------------------- */}

        <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-blue-950 mb-8">

            Active Integrations

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-4">
                    ID
                  </th>

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Type
                  </th>

                  <th className="text-left p-4">
                    API URL
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  integrations.map(

                    (integration) => (

                      <tr
                        key={integration.id}
                        className="border-b"
                      >

                        <td className="p-4">

                          {integration.id}

                        </td>

                        <td className="p-4">

                          {integration.name}

                        </td>

                        <td className="p-4">

                          {integration.integration_type}

                        </td>

                        <td className="p-4">

                          {integration.api_url}

                        </td>

                        <td className="p-4">

                          {

                            integration.is_active

                              ? (

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">

                                  Active

                                </span>

                              )

                              : (

                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">

                                  Inactive

                                </span>

                              )
                          }

                        </td>

                        <td className="p-4">

                          <button

                            onClick={() =>

                              toggleIntegration(
                                integration.id
                              )
                            }

                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                          >

                            Toggle

                          </button>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* ----------------------------------- */}
        {/* WEBHOOK SUPPORT */}
        {/* ----------------------------------- */}

        <div className="bg-white/60 backdrop-blur-xl rounded-[35px] p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-blue-950 mb-6">

            Webhook Integration Support

          </h2>

          <div className="space-y-4">

            <div className="bg-white rounded-2xl p-6">

              <p className="font-semibold">

                Endpoint:

              </p>

              <p>

                /integrations/webhooks/inventory-update

              </p>

            </div>

            <div className="bg-white rounded-2xl p-6">

              <p>

                Supports real-time inventory updates through external systems.

              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default Integrations;