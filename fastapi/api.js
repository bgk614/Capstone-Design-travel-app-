// src/api.js

import axios from 'axios';

export const fetchDataFromAPI = () => {
  return axios.get('http://localhost:8000/api/data')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};
