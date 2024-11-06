import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setError('You must be logged in to view this page.');
                    return;
                }

                const res = await axios.get('http://localhost:2151/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
                setPhoneNumber(res.data.phoneNumber); // Load existing phone number
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Could not fetch user profile. Please try again later.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleSavePhoneNumber = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.patch('http://localhost:2151/api/auth/me', { phoneNumber }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser({ ...user, phoneNumber }); // Update user state with new phone number
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            console.error('Error saving phone number:', err);
            setError('Could not save phone number. Please try again later.');
        }
    };

    const handleEdit = () => {
        setIsEditing(true); // Enter editing mode
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {isEditing ? <input type="text" defaultValue={user.name} /> : user.name}</p>
                <p><strong>Email:</strong> {user.email}</p> {/* Displaying email */}
                <p>
                    <strong>Phone Number:</strong> {isEditing ? <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" /> : user.phoneNumber}
                </p>
                {!isEditing ? (
                    <>
                        <button className="edit-button" onClick={handleEdit}>Edit</button>
                    </>
                ) : (
                    <>
                        <button className="save-button" onClick={handleSavePhoneNumber}>Save</button>
                        <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
