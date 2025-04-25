import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Zod schema
const signupSchema = z.object({
  firstName: z.string().min(2, "Too short"),
  lastName: z.string().min(2, "Too short"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Too short"),
  password: z.string().min(6, "Minimum 6 characters"),
  profilePicture: z.any().optional(), // File input
});

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/profileClient");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-8">
          Sign up
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

// 🔁 Reusable Field Component
function Field({ label, name, type = "text", register, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`input-style border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-sm shadow-sm focus:outline-none p-1 pl-2 w-full ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
