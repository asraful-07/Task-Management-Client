import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const { handleRegister, manageProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handelSinUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    // Collect input values
    const name = e.target.name.value.trim();
    const photoUrl = e.target.photoUrl.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const conPassword = e.target.conPassword.value.trim();

    // Input validations
    if (!name) {
      setError("Name is required.");
      return;
    }
    if (!photoUrl) {
      setError("Photo URL is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== conPassword) {
      setError("Passwords didn't match.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    try {
      // Register the user
      const result = await handleRegister(email, password);
      const creationTime = result.user?.metadata?.creationTime;

      // Save the user's profile
      await manageProfile(name, photoUrl);

      // Prepare the user data to be saved in the database
      const user = { name, email, creationTime };

      // Save user info to the database
      const response = await fetch(
        "https://project-server-site.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        throw new Error(data.message || "Failed to save user data.");
      }
    } catch (err) {
      // Handle registration errors
      console.error("Registration error:", err);
      setError("Registration failed: " + err.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className="my-container bg-black text-white my-20">
      <div className="mx-auto w-full rounded border border-cyan-500 lg:w-1/2">
        <div className="p-6 md:p-8 lg:p-10">
          <h3 className="text-center text-2xl font-semibold text-cyan-500 md:pb-10 lg:text-4xl">
            Sign Up
          </h3>
          <form onSubmit={handelSinUp} className="space-y-4 lg:space-y-6">
            {/* Name Input */}
            <div>
              <label className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full rounded bg-cyan-600 p-2 outline-none lg:px-3 lg:py-2"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Photo URL:
              </label>
              <input
                type="url"
                name="photoUrl"
                placeholder="Enter your photo URL"
                className="w-full rounded bg-cyan-600 p-2 outline-none lg:px-3 lg:py-2"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full rounded bg-cyan-600 p-2 outline-none lg:px-3 lg:py-2"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Your password"
                  className="w-full rounded bg-cyan-600 p-2 outline-none lg:px-3 lg:py-2"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="label-text block pb-2 font-medium text-gray-300 md:pb-3">
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="conPassword"
                  placeholder="Confirm your password"
                  className="w-full rounded bg-cyan-600 p-2 outline-none lg:px-3 lg:py-2"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600">
                <small>{error}</small>
              </p>
            )}

            {/* Submit Button */}
            <div>
              <input
                type="submit"
                value="Sign Up"
                className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-400 focus:outline-none"
              />
            </div>
          </form>

          {/* Social Login */}
          {/* <div className="pt-4 md:pt-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none">
              Login with Google
            </button>
          </div> */}

          {/* Login Link */}
          <p className="pt-4 text-center text-cyan-500 md:pt-8">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-cyan-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
