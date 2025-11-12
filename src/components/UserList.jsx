import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Loader = () => <div>Loading...</div>;

const USERS_URL = 'https://e-commerce-backend-7gua.onrender.com/api/users';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.user.isAdmin) {
            toast.error('Not authorized. Admin only.');
            navigate('/');
            return;
        }

        const fetchUsers = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get(USERS_URL, config);

                setUsers(data);
                setLoading(false);
            } catch (err) {
                const message = err?.response?.data?.message || err.message;
                setError(message);
                toast.error(message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userInfo, navigate]);

    if (loading) return <Loader />;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Users ({users.length})</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th style={{ padding: '8px', border: '1p solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1p solid #ddd' }}>NAME</th>
                        <th style={{ padding: '8px', border: '1p solid #ddd' }}>EMAIL</th>
                        <th style={{ padding: '8px', border: '1p solid #ddd' }}>ADMIN</th>
                        <th style={{ padding: '8px', border: '1p solid #ddd' }}>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={{ padding: '8px', border: '1p solid #ddd' }}>{user._id}</td>
                            <td style={{ padding: '8px', border: '1p solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '8px', border: '1p solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '8px', border: '1p solid #ddd' }}>
                                {user.isAdmin ? (
                                    <span style={{ color: 'green' }}>Yes</span>
                                ) : (
                                    <span style={{ color: 'red' }}>No</span>
                                )}
                            </td>
                            <td style={{ padding: '8px', border: '1p solid #ddd' }}>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
