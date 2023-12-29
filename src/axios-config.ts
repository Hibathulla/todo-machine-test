import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  isServer = typeof window === "undefined";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Accept"] = "application/json";
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response, "err");
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log(error, "err");
    const token = localStorage.getItem("accessToken");

    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axiosInstance
        .post(
          "/auth/refresh_token",
          {
            deviceIdentity: "auth_token",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          if (res.status === 201) {
            // localStorage.setItem(res.data)
            axiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + res.access_token;
            return axios(originalRequest);
          }
        });
    } else if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
