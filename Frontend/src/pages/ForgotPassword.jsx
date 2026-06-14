import { useState } from "react";

import { Link } from "react-router-dom";

import {
  Eye,
  EyeOff,
  Lock
} from "lucide-react";

import API from "../services/api";

const ForgotPassword = () => {

  const [

    currentPassword,

    setCurrentPassword

  ] = useState("");

  const [

    newPassword,

    setNewPassword

  ] = useState("");

  const [

    confirmPassword,

    setConfirmPassword

  ] = useState("");

  const [

    message,

    setMessage

  ] = useState("");

  const [

    loading,

    setLoading

  ] = useState(false);

  const [

    showCurrent,

    setShowCurrent

  ] = useState(false);

  const [

    showNew,

    setShowNew

  ] = useState(false);

  const [

    showConfirm,

    setShowConfirm

  ] = useState(false);

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (

      newPassword !==
      confirmPassword

    ) {

      setMessage(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      await API.post(

        "/user-management/reset-password",

        {
          new_password:
            newPassword
        }
      );

      setMessage(
        "Password reset successful"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      setMessage(
        "Password reset failed"
      );

    } finally {

      setLoading(false);
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

            <Lock className="text-white" />

          </div>

          <h2 className="text-4xl font-bold text-blue-950">

            Security Center

          </h2>

        </div>

        <h1 className="text-6xl font-extrabold text-blue-950 leading-tight">

          Reset Password

        </h1>

        <p className="text-3xl mt-6 text-slate-600">

          Secure your account instantly

        </p>

      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center relative z-10">

        <div className="bg-white/90 backdrop-blur-lg w-[520px] rounded-[40px] shadow-2xl p-12">

          <div className="flex justify-center mb-8">

            <div className="bg-blue-100 p-8 rounded-full">

              <Lock
                size={50}
                className="text-blue-600"
              />

            </div>

          </div>

          <h2 className="text-5xl font-bold text-center text-blue-950">

            Forgot Password

          </h2>

          <p className="text-center text-slate-500 text-lg mt-4 mb-10">

            Reset your account password

          </p>

          {

            message && (

              <div className="bg-blue-100 text-blue-700 p-4 rounded-xl mb-6 text-center">

                {message}

              </div>
            )
          }

          <form
            onSubmit={handleSubmit}
          >

            {/* Current Password */}

            <div className="relative mb-6">

              <input

                type={
                  showCurrent
                    ? "text"
                    : "password"
                }

                placeholder="Current Password"

                value={
                  currentPassword
                }

                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }

                className="w-full border border-slate-200 rounded-2xl p-5 pr-14"
              />

              <button

                type="button"

                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }

                className="absolute right-4 top-1/2 -translate-y-1/2"
              >

                {

                  showCurrent

                    ? (
                      <EyeOff />
                    )

                    : (
                      <Eye />
                    )
                }

              </button>

            </div>

            {/* New Password */}

            <div className="relative mb-6">

              <input

                type={
                  showNew
                    ? "text"
                    : "password"
                }

                placeholder="New Password"

                value={
                  newPassword
                }

                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }

                className="w-full border border-slate-200 rounded-2xl p-5 pr-14"
              />

              <button

                type="button"

                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }

                className="absolute right-4 top-1/2 -translate-y-1/2"
              >

                {

                  showNew

                    ? (
                      <EyeOff />
                    )

                    : (
                      <Eye />
                    )
                }

              </button>

            </div>

            {/* Confirm Password */}

            <div className="relative mb-8">

              <input

                type={
                  showConfirm
                    ? "text"
                    : "password"
                }

                placeholder="Confirm Password"

                value={
                  confirmPassword
                }

                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }

                className="w-full border border-slate-200 rounded-2xl p-5 pr-14"
              />

              <button

                type="button"

                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }

                className="absolute right-4 top-1/2 -translate-y-1/2"
              >

                {

                  showConfirm

                    ? (
                      <EyeOff />
                    )

                    : (
                      <Eye />
                    )
                }

              </button>

            </div>

            <button

              type="submit"

              disabled={loading}

              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-semibold p-5 rounded-2xl hover:scale-105 transition"
            >

              {

                loading

                  ? "Updating..."

                  : "Reset Password"
              }

            </button>

          </form>

          <div className="text-center mt-8">

            <Link

              to="/login"

              className="text-blue-600 font-semibold hover:underline"
            >

              Back To Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;