import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  FolderKanban,
  Plus,
  Search,
  Edit,
  Trash2,
  Briefcase,
  CheckCircle2,
  Clock3,
  X
} from "lucide-react";

const Projects = () => {

  const [projects, setProjects] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const [selectedProject,
    setSelectedProject] =
    useState(null);

  const [formData,
    setFormData] =
    useState({

      project_name: "",

      description: "",

      organization_name: "",

      owner_name: ""

    });

  const [editFormData,
    setEditFormData] =
    useState({

      project_name: "",

      description: "",

      organization_name: "",

      owner_name: "",

      status: "active"

    });

  useEffect(() => {

    loadProjects();

    loadSummary();

  }, []);

  const loadProjects =
    async () => {

      try {

        const response =
          await API.get(
            "/projects"
          );

        setProjects(
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
            "/projects/stats/summary"
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

  const createProject =
    async () => {

      try {

        await API.post(

          "/projects/",

          formData

        );

        setMessage(
          "✅ Project created successfully!"
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

        setFormData({

          project_name: "",

          description: "",

          organization_name: "",

          owner_name: ""

        });

        loadProjects();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create project"
        );
      }
    };

  const openEditModal =
    (project) => {

      setSelectedProject(
        project
      );

      setEditFormData({

        project_name:
          project.project_name,

        description:
          project.description,

        organization_name:
          project.organization_name,

        owner_name:
          project.owner_name,

        status:
          project.status
      });

      setShowEditModal(
        true
      );
    };

  const updateProject =
    async () => {

      try {

        await API.put(

          `/projects/${selectedProject.id}`,

          editFormData

        );

        setShowEditModal(
          false
        );

        loadProjects();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update project"
        );
      }
    };

  const deleteProject =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this project?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(

          `/projects/${id}`

        );

        loadProjects();

        loadSummary();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete project"
        );
      }
    };

  const filteredProjects =
    projects.filter(

      (project) =>

        project.project_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        project.organization_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        project.owner_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    );

  if (loading) {

    return (

      <MainLayout>

        <h1 className="text-3xl font-bold text-white">

          Loading Projects...

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

            Project Management

          </h1>

          <p className="text-slate-300 text-lg mt-4">

            Manage enterprise forecasting projects, ownership, execution status and organizational alignment.

          </p>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-3xl shadow-xl">

          <FolderKanban
            size={60}
            className="text-white"
          />

        </div>

      </div>

    </div>

    {/* SUMMARY CARDS */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {/* TOTAL PROJECTS */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/40">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm font-medium">

              Total Projects

            </p>

            <h2 className="text-5xl font-bold text-blue-950 mt-3">

              {summary?.total_projects || 0}

            </h2>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">

            <FolderKanban
              size={34}
              className="text-blue-600"
            />

          </div>

        </div>

      </div>

      {/* ACTIVE PROJECTS */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/40">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm font-medium">

              Active Projects

            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-3">

              {summary?.active_projects || 0}

            </h2>

          </div>

          <div className="bg-green-100 p-4 rounded-2xl">

            <Briefcase
              size={34}
              className="text-green-600"
            />

          </div>

        </div>

      </div>

      {/* COMPLETED PROJECTS */}

      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/40">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm font-medium">

              Completed Projects

            </p>

            <h2 className="text-5xl font-bold text-purple-600 mt-3">

              {summary?.completed_projects || 0}

            </h2>

          </div>

          <div className="bg-purple-100 p-4 rounded-2xl">

            <CheckCircle2
              size={34}
              className="text-purple-600"
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

          placeholder="Search projects, organizations or owners..."

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

        {/* CREATE PROJECT */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl">

          <Plus
            size={28}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-blue-950">

            Create Project

          </h2>

          <p className="text-slate-600 mt-2">

            Register a forecasting project and assign ownership.

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

        {/* PROJECT NAME */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Project Name

          </label>

          <input

            type="text"

            name="project_name"

            value={formData.project_name}

            onChange={handleChange}

            placeholder="Enter project name"

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

        {/* ORGANIZATION NAME */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Organization Name

          </label>

          <input

            type="text"

            name="organization_name"

            value={formData.organization_name}

            onChange={handleChange}

            placeholder="Organization"

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* OWNER */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Project Owner

          </label>

          <input

            type="text"

            name="owner_name"

            value={formData.owner_name}

            onChange={handleChange}

            placeholder="Project owner"

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

        {/* PROJECT TYPE PLACEHOLDER */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Project Category

          </label>

          <input

            type="text"

            value="AI Demand Forecasting"

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

      {/* DESCRIPTION */}

      <div className="mt-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">

          Project Description

        </label>

        <textarea

          rows={5}

          name="description"

          value={formData.description}

          onChange={handleChange}

          placeholder="Describe the project goals, scope and business objectives..."

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

      {/* ACTION BUTTON */}

      <div className="mt-8 flex justify-end">

        <button

          onClick={createProject}

          className="
            flex
            items-center
            gap-3
            bg-gradient-to-r
            from-green-500
            to-emerald-600
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

          Create Project

        </button>

      </div>

    </div>

        {/* PROJECTS TABLE */}

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-blue-950">

            Project Directory

          </h2>

          <p className="text-slate-600 mt-2">

            View, update and manage all forecasting projects.

          </p>

        </div>

        <div className="bg-green-100 px-4 py-3 rounded-2xl">

          <span className="font-semibold text-green-700">

            {filteredProjects.length} Projects

          </span>

        </div>

      </div>

      {

        filteredProjects.length > 0 ? (

          <div className="overflow-x-auto rounded-3xl border border-slate-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    ID

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Project Name

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Organization

                  </th>

                  <th className="px-6 py-5 text-left font-bold text-blue-950">

                    Owner

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

                  filteredProjects.map(

                    (project) => (

                      <tr

                        key={project.id}

                        className="
                          border-t
                          border-slate-200
                          hover:bg-slate-50
                          transition-all
                        "
                      >

                        <td className="px-6 py-5">

                          #{project.id}

                        </td>

                        <td className="px-6 py-5">

                          <p className="font-semibold text-blue-950">

                            {project.project_name}

                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-semibold">

                            {project.organization_name}

                          </span>

                        </td>

                        <td className="px-6 py-5">

                          {project.owner_name}

                        </td>

                        <td className="px-6 py-5 max-w-[300px]">

                          <p className="truncate">

                            {project.description}

                          </p>

                        </td>

                        <td className="px-6 py-5">

                          {

                            project.status === "active"

                              ? (

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Active

                                </span>

                              )

                              : project.status === "completed"

                              ? (

                                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  Completed

                                </span>

                              )

                              : (

                                <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">

                                  On Hold

                                </span>

                              )

                          }

                        </td>

                        <td className="px-6 py-5">

                          {

                            project.created_at

                              ?

                              new Date(

                                project.created_at

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
                                  project
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

                                deleteProject(
                                  project.id
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

            <FolderKanban

              size={80}

              className="mx-auto text-slate-300"

            />

            <h3 className="text-2xl font-bold text-slate-500 mt-6">

              No Projects Found

            </h3>

            <p className="text-slate-400 mt-3">

              Create a new project to get started.

            </p>

          </div>

        )

      }

    </div>

        {/* EDIT PROJECT MODAL */}

    {

      showEditModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl p-10 relative">

            {/* CLOSE */}

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

                Edit Project

              </h2>

              <p className="text-slate-600 mt-2">

                Update project details, ownership and status.

              </p>

            </div>

            {/* FORM */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* PROJECT NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Project Name

                </label>

                <input

                  type="text"

                  name="project_name"

                  value={editFormData.project_name}

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

              {/* ORGANIZATION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Organization

                </label>

                <input

                  type="text"

                  name="organization_name"

                  value={editFormData.organization_name}

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

              {/* OWNER */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Project Owner

                </label>

                <input

                  type="text"

                  name="owner_name"

                  value={editFormData.owner_name}

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

              {/* STATUS */}

              <div>

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

                  <option value="completed">

                    Completed

                  </option>

                  <option value="on_hold">

                    On Hold

                  </option>

                </select>

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

                onClick={updateProject}

                className="
                  px-8
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-600
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

export default Projects;