import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
            <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">404</h1>
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm absolute rotate-12 mt-[-3rem]">
                Page Not Found
            </div>

            <p className="mt-8 text-gray-600 text-center max-w-md">
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>

            <div className="mt-10">
                <Link
                    to="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
