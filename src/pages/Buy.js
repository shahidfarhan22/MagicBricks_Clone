import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Buy = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://localhost:7164/api/property/buy', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProperties(response.data);
        };
        fetchProperties();
    }, []);

    return (
        <div>
            <h2>Properties Available for Buy</h2>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                        <p>Price: {property.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Buy;
