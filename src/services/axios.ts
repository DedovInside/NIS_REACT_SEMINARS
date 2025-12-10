import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

// Request interceptor - добавляем baseURL и токен
axiosInstance.interceptors.request.use(
  (config) => {
    // Добавляем фейковый токен авторизации
    config.headers.Authorization = 'Bearer demo-token';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (опционально, для логирования)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', response.config.url);
    return response;
  },
  (error) => {
    console.error('Axios Error:', error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
