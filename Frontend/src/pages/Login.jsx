import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",

    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const form = new FormData();

      form.append(
        "username",
        formData.username
      );

      form.append(
        "password",
        formData.password
      );

      const response = await API.post(

        "/login",

        form,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      // -----------------------------------
      // TOKEN
      // -----------------------------------

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // -----------------------------------
      // ROLE
      // -----------------------------------

      localStorage.setItem(
        "role",
        response.data.role
      );

      // -----------------------------------
      // USERNAME
      // -----------------------------------

      localStorage.setItem(
        "username",
        response.data.username
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        "Invalid username or password"
      );
    }
  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-blue-700 via-sky-200 to-indigo-300 relative overflow-hidden">

      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600/40 rounded-full blur-3xl"></div>

      <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-24 relative z-10">

        <div className="flex items-center gap-4 mb-10">

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-xl">

            <span className="text-4xl text-white">

              📈

            </span>

          </div>

          <h2 className="text-4xl font-bold text-blue-950">

            AI Forecast

          </h2>

        </div>

        <h1 className="text-7xl font-extrabold text-blue-950 leading-tight">

          AI Forecast

        </h1>

        <p className="text-4xl mt-6 text-slate-600">

          AI Analytics Platform

        </p>

        <div className="w-28 h-2 bg-blue-600 rounded-full mt-10"></div>

      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center relative z-10">

        <div className="bg-white/90 backdrop-blur-lg w-[500px] rounded-[40px] shadow-2xl p-14">

          <div className="flex justify-center mb-8">

            <div className="bg-blue-100 p-8 rounded-full">

              <span className="text-5xl text-blue-600">

                📈

              </span>

            </div>

          </div>

          <h2 className="text-6xl font-bold text-center text-blue-950">

            Welcome Back

          </h2>

          <p className="text-center text-slate-500 text-xl mt-5 mb-12">

            Sign in to continue to your dashboard

          </p>

          {error && (

            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 text-center">

              {error}

            </div>
          )}

          <form onSubmit={handleSubmit}>

            <input

              type="text"

              name="username"

              placeholder="Username"

              className="w-full border border-slate-200 rounded-2xl p-5 text-lg mb-6 outline-none focus:ring-4 focus:ring-blue-200"

              onChange={handleChange}
            />

            <input

              type="password"

              name="password"

              placeholder="Password"

              className="w-full border border-slate-200 rounded-2xl p-5 text-lg mb-8 outline-none focus:ring-4 focus:ring-blue-200"

              onChange={handleChange}
            />

            <button

              type="submit"

              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-semibold p-5 rounded-2xl hover:scale-105 transition duration-300 shadow-xl"
            >

              Login

            </button>

          </form>

          <p className="text-center text-slate-600 mt-10 text-lg">

            Don’t have an account?

            <Link

              to="/register"

              className="text-blue-600 font-semibold ml-2 hover:underline"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;