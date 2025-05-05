import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import { Card } from "../components/ui/card";
import { FaStar, FaTrash } from "react-icons/fa";
import Input from "../components/ui/input";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/rating"
        );
        setRatings(res.data?.data || []);
        setFiltered(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch ratings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = ratings.filter(
      (r) =>
        r.comment?.toLowerCase().includes(term) ||
        r.expert?.name?.toLowerCase().includes(term) ||
        r.client?.name?.toLowerCase().includes(term)
    );
    setFiltered(results);
  }, [searchTerm, ratings]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rating?")) return;
    try {
      await axios.delete(
        `https://expertly-zxb1.onrender.com/api/v1/rating/${id}`
      );
      setRatings((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete rating:", err);
      alert("Error deleting rating.");
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Ratings", href: "/ratings" },
        ]}
      />
      <h2 className="text-2xl font-bold mt-4 mb-6">Ratings</h2>

      <div className="mb-4 max-w-md">
        <Input
          type="text"
          placeholder="Search by client, expert or comment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No ratings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rating) => (
            <Card key={rating._id} className="relative p-4 shadow-lg">
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(rating._id)}
              >
                <FaTrash />
              </button>
              <p className="text-gray-800 font-medium mb-1">
                <span className="font-semibold">Client:</span>{" "}
                {rating.client?.name || "Unknown"}
              </p>
              <p className="text-gray-800 font-medium mb-1">
                <span className="font-semibold">Expert:</span>{" "}
                {rating.expert?.name || "Unknown"}
              </p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < rating.rating ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              {rating.comment && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Comment:</span>{" "}
                  {rating.comment}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ratings;
