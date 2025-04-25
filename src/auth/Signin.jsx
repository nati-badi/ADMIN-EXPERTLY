import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

// Schema
const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  rememberMe: z.boolean().optional(),
});

const Signin = () => {
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
    try {
      // Simulated login
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-8">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
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
          </div>

          {/* Password */}
          <div>
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
          </div>

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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
