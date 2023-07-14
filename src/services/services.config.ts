import axios from "axios";
//utils
import { getLocal } from '~/untils/localStogate'
//---------------------------------------------------------

export const axiosWithAuth = axios.create({
  timeout: 180_000,
});

axiosWithAuth.interceptors.request.use(
  (config: any) => {
    config.headers = {
      Authorization: `Bearer ${getLocal('ACCESS_TOKEN')}`
    };
    // config.method = 'post';

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)