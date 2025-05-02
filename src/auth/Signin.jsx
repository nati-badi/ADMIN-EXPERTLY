import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Make sure this path is correct
import { toast } from "react-toastify";
import Spinner from "../components/ui/Spinner";

// Schema
const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  rememberMe: z.boolean().optional(),
});

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { setIsSignedIn, setAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://expertly-zxb1.onrender.com/api/v1/login/Admin",
        {
          email: data.email,
          password: data.password,
        }
      );

      const { token, admin } = res.data; // not res.data.data

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(admin));

      // Update context
      setIsSignedIn(true);
      setAdmin(admin);

      toast.success("Signin successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      toast.error("Signin failed. Please check your credentials.");
    }
    setLoading(false);
  };

  function Field({ label, name, type = "text", register, error }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          {...register(name)}
          className={`appearance-none block w-full px-4 py-2 border text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-8">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <Field
            label="Email Address /  Phone Number"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address / Phone Number
            </label>
            <input
              type="email"
              {...register("email")}
              className={`input-style w-full p-1 pl-2 border rounded-sm shadow-sm focus:outline-none focus:ring-green-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>

          {/* Password */}
          <Field
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`input-style w-full p-1 pl-2 border rounded-sm shadow-sm focus:outline-none focus:ring-green-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </Field>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2 accent-green-600"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm text-green-600 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-all flex justify-center items-center"
          >
            {loading ? <Spinner size={5} color="white" /> : "Sign In"}
          </button>

          {/* Don't have an account? */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-green-600 hover:underline font-medium cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
