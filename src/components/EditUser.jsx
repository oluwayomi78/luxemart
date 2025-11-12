import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Loader = () => <div>Loading...</div>;
const USERS_URL = 'https://e-commerce-backend-7gua.onrender.com/api/users';

const UserEditPage = () => {
    const { id: userId } = useParams(); 
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`${USERS_URL}/${userId}`, config);

                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error('Could not fetch user data');
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId, userInfo.token]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.put(`${USERS_URL}/${userId}`, { name, email, isAdmin }, config);
            toast.success('User updated successfully');
            navigate('/admin/userlist');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update user');
        }
    };

    if (loading) return <Loader />;

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1>Edit User</h1>
            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ marginRight: '10px' }}
                        />
                        Is Admin
                    </label>
                </div>
                <button type="submit" style={{ padding: '10px 15px' }}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserEditPage;