import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.21.19.236:3333',
});

export default api;
