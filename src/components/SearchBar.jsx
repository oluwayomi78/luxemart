import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    return (
        <form className="flex w-full items-center">
            <input
                type="text"
                placeholder="Search Products Here..."
                className="w-full rounded-l-md border border-gray-300 p-3 text-lg focus:border-indigo-500 focus:ring-indigo-500"
            />

            <select className="border-y border-gray-300 p-3 text-lg text-gray-600 focus:outline-none">
                <option>All Categories</option>
                <option>Men</option>
                <option>Women</option>
                <option>Electronics</option>
            </select>

            <button
                type="submit"
                className="rounded-r-md border border-gray-800 bg-gray-800 p-3 text-white hover:bg-gray-700"
            >
                <FaSearch className="h-6 w-6" />
            </button>
        </form>
    );
};

export default SearchBar;