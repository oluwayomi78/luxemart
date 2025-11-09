'use client'

import { useState, useEffect } from 'react';
import FilterIcon from './icons/FilterIcon';

const allCategories = ['All Categories', "Men's Fashion", "Women's Fashion", 'Electronics', 'Sports', 'Shoes', 'Clothing', 'Accessories', 'Home & Living'];

const Product = () => {
    const [products, setProducts] = useState([]);
    // const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [tempCategory, setTempCategory] = useState('All Categories');
    const [filterCategory, setFilterCategory] = useState('All Categories');

    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const userInfoString = localStorage.getItem('userInfo');
                let token = null;
                if (userInfoString) {
                    const userInfo = JSON.parse(userInfoString);
                    token = userInfo.token;
                }

                const headers = { 'Content-Type': 'application/json' };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const params = new URLSearchParams();
                params.append('page', page);

                let categoryParam = filterCategory;
                if (filterCategory === "Women's Fashion") categoryParam = "Women's Fashion";
                if (filterCategory === "Men's Fashion") categoryParam = "Men'sFashion";
                if (filterCategory === 'UrbanStyle') categoryParam = 'UrbanStyle';
                if (categoryParam !== 'All Categories') params.append('category', categoryParam);


                const apiUrl = `http://localhost:4300/api/products?${params.toString()}`;
                const res = await fetch(apiUrl, { headers });

                if (!res.ok) throw new Error('Failed to fetch products');

                const data = await res.json();

                setProducts(data.products || []);
                setTotalPages(data.pages || 1);
                // setTotalProducts(data.totalCount || (data.products ? data.products.length : 0));
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, filterCategory]); 


    const handleApplyFilters = () => {
        setFilterCategory(tempCategory);

        setPage(1);
        setIsSidebarOpen(false);
    };

    const handleResetFilters = () => {
        setTempCategory('All Categories');
        setFilterCategory('All Categories');
        setPage(1);
        setIsSidebarOpen(false);
    };

    const handleNextPage = () => page < totalPages && setPage(p => p + 1);
    const handlePrevPage = () => page > 1 && setPage(p => p - 1);

    const FilterSidebar = () => (
        <aside className="w-full md:w-64 lg:w-72 space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                    {allCategories.map(category => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={tempCategory === category}
                                onChange={(e) => setTempCategory(e.target.value)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={handleApplyFilters}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleResetFilters}
                    className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300"
                >
                    Reset Filters
                </button>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center gap-2 w-full justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                    >
                        <FilterIcon />
                        {isSidebarOpen ? 'Close Filters' : 'Show Filters'}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                    {isSidebarOpen && <div className="md:hidden"><FilterSidebar /></div>}
                    <div className="hidden md:block"><FilterSidebar /></div>

                    <main className="flex-1">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                All Products 
                                {/* ({totalProducts}) */}
                            </h2>
                        </div>

                        {loading && <div className="flex justify-center items-center min-h-[400px] text-gray-500 font-semibold">Updating products...</div>}

                        {!loading && products.length === 0 && <div className="flex justify-center items-center min-h-[400px] text-gray-500 font-semibold">No products found matching your criteria. {error}</div>}

                        {!loading && products.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl">
                                        <img
                                            src={product.image || 'https://placehold.co/600x400?text=No+Image'}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        
                                        <div className="flex items-center mt-1 px-4 pt-2 mt-2">
                                            <span className={ product.rating ? "text-yellow-400" : "text-gray-300"}>
                                                {product.rating}★ ({product.numReviews})
                                            </span>
                                        </div>
                                        <div className="pl-4 pr-4 pb-4">
                                            <h3 className="text-lg font-semibold truncate" title={product.name}>{product.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2" title={product.description}>{product.description}</p>
                                            {/* <p className="text-lg font-bold text-indigo-600 mt-4">${product.price}</p> */}
                                            {/* <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700">
                                                Add to Cart
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 flex justify-center items-center space-x-4">
                            <button onClick={handlePrevPage} disabled={page === 1 || loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Previous</button>
                            <span className="text-sm font-medium text-gray-700">Page {page} of {totalPages}</span>
                            <button onClick={handleNextPage} disabled={page === totalPages || loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Next</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Product;