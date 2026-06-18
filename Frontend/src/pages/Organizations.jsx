import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  Activity,
  BriefcaseBusiness,
  X
} from "lucide-react";

const Organizations = () => {

  const [organizations, setOrganizations] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedOrganization,
    setSelectedOrganization] =
    useState(null);

  const [formData, setFormData] =
    useState({

      name: "",

      industry: "",

      description: ""

    });

  const [editFormData,
    setEditFormData] =
    useState({

      name: "",

      industry: "",

      description: "",

      status: "active"

    });

  useEffect(() => {

    loadOrganizations();

    loadSummary();

  }, []);

  const loadOrganizations =
    async () => {

      try {

        const response =
          await API.get(
            "/organizations"
          );

        setOrganizations(
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
            "/organizations/stats/summary"
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

  const handleEditChange =
    (e) => {

      setEditFormData({

        ...editFormData,

        [e.target.name]:
          e.target.value

      });
    };

  const createOrganization =
    async () => {

        try {

        const response =
            await API.post(

            "/organizations/",

            formData

            );
            setMessage(
            "✅ Organization created successfully!"
            );

            setTimeout(() => {

                setMessage("");

            }, 3000);


            setFormData({

                name: "",

                industry: "",

                description: ""

            });

            loadOrganizations();

            loadSummary();

        } catch (error) {

          console.log(error);

          alert(
                error.response?.data?.message ||
                "Failed to create organization"
          );
        }
    };

  const openEditModal =
    (organization) => {

      setSelectedOrganization(
        organization
      );

      setEditFormData({

        name:
          organization.name,

        industry:
          organization.industry,

        description:
          organization.description,

        status:
          organization.status
      });

      setShowEditModal(
        true
      );
    };

  const updateOrganization =
    async () => {

      try {

        await API.put(

          `/organizations/${selectedOrganization.id}`,

          editFormData

        );

        setShowEditModal(
          false
        );

        loadOrganizations();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update organization"
        );
      }
    };

  const deleteOrganization =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this organization?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(

          `/organizations/${id}`

        );

        loadOrganizations();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete organization"
        );
      }
    };

  const filteredOrganizations =
    organizations.filter(

      (organization) =>

        organization.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        organization.industry
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  if (loading) {

    return (


      <MainLayout>

        <h1 className="text-3xl font-bold text-white">

          Loading Organizations...

        </h1>

      </MainLayout>
    );
  }

  return(

    <MainLayout>

  <div className="w-full px-6 space-y-10">

    {/* PAGE HEADER */}

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1 className="text-5xl font-bold text-white">

            Organization Management

          </h1>

          <p className="text-slate-300 text-lg mt-4">

            Manage organizations, industries, business units and enterprise structures.

          </p>

        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-3xl shadow-xl">

          <Building2
            size={60}
            className="text-white"
          />

        </div>

      </div>

    </div>

    {/* SUMMARY CARDS */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {/* TOTAL ORGANIZATIONS */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/40">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm font-medium">

              Total Organizations

            </p>

            <h2 className="text-5xl font-bold text-blue-950 mt-3">

              {summary?.total_organizations || 0}

            </h2>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">

            <Building2
              size={34}
              className="text-blue-600"
            />

          </div>

        </div>

      </div>

      {/* ACTIVE ORGANIZATIONS */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/40">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm font-medium">

              Active Organizations

            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-3">

              {summary?.active_organizations || 0}

            </h2>

          </div>

          <div className="bg-green-100 p-4 rounded-2xl">

            <Activity
              size={34}
              className="text-green-600"
            />

          </div>

        </div>

      </div>

      {/* INDUSTRY COVERAGE */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/40">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm font-medium">

              Industry Coverage

            </p>

            <h2 className="text-5xl font-bold text-purple-600 mt-3">

              {
                new Set(
                  organizations.map(
                    (org) => org.industry
                  )
                ).size
              }

            </h2>

          </div>

          <div className="bg-purple-100 p-4 rounded-2xl">

            <BriefcaseBusiness
              size={34}
              className="text-purple-600"
            />

          </div>

        </div>

      </div>

    </div>

    {/* SEARCH SECTION */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-6">

      <div className="relative">

        <Search
          size={22}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input

          type="text"

          placeholder="Search organizations by name or industry..."

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
            focus:ring-cyan-500
          "
        />

      </div>

    </div>

        {/* CREATE ORGANIZATION */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">

          <Plus
            size={28}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-blue-950">

            Create Organization

          </h2>

          <p className="text-slate-600 mt-2">

            Register a new organization into the forecasting platform.

          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ORGANIZATION NAME */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Organization Name

          </label>

          <input

            type="text"

            name="name"

            value={formData.name}

            onChange={handleChange}

            placeholder="Enter organization name"

            className="
              w-full
              p-4
              rounded-2xl
              border
              border-slate-300
              outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          />

        </div>

        {/* INDUSTRY */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Industry

          </label>

          <input

            type="text"

            name="industry"

            value={formData.industry}

            onChange={handleChange}

            placeholder="Ex: Retail, Healthcare, Manufacturing"

            className="
              w-full
              p-4
              rounded-2xl
              border
              border-slate-300
              outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          />

        </div>

      </div>

      {/* DESCRIPTION */}

      <div className="mt-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">

          Organization Description

        </label>

        <textarea

          rows={5}

          name="description"

          value={formData.description}

          onChange={handleChange}

          placeholder="Describe the organization, business focus, operational goals, etc."

          className="
            w-full
            p-4
            rounded-2xl
            border
            border-slate-300
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            resize-none
          "
        />

      </div>

      {
        message && (

            <div className="
            mt-6
            bg-green-100
            border
            border-green-300
            text-green-700
            px-5
            py-4
            rounded-2xl
            font-medium
            ">

            {message}

            </div>

        )
        }

      {/* ACTION BUTTON */}

      <div className="mt-8 flex justify-end">

        <button

          onClick={createOrganization}

          className="
            flex
            items-center
            gap-3
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
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

          <Plus size={20} />

          Create Organization

        </button>

      </div>

    </div>

        {/* ORGANIZATIONS TABLE */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-blue-950">

            Organizations Directory

          </h2>

          <p className="text-slate-600 mt-2">

            View, update and manage all organizations.

          </p>

        </div>

        <div className="bg-blue-100 px-4 py-3 rounded-2xl">

          <span className="font-semibold text-blue-700">

            {filteredOrganizations.length} Organizations

          </span>

        </div>

      </div>

      {

        filteredOrganizations.length > 0 ? (

          <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    ID

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Organization

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Industry

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Description

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Status

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Created

                  </th>

                  <th className="px-6 py-5 text-center font-bold text-blue-950">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredOrganizations.map(

                    (organization) => (

                      <tr

                        key={organization.id}

                        className="
                          border-t
                          border-slate-200
                          hover:bg-slate-50
                          transition-all
                        "
                      >

                        <td className="px-6 py-5">

                          #{organization.id}

                        </td>

                        <td className="px-6 py-5">

                          <div>

                            <p className="font-semibold text-blue-950">

                              {organization.name}

                            </p>

                          </div>

                        </td>

                        <td className="px-6 py-5">

                          <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-semibold">

                            {organization.industry}

                          </span>

                        </td>

                        <td className="px-6 py-5 max-w-[350px]">

                          <p className="truncate">

                            {organization.description}

                          </p>

                        </td>

                        <td className="px-6 py-5">

                          {

                            organization.status === "active"

                              ? (

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Active

                                </span>

                              )

                              : (

                                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Inactive

                                </span>

                              )

                          }

                        </td>

                        <td className="px-6 py-5">

                          {

                            organization.created_at

                              ?

                              new Date(

                                organization.created_at

                              ).toLocaleDateString()

                              :

                              "-"
                          }

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center justify-center gap-3">

                            {/* EDIT */}

                            <button

                              onClick={() =>

                                openEditModal(
                                  organization
                                )
                              }

                              className="
                                flex
                                items-center
                                gap-2
                                bg-amber-500
                                hover:bg-amber-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                transition-all
                              "
                            >

                              <Edit size={16} />

                              Edit

                            </button>

                            {/* DELETE */}

                            <button

                              onClick={() =>

                                deleteOrganization(
                                  organization.id
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

                              <Trash2 size={16} />

                              Delete

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

        ) : (

          <div className="text-center py-20">

            <Building2

              size={80}

              className="mx-auto text-slate-300"

            />

            <h3 className="text-2xl font-bold text-slate-500 mt-6">

              No Organizations Found

            </h3>

            <p className="text-slate-400 mt-3">

              Create a new organization to get started.

            </p>

          </div>

        )

      }

    </div>

        {/* EDIT MODAL */}

    {

      showEditModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-3xl p-10 relative">

            {/* CLOSE BUTTON */}

            <button

              onClick={() =>
                setShowEditModal(false)
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

                Edit Organization

              </h2>

              <p className="text-slate-600 mt-2">

                Update organization information and status.

              </p>

            </div>

            {/* FORM */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Organization Name

                </label>

                <input

                  type="text"

                  name="name"

                  value={editFormData.name}

                  onChange={handleEditChange}

                  className="
                    w-full
                    p-4
                    rounded-2xl
                    border
                    border-slate-300
                    outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                  "
                />

              </div>

              {/* INDUSTRY */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Industry

                </label>

                <input

                  type="text"

                  name="industry"

                  value={editFormData.industry}

                  onChange={handleEditChange}

                  className="
                    w-full
                    p-4
                    rounded-2xl
                    border
                    border-slate-300
                    outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                  "
                />

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6">

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Description

              </label>

              <textarea

                rows={5}

                name="description"

                value={editFormData.description}

                onChange={handleEditChange}

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                  resize-none
                "
              />

            </div>

            {/* STATUS */}

            <div className="mt-6">

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Status

              </label>

              <select

                name="status"

                value={editFormData.status}

                onChange={handleEditChange}

                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-slate-300
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              >

                <option value="active">

                  Active

                </option>

                <option value="inactive">

                  Inactive

                </option>

              </select>

            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-4 mt-10">

              <button

                onClick={() =>
                  setShowEditModal(false)
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

                onClick={updateOrganization}

                className="
                  px-8
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  text-white
                  font-semibold
                  shadow-xl
                  hover:scale-105
                  transition-all
                "
              >

                Save Changes

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

export default Organizations;
    
