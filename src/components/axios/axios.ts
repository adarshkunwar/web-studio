import axios from "axios";

const instance = axios.create({
  baseURL: "http://62.72.42.129:7777/",
});

const token1 = localStorage.getItem("token");
console.log(token1);

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: localStorage.getItem("token")
        ? `Bearer` + " " + localStorage.getItem("token")
        : "",
    };
    return config;
  },
  (error) => Promise.reject(error),
);
axios.defaults.headers.post["Authorization"] = `Bearer + ${localStorage.getItem(
  "token",
)}`;

instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
