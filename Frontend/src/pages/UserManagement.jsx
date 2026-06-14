import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  Users,
  UserPlus,
  Trash2,
  Shield,
  Search,
  UserCheck,
  UserX
} from "lucide-react";

const UserManagement = () => {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [newUser,
    setNewUser] =
    useState({

      username: "",

      email: "",

      password: "",

      role: "viewer"
    });

  const fetchUsers =
    async () => {

      try {

        const response =
          await API.get(
            "/user-management/users"
          );

        setUsers(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  const createUser =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await API.post(
          "/user-management/users",
          newUser
        );

        setMessage(
          "User created successfully"
        );

        setNewUser({

          username: "",

          email: "",

          password: "",

          role: "viewer"
        });

        fetchUsers();

      } catch (error) {

        setMessage(
          "Failed to create user"
        );

      } finally {

        setLoading(false);
      }
    };

  const toggleStatus =
  async (id) => {

    try {

      await API.put(
        `/user-management/users/${id}/toggle-status`
      );

      fetchUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const changeRole =
    async (

      userId,

      role

    ) => {

      try {

        await API.put(

          `/user-management/users/${userId}/role?role=${role}`
        );

        fetchUsers();

      } catch (error) {

        console.log(error);
      }
    };


  const filteredUsers =

    users.filter(

      user =>

        user.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        user.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const activeUsers =

    users.filter(

      user =>

        user.status ===
        "active"
    ).length;

  const inactiveUsers =

    users.filter(

      user =>

        user.status ===
        "inactive"
    ).length;

  return (

    <MainLayout>

      <div className="min-h-screen p-8">

        <div className="space-y-8">
                  {/* HEADER */}

          <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

            <h1 className="text-4xl font-bold text-blue-950">

              User Management

            </h1>

            <p className="text-slate-600 mt-3">

              Manage users, roles, permissions and account status.

            </p>

          </div>

          {

            message && (

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">

                {message}

              </div>
            )
          }

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <Users
                size={35}
                className="text-blue-600 mb-3"
              />

              <h3 className="text-slate-600">

                Total Users

              </h3>

              <h1 className="text-4xl font-bold text-blue-950">

                {users.length}

              </h1>

            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <UserCheck
                size={35}
                className="text-green-600 mb-3"
              />

              <h3 className="text-slate-600">

                Active Users

              </h3>

              <h1 className="text-4xl font-bold text-blue-950">

                {activeUsers}

              </h1>

            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <UserX
                size={35}
                className="text-red-600 mb-3"
              />

              <h3 className="text-slate-600">

                Inactive Users

              </h3>

              <h1 className="text-4xl font-bold text-blue-950">

                {inactiveUsers}

              </h1>

            </div>

          </div>

          {/* CREATE USER */}

          <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-blue-950 mb-6 flex items-center gap-2">

              <UserPlus size={25} />

              Create User

            </h2>

            <form
              onSubmit={createUser}
              className="grid md:grid-cols-4 gap-4"
            >

              <input

                type="text"

                placeholder="Username"

                value={newUser.username}

                onChange={(e) =>
                  setNewUser({

                    ...newUser,

                    username:
                      e.target.value
                  })
                }

                className="p-4 rounded-2xl border"
              />

              <input

                type="email"

                placeholder="Email"

                value={newUser.email}

                onChange={(e) =>
                  setNewUser({

                    ...newUser,

                    email:
                      e.target.value
                  })
                }

                className="p-4 rounded-2xl border"
              />

              <input

                type="password"

                placeholder="Password"

                value={newUser.password}

                onChange={(e) =>
                  setNewUser({

                    ...newUser,

                    password:
                      e.target.value
                  })
                }

                className="p-4 rounded-2xl border"
              />

              <select

                value={newUser.role}

                onChange={(e) =>
                  setNewUser({

                    ...newUser,

                    role:
                      e.target.value
                  })
                }

                className="p-4 rounded-2xl border"
              >

                <option value="viewer">

                  Viewer

                </option>

                <option value="analyst">

                  Analyst

                </option>

                <option value="super_admin">

                  Super Admin

                </option>

              </select>

              <button

                disabled={loading}

                className="md:col-span-4 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:scale-105 transition"
              >

                {

                  loading

                    ? "Creating..."

                    : "Create User"
                }

              </button>

            </form>

          </div>

          {/* SEARCH */}

          <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input

                type="text"

                placeholder="Search users..."

                value={search}

                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }

                className="w-full pl-12 p-4 rounded-2xl border"
              />

            </div>

          </div>
                    {/* USERS TABLE */}

          <div className="bg-white/40 backdrop-blur-xl rounded-[35px] p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-blue-950 mb-6">

              User Directory

            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-4">

                      ID

                    </th>

                    <th className="text-left p-4">

                      Username

                    </th>

                    <th className="text-left p-4">

                      Email

                    </th>

                    <th className="text-left p-4">

                      Role

                    </th>

                    <th className="text-left p-4">

                      Status

                    </th>

                    <th className="text-left p-4">

                      Actions

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredUsers.map(

                      (user) => (

                        <tr

                          key={user.id}

                          className="border-b hover:bg-white/20 transition"
                        >

                          <td className="p-4 font-medium">

                            {user.id}

                          </td>

                          <td className="p-4">

                            {user.username}

                          </td>

                          <td className="p-4">

                            {user.email}

                          </td>

                          <td className="p-4">

                            <select

                              value={user.role}

                              onChange={(e) =>

                                changeRole(

                                  user.id,

                                  e.target.value
                                )
                              }

                              className="border rounded-xl px-3 py-2"
                            >

                              <option value="viewer">

                                Viewer

                              </option>

                              <option value="analyst">

                                Analyst

                              </option>

                              <option value="super_admin">

                                Super Admin

                              </option>

                            </select>

                          </td>

                          <td className="p-4">

                            {

                              user.status ===
                              "active"

                                ? (

                                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-medium">

                                    Active

                                  </span>

                                )

                                : (

                                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-xl font-medium">

                                    Inactive

                                  </span>

                                )
                            }

                          </td>

                          <td className="p-4">

                            <div className="flex gap-3">

                              <button

                                onClick={() =>

                                  toggleStatus(
                                    user.id
                                  )
                                }

                                className={`px-4 py-2 rounded-xl text-white font-medium transition hover:scale-105 ${
                                  user.status ===
                                  "active"

                                    ? "bg-orange-500"

                                    : "bg-green-600"
                                }`}
                              >

                                {

                                  user.status ===
                                  "active"

                                    ? "Deactivate"

                                    : "Activate"
                                }

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

        </div>

      </div>

    </MainLayout>

  );
};

export default UserManagement;