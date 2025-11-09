import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from './icons/GoogleIcon';
import GitHubIcon from './icons/GitHubIcon';
import { signInWithGoogle } from '../firebase';

const Login = ({
    onLoginSuccess = () => console.log("Login Success!"), 
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const loginUrl = "http://localhost:4300/api/users/login";
    const googleLoginUrl = "http://localhost:4300/api/users/google";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userData = { email, password };
            const response = await axios.post(loginUrl, userData);
            const data = response.data;

            console.log("Login successful:", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            
            window.dispatchEvent(new CustomEvent("authChange", { detail: data }));
            
            setLoading(false);
            
            if (data.user.isAdmin) {
                navigate('/admin/products');
            } else {
                navigate('/user/products');
            }

            onLoginSuccess();
        } catch (error) {
            setError(error.response?.data?.message || "Login failed!");
            setLoading(false);
            if (error.response?.data?.message === "Invalid credentials") {
                setError("Invalid email or password");
            }
            if( error.response?.data?.message === "User not found") {
                setError("User not found");
            }
            if( error.response?.data?.message === "Firebase: Error (auth/network-request-failed).") {
                setError("SomeThing where wrong, please try again later");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);
        try {
            const result = await signInWithGoogle();
            const googleUser = result.user;
            const response = await axios.post(googleLoginUrl, {
                name: googleUser.displayName,
                email: googleUser.email,
                googleId: googleUser.uid,
            });

            const data = response.data;

            console.log("Google Sign-In Success:", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            
            window.dispatchEvent(new CustomEvent("authChange", { detail: data }));

            setLoading(false);
            if(data.user.isAdmin) {
                navigate('/admin/products');
            } else {
                
                navigate('/user/products');
            }

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            const errMsg = error.response?.data?.message || error.message || "Google sign-in failed!";
            setError(errMsg);
            setLoading(false);
        }
    };

    const handleGitHubSignIn = () => {
        console.log("Signing in with GitHub...");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Log into your account
                </h2>

                {error && (
                    <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Email"
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
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-100"
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </button>

                    <button
                        onClick={handleGitHubSignIn}
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-md bg-gray-900 py-3 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-600"
                    >
                        <GitHubIcon />
                        Sign in with GitHub
                    </button>
                </div>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        Not a member?{' '}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;