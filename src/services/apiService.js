import axios from "axios";

const api_baseUrl = `${import.meta.env.VITE_BACKEND_URL}/`;

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
  put: (url, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, payload)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  },
};

const Project = {
  getAll: () => {
    return requests.get(`${api_baseUrl}project/project/`);
  },
  create: (data) => {
    return requests.post(`${api_baseUrl}project/project/`, data);
  },
  delete: (project_id) => {
    return requests.delete(`${api_baseUrl}project/project/${project_id}/`);
  },
  getStylejsons: (project_id) => {
    return requests.get(`${api_baseUrl}project/${project_id}/stylejsons/`);
  },
  saveStyleJSON: (project_id, stylejson_id, payload) => {
    return requests.put(
      `${api_baseUrl}project/${project_id}/stylejsons/${stylejson_id}/`,
      payload
    );
  },
  createStyleJSON: (project_id, payload) => {
    return requests.post(
      `${api_baseUrl}project/${project_id}/stylejsons/`,
      payload
    );
  },
  deleteStyleJSON: (project_id, stylejson_id) => {
    return requests.delete(
      `${api_baseUrl}project/${project_id}/stylejsons/${stylejson_id}/`
    );
  },
};

const User = {
  get: () => {
    return requests.get(`${api_baseUrl}user/me/`);
  },
  update: (payload) => {
    return requests.put(`${api_baseUrl}user/me/`, payload);
  },
};

export default {
  Project,
  User,
};
