import axios from 'axios';
import { requestInterceptors } from '@actions/Interceptors/RequestInterceptors';
import {
  responseErrorInterceptor,
  responseSuccessInterceptor,
} from '@actions/Interceptors/ResponseInterceptors';

const ApiV1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const ApiSkyClub = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_SKYCLUB,
});

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_WITHOUT_TRAIL,
});

ApiV1.interceptors.request.use(async (config) => {
  return requestInterceptors(config);
});

ApiSkyClub.interceptors.request.use(async (config) => {
  return requestInterceptors(config);
});

Api.interceptors.request.use(async (config) => {
  return requestInterceptors(config);
});

ApiV1.interceptors.response.use(
  (response) => {
    return responseSuccessInterceptor(response);
  },
  (error) => {
    responseErrorInterceptor(error);
    throw error;
  },
);

ApiSkyClub.interceptors.response.use(
  (response) => {
    return responseSuccessInterceptor(response);
  },
  (error) => {
    responseErrorInterceptor(error);
    throw error;
  },
);

Api.interceptors.response.use(
  (response) => {
    return responseSuccessInterceptor(response);
  },
  (error) => {
    responseErrorInterceptor(error);
    throw error;
  },
);

export { Api, ApiV1, ApiSkyClub };
