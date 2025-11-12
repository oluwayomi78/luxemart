import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Loader = () => <div>Loading...</div>;
const USERS_URL = 'https://e-commerce-backend-7gua.onrender.com/api/users';

const UserEdit = () => {
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
        <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label 
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                
                <div className="mb-6 flex items-center">
                    <input
                        id="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label 
                        htmlFor="isAdmin"
                        className="ml-2 block text-sm font-medium text-gray-700"
                    >
                        Is Admin
                    </label>
                </div>
                
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserEdit;