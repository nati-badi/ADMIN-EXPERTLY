import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as z from "zod";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

// ✅ Admin Signup Schema based on your documentation
const signupSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Minimum 6 characters"),
  profilePicture: z.any().optional(),
});

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsSignedIn, setAdmin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://expertly-zxb1.onrender.com/api/v1/admin",
        {
          ...data,
          role: "Admin",
          status: "Active",
        }
      );

      const { token, admin } = res.data.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(admin));

      // Update auth state
      setIsSignedIn(true);
      setAdmin(admin);

      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("Signup failed!");
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
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
            <Field
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
          </div>

          <Field
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <Field
            label="Phone Number"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber?.message}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="file"
              onChange={(e) => setValue("profilePicture", e.target.files[0])}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-all flex justify-center items-center"
          >
            {loading ? <Spinner size={5} color="white" /> : "Sign Up"}
          </button>

          {/* Already have an account? */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-green-600 hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ Reusable input field component
function Field({ label, name, type = "text", register, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`input-style border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md p-2 w-full ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
