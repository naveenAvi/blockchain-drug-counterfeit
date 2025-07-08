import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Change this to your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postData = async (url, data, config = {}) => {
  return api.post(url, data, config);
};

export default api; 