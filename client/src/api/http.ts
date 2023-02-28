import axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../functions/tokenManipulation';
import { API_URL } from './constants';

const $host = axios.create({
  baseURL: API_URL,
  // headers: { 'access-control-allow-origin': '*' },
});

const $authHost = axios.create({
  baseURL: API_URL
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${getToken()}`;
  return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost
}

