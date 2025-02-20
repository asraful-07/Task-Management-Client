import React, { useContext, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { handleLogin, handleGoogleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  // Define fallback route if 'from' is not provided
  const from = location.state?.from || "/";

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await handleLogin(email, password);
      const lastSignInTime = result.user?.metadata?.lastSignInTime;

      const loginInfo = { lastSignInTime };

      // Send PATCH request to update user last login time
      await fetch(`https://project-server-site.vercel.app/users/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  const handleGoogleLoginClick = async () => {
    try {
      await handleGoogleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <section className="bg-black text-white my-container my-20">
      <div className="mx-auto w-full rounded-lg border border-cyan-600 lg:w-1/2 shadow-lg">
        <div className="p-6 md:p-8 lg:p-10">
          <h3 className="text-center text-3xl font-semibold text-cyan-500 md:pb-10 lg:text-4xl">
            Login
          </h3>
          <form onSubmit={handleLoginSubmit} className="space-y-4 lg:space-y-6">
            <div>
              <span className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Email:
              </span>
              <input
                ref={emailRef}
                required
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg bg-gray-800 text-white p-2 outline-none focus:ring-2 focus:ring-cyan-500 lg:px-3 lg:py-2"
              />
            </div>
            <div>
              <span className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Password:
              </span>
              <div className="relative">
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full rounded-lg bg-gray-800 text-white p-2 outline-none focus:ring-2 focus:ring-cyan-500 lg:px-3 lg:py-2"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className="text-xs text-cyan-400 hover:underline mt-2">
                Forget password?
              </button>
            </div>
            <div>
              {error && (
                <p className="pb-2 text-red-600">
                  <small>{error}</small>
                </p>
              )}
              <input
                type="submit"
                value="Log In"
                className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-500 focus:outline-none"
              />
            </div>
          </form>
          <div className="pt-4 md:pt-6">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none flex items-center justify-center space-x-2"
              onClick={handleGoogleLoginClick}
            >
              {/* Google icon */}
              <FaGoogle size={20} />
              <span>Login with Google</span>
            </button>
          </div>
          <p className="pt-4 text-center text-gray-500 md:pt-8">
            To New Finance Tracker?{" "}
            <Link
              to="/register"
              className="font-medium text-cyan-500 opacity-90"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
