import axios from 'axios';
import { API_URL } from './constants';

const $host = axios.create({
  baseURL: API_URL,
  headers: {
    auth: `Bearer ${JSON.parse(localStorage.getItem('token') as string)}`,
  },
});

export { $host };
