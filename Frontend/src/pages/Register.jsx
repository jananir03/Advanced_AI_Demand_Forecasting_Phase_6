import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",

    email: "",

    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/register",
        formData
      );

      setMessage(
        "Registration successful!"
      );

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (err) {

      setMessage(
        "Registration failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-500">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 items-center justify-center p-16 relative overflow-hidden">

        {/* Background Glow */}

        <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute top-20 right-20 w-60 h-60 bg-cyan-300/10 rounded-full blur-3xl"></div>

        {/* Analytics Shapes */}

        <div className="absolute bottom-24 left-20 opacity-20">

          <div className="flex items-end gap-4 h-40">

            <div className="w-6 h-20 bg-white rounded"></div>

            <div className="w-6 h-28 bg-white rounded"></div>

            <div className="w-6 h-16 bg-white rounded"></div>

            <div className="w-6 h-36 bg-white rounded"></div>

            <div className="w-6 h-24 bg-white rounded"></div>

          </div>

        </div>

        {/* Text */}

        <div className="z-10 max-w-lg">

          <h1 className="text-6xl font-extrabold leading-tight text-white">

            Join The Future Of

            <span className="block bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">

              AI Forecasting

            </span>

          </h1>

          <p className="mt-8 text-2xl text-white/90 font-light leading-relaxed">

            Create your account and unlock intelligent forecasting insights.

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">

        <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl p-10">

          {/* Logo */}

          <div className="flex justify-center mb-6">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

              <span className="text-4xl text-white">

                🚀

              </span>

            </div>

          </div>

          {/* Heading */}

          <h2 className="text-4xl font-bold text-center text-gray-800">

            Create Account

          </h2>

          <p className="text-center text-gray-500 mt-3 mb-8">

            Start your AI forecasting journey

          </p>

          {/* Message */}

          {message && (

            <div className="bg-blue-100 text-blue-700 p-3 rounded-lg mb-5 text-center">

              {message}

            </div>
          )}

          {/* Form */}

          <form onSubmit={handleSubmit}>

            <div className="mb-5">

              <input

                type="text"

                name="username"

                placeholder="Username"

                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"

                onChange={handleChange}
              />

            </div>

            <div className="mb-5">

              <input

                type="email"

                name="email"

                placeholder="Email"

                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500"

                onChange={handleChange}
              />

            </div>

            <div className="mb-6">

              <input

                type="password"

                name="password"

                placeholder="Password"

                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500"

                onChange={handleChange}
              />

            </div>

            {/* Button */}

            <button

              type="submit"

              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:scale-105 transition duration-300 shadow-lg"
            >

              Register

            </button>

          </form>

          {/* Login */}

          <p className="text-center mt-8 text-gray-600">

            Already have an account?

            <Link

              to="/login"

              className="text-purple-600 font-semibold ml-2 hover:underline"
            >

              Login!

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;