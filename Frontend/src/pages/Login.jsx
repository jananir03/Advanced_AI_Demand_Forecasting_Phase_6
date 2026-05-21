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

      localStorage.setItem(
        "token",
        response.data.access_token
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

      {/* LEFT BLUE GLOW */}

      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600/40 rounded-full blur-3xl"></div>

      {/* RIGHT PURPLE GLOW */}

      <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>

      {/* BOTTOM LIGHT GLOW */}

      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-cyan-200/20 rounded-full blur-3xl"></div>

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-24 relative z-10">

        {/* Logo */}

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

        {/* Heading */}

        <h1 className="text-7xl font-extrabold text-blue-950 leading-tight">

          AI Forecast

        </h1>

        <p className="text-4xl mt-6 text-slate-600">

          AI Analytics Platform

        </p>

        {/* Underline */}

        <div className="w-28 h-2 bg-blue-600 rounded-full mt-10"></div>

        {/* Analytics Line */}

        <div className="mt-20">

          <svg width="550" height="200">

            <polyline

              fill="none"

              stroke="#dbeafe"

              strokeWidth="5"

              points="0,150 80,80 160,130 240,60 320,110 400,40 500,120"
            />

            <circle cx="80" cy="80" r="10" fill="#dbeafe" />

            <circle cx="240" cy="60" r="10" fill="#dbeafe" />

            <circle cx="400" cy="40" r="10" fill="#dbeafe" />

          </svg>

        </div>

      </div>

      {/* RIGHT LOGIN CARD */}

      <div className="flex w-full lg:w-1/2 items-center justify-center relative z-10">

        <div className="bg-white/90 backdrop-blur-lg w-[500px] rounded-[40px] shadow-2xl p-14">

          {/* Icon */}

          <div className="flex justify-center mb-8">

            <div className="bg-blue-100 p-8 rounded-full">

              <span className="text-5xl text-blue-600">

                📈

              </span>

            </div>

          </div>

          {/* Heading */}

          <h2 className="text-6xl font-bold text-center text-blue-950">

            Welcome Back

          </h2>

          <p className="text-center text-slate-500 text-xl mt-5 mb-12">

            Sign in to continue to your dashboard

          </p>

          {/* Error */}

          {error && (

            <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 text-center">

              {error}

            </div>
          )}

          {/* Form */}

          <form onSubmit={handleSubmit}>

            {/* Username */}

            <input

              type="text"

              name="username"

              placeholder="Username"

              className="w-full border border-slate-200 rounded-2xl p-5 text-lg mb-6 outline-none focus:ring-4 focus:ring-blue-200"

              onChange={handleChange}
            />

            {/* Password */}

            <input

              type="password"

              name="password"

              placeholder="Password"

              className="w-full border border-slate-200 rounded-2xl p-5 text-lg mb-8 outline-none focus:ring-4 focus:ring-blue-200"

              onChange={handleChange}
            />

            {/* Login Button */}

            <button

              type="submit"

              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-semibold p-5 rounded-2xl hover:scale-105 transition duration-300 shadow-xl"
            >

              Login

            </button>

          </form>

          {/* Register */}

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