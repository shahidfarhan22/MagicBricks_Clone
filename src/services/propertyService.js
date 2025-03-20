import axios from 'axios';

export const addProperty = async (propertyData, token) => {
    const response = await axios.post('/api/property/add', propertyData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getAllProperties = async (token) => {
    const response = await axios.get('/api/property/list', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};
