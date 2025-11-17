import axios from 'axios';

const apiClient = axios.create({
  // 請將 'http://localhost:3000/api' 換成你後端 API 的真實網址
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
