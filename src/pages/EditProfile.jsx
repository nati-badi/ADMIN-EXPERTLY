import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { Card } from "../components/ui/card";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

// Reusable input field component
const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`appearance-none block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 transition
        ${
          readOnly
            ? "bg-gray-100 cursor-not-allowed focus:outline-none"
            : "focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300"
        }
      `}
    />
  </div>
);

const EditProfile = () => {
  const [form, setForm] = useState({ firstName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const { setAdmin } = useAuth();

  const storedAdmin = localStorage.getItem("admin");
  const admin = storedAdmin ? JSON.parse(storedAdmin) : null;
  const adminId = admin?._id;

  // Fetch admin profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://expertly-zxb1.onrender.com/api/v1/admin/${adminId}`
        );
        const updatedAdmin = res.data.data.admin;

        setForm({
          firstName: updatedAdmin.firstName || "",
          email: updatedAdmin.email || "",
        });

        setAdmin(updatedAdmin);
        localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    if (adminId) fetchProfile();
  }, [adminId, setAdmin]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!form.firstName.trim()) return;

    setLoading(true);
    try {
      const res = await axios.patch(
        `https://expertly-zxb1.onrender.com/api/v1/admin/${adminId}`,
        { firstName: form.firstName }
      );

      const updatedAdmin = res.data.data.admin;
      toast.success("Profile updated successfully!");

      setAdmin(updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    setDeleting(true);
    try {
      await axios.delete(
        `https://expertly-zxb1.onrender.com/api/v1/admin/${adminId}`
      );
      toast.success("Account deleted successfully!");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Edit Profile", href: "/settings/edit-profile" },
        ]}
      />

      <h2 className="text-2xl font-bold mt-4 mb-6">Edit Profile</h2>

      <Card className="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          {submitted && !form.firstName.trim() && (
            <p className="text-red-500 text-sm mt-1">Name is required.</p>
          )}

          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            readOnly
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <hr className="my-6" />

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </Card>
    </div>
  );
};

export default EditProfile;
