import axios from 'axios';
import { API_URL } from './constants';

const $host = axios.create({
  baseURL: API_URL,
  // headers: { 'access-control-allow-origin': '*' },
});

export { $host };
