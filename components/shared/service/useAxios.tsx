import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-server-one-gamma.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;