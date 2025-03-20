import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Buyer', 
        name: '', 
        contactNumber: '' 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7164/api/authentication/register', formData);
            console.log(response.data);
            alert('Registration successful');
        } catch (error) {
            console.error('Error registering user', error);
            alert('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
            </select>

            {formData.role === 'Seller' && (
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Seller Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;




