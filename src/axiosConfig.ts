import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.160.22:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
