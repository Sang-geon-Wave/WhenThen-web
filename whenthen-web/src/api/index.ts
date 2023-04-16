import axios from 'axios';
import store from '../stores/auth';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: { 'Content-type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = store.accessToken.get();
    try {
      if (accessToken) {
        config.headers.authorization = `${accessToken}`;
      }

      return config;
    } catch (err) {
      console.error(`[_axios.interceptors.request] config : ${err}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (error.response.data.message === 'access token expired') {
          const originalRequest = error.config;

          console.log('request refresh');

          const { data } = await axios.get(
            `http://localhost:8080/auth/refresh`,
            { withCredentials: true },
          );

          console.log(data);

          const { access_token: accessToken } = data;

          store.changeAccessToken(accessToken);

          originalRequest.headers.authorization = `${accessToken}`;

          return axios(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
