import axios from "axios";

const api_baseUrl = "http://localhost:8000/api/";

axios.interceptors.request.use(
  function (config) {
    const mapstyler_user = localStorage.getItem("mapstyler_user");

    if (mapstyler_user) {
      let auth = JSON.parse(mapstyler_user);
      config.headers.Authorization = `Token ${auth.user_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const requests = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  },
  delete: (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  },
};

const Project = {
  getAll: () => {
    return requests.get(`${api_baseUrl}project/project/`);
  },
  get: (project_id) => {
    return requests.get(`${api_baseUrl}project/project/${project_id}`);
  },
  create: (data) => {
    return requests.post(`${api_baseUrl}project/project/`, data);
  },
  delete: (project_id) => {
    return requests.delete(`${api_baseUrl}project/project/${project_id}/`);
  },
};

export default {
  Project,
};
