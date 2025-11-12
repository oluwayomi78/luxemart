import React, { useState, useEffect, useCallback } from 'react';

const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const PackageIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z" /><path d="M3 15v-1a2 2 0 0 1 1.76-1.97l6.63-1.12" /><path d="m14 7-6-3.43" /></svg>
);
const UsersIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const BarChartIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
);
const SettingsIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.48a2 2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.74v.44a2 2 0 0 1-1 1.74l-.15.08a2 2 0 0 0-.73 2.73l.78 1.48a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 1-1.74v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.74l.15-.08a2 2 0 0 0 2.73-.73l.78-1.48a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.44a2 2 0 0 1 1-1.74l.15-.08a2 2 0 0 0 .73-2.73l-.78-1.48a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const LogOutIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
);


const AdminLogin = ({
    onLoginSuccess = () => console.log("Admin Login Success!"),
    onNavigateToForgotPassword = () => console.log("Navigate to Forgot Password")
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    const loginUrl = "https://e-commerce-backend-7gua.onrender.com/admin/login"

    const handleSumbit = async () => {
        setError(null);
        setLoading(true);

        const maxRetries = 3;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const userData = { email, password }

                const response = await fetch(loginUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (!response.ok) {

                    if (response.status >= 500 && attempt < maxRetries - 1) {
                        const delay = Math.pow(2, attempt) * 1000;
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue;
                    }
                    throw new Error(data.message || `Login failed with status ${response.status}!`);
                }


                localStorage.setItem("admin_token", data.token);
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
                setLoading(false);
                return;
            } catch (error) {

                if (attempt === maxRetries - 1 || error.name === 'AbortError' || !(error instanceof TypeError) && !error.message.includes('Failed to fetch')) {
                    setError(error.message || "An unknown error occurred. Please check your connection.");
                    setLoading(false);
                    return;
                }

                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSumbit();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl transition duration-500 hover:shadow-indigo-300/50">
                <div>
                    <h1 className="text-center text-4xl font-extrabold tracking-tight text-indigo-600">
                        Admin Portal
                    </h1>
                    <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to manage your store
                    </h2>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 font-medium">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                <div className="mt-8 space-y-6" onKeyDown={handleKeyPress}>
                    <div className="rounded-xl shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-t-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address (admin@example.com)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-b-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <button
                                onClick={onNavigateToForgotPassword}
                                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSumbit}
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-xl border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-150"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const AdminDashboard = ({ onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');

    const sidebarItems = [
        { name: 'Overview', icon: BarChartIcon },
        { name: 'Products', icon: PackageIcon },
        { name: 'Users', icon: UsersIcon },
        { name: 'Settings', icon: SettingsIcon },
    ];

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        onLogout();
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Sales" value="$8,450" change="+12% since last month" color="bg-indigo-500" />
                        <StatCard title="New Orders" value="154" change="-3% since last week" color="bg-green-500" />
                        <StatCard title="Active Users" value="2,489" change="+25% since last quarter" color="bg-yellow-500" />
                        <StatCard title="Pending Review" value="12" change="Urgent attention needed" color="bg-red-500" />
                        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800">Sales Chart Placeholder</h3>
                            <div className="h-64 mt-4 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">

                            </div>
                        </div>
                    </div>
                );
            case 'Products':
                return <MockContent title="Product Management" description="View and edit product listings." />;
            case 'Users':
                return <MockContent title="User Management" description="Manage customer and admin accounts." />;
            case 'Settings':
                return <MockContent title="General Settings" description="Configure site preferences and integrations." />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans antialiased">
            <aside className={`flex-shrink-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white flex flex-col`}>
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <h2 className={`text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                        E-Comm Admin
                    </h2>
                    <h2 className={`text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0 absolute' : 'opacity-100'}`}>
                        EP
                    </h2>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <a
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors duration-150 ${activeTab === item.name ? 'bg-indigo-600 shadow-md text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className={`text-sm font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 absolute'}`}>
                                {item.name}
                            </span>
                        </a>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 w-full rounded-xl text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-150"
                    >
                        <LogOutIcon className="w-5 h-5" />
                        <span className={`text-sm font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 absolute'}`}>
                            Log Out
                        </span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-6">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-500 focus:outline-none focus:text-gray-700"
                        aria-label="Toggle Sidebar"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800 hidden sm:block">{activeTab}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-gray-700">Admin User</div>
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 mb-6">{activeTab}</h2>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, color }) => (
    <div className={`p-6 rounded-xl shadow-lg text-white ${color}`}>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h3 className="mt-1 text-3xl font-extrabold">{value}</h3>
        <p className="mt-2 text-xs font-light opacity-90">{change}</p>
    </div>
);

const MockContent = ({ title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
            This is a mock content page. You are successfully logged in and navigating the Admin Panel.
        </div>
    </div>
);

const ForgotPassword = ({ onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        setTimeout(() => {
            setLoading(false);
            if (email.includes('@')) {
                setStatus({ type: 'success', message: `Password reset link sent to ${email}. Check your inbox!` });
            } else {
                setStatus({ type: 'error', message: 'Please enter a valid email address.' });
            }
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Reset Your Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address below to receive a password reset link.
                    </p>
                </div>

                {status && (
                    <div className={`rounded-xl border p-4 text-sm ${status.type === 'success' ? 'border-green-300 bg-green-50 text-green-700' : 'border-red-300 bg-red-50 text-red-700'}`}>
                        {status.message}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-xl shadow-sm">
                        <input
                            id="reset-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-xl border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-150"
                        >
                            {loading ? 'Sending Request...' : 'Send Reset Link'}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <button
                        onClick={onNavigateToLogin}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

const App = () => {
    const [currentPage, setCurrentPage] = useState('login');


    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (token) {

            setCurrentPage('dashboard');
        }
    }, []);

    const handleLoginSuccess = useCallback(() => {
        setCurrentPage('dashboard');
    }, []);

    const handleLogout = useCallback(() => {
        setCurrentPage('login');
    }, []);

    const handleNavigateToForgotPassword = useCallback(() => {
        setCurrentPage('forgotPassword');
    }, []);

    const handleNavigateToLogin = useCallback(() => {
        setCurrentPage('login');
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <AdminDashboard onLogout={handleLogout} />;
            case 'forgotPassword':
                return <ForgotPassword onNavigateToLogin={handleNavigateToLogin} />;
            case 'login':
            default:
                return (
                    <AdminLogin
                        onLoginSuccess={handleLoginSuccess}
                        onNavigateToForgotPassword={handleNavigateToForgotPassword}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
            {renderPage()}
        </div>
    );
};

export default App;