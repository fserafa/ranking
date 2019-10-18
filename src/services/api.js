import axios from 'axios';

const api = axios.create({
    baseURL: 'https://quantos-litrex-backend.herokuapp.com/'
});

export default api;