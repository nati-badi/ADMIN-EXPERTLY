import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // e.g., https://expertly-zxb1.onrender.com/api/v1
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
