import React, { useState } from 'react';
import axios from 'axios';

const NewUserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { name, email, password };

        try {
            const response = await axios.post('http://localhost:5000/api/v2/users', newUser);
            setMessage('New user profile created successfully!');
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage('Failed to create the user profile. Try again.');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f4f4f4' }}>
            <h2>Create New User Profile (No Conflict)</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: '#fff' }}>
                    Create Profile
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewUserProfile;
