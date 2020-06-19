import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moonsite-rn-follow-test.herokuapp.com/api/',
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
