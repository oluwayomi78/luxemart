import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'

const App = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const API_URL = "http://localhost:4300/api/users/";

    const handleSignUp = async () => {
        setError(null);
        setMessage(null)
        setLoading(true);
        try {
            const userData = { name, email, password }
            setLoading(true);
            const response = await axios.post(API_URL, userData)
            localStorage.setItem("token", response.data.token);
            console.log("User Info:", response.data)
            setMessage(response?.data?.message || "Signup successful!")
            navigate('/login')
        } catch (error) {
            setLoading(false);
            console.log(error.response?.data?.message || "Signup failed!");
            setError(error.response?.data?.message || "Signup failed!");
        }
        setLoading(false)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                {error && (
                    <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}
                <div className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input type="text" name="name" autoComplete="name" placeholder=" Enter your name" required className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input type="email" name="email" autoComplete="email" placeholder="Enter your email" className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input type="password" name="password" autoComplete="current-password" placeholder="Enter your password" className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleSignUp} disabled={loading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300">{loading ? 'Creating...' : 'Sign up'}</button>
                    {message && <p className="text-green-500">{message}</p>}
                </div>
                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;