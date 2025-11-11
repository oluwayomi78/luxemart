import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from './icons/GoogleIcon';
// import GitHubIcon from './icons/githubIcon.jsx';
import { signInWithGoogle } from '../firebase';

const GitHubIcon = () => (
    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.92.678 1.853 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const Login = ({
    onLoginSuccess = () => console.log("Login Success!"),
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const loginUrl = "https://e-commerce-backend-7gua.onrender.com/api/users/login";
    const googleLoginUrl = "https://e-commerce-backend-7gua.onrender.com/api/users/google";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userData = { email, password };
            const response = await axios.post(loginUrl, userData);
            const data = response.data;

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
            if (error.response?.data?.message === "User not found") {
                setError("User not found");
            }
            if (error.response?.data?.message === "Firebase: Error (auth/network-request-failed).") {
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

            localStorage.setItem("userInfo", JSON.stringify(data));

            window.dispatchEvent(new CustomEvent("authChange", { detail: data }));

            setLoading(false);
            if (data.user.isAdmin) {
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