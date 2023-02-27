import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './constants';

const $host = axios.create({
  baseURL: API_URL
});

const $authHost = axios.create({
  baseURL: API_URL
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost
}