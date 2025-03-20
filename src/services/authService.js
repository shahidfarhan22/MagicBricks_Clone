import axios from 'axios';

export const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
};

export const register = async (userDetails) => {
    const response = await axios.post('/api/auth/register', userDetails);
    return response.data;
};
