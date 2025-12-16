import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8765/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🚀 AXIOS TOKEN:", token); // 👈 ADD THIS

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
