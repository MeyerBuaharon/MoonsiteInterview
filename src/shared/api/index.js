import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moonsite-rn-follow-test.herokuapp.com/api/',
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export const getLoginUser = (credentials) =>
  api
    .post('/usr/login', credentials)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

export const register = (credentials) =>
  api
    .post('usr/register', credentials)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
