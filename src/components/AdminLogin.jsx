import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Removed react-router-dom hooks
// import axios from 'axios'; // No longer using axios

// --- SVG Icon Components (No longer needed for this admin page) ---
// const GoogleIcon = () => ( ... );
// const GitHubIcon = () => ( ... );

const AdminLogin = ({ 
    onLoginSuccess = () => console.log("Admin Login Success!"), 
    onNavigateToForgotPassword = () => console.log("Navigate to Forgot Password") 
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const loginUrl = "https://e-commerce-backend-vert-six.vercel.app/admin/login" 

    const handleSumbit = async () => {
        setError(null);
        setLoading(true);

        try {
            const userData = { email, password}
            
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed!');
            }


            setLoading(false);
            localStorage.setItem("admin_token", data.token); 
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            setError(error.message || "An unknown error occurred.");
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
                    <div>

                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Admin Login
                        </h2>
                    </div>

                    {error && (
                        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <button 
                                    onClick={onNavigateToForgotPassword} 
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSumbit}
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

// Updated default export
export default AdminLogin

