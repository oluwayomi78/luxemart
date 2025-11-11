import { useState, useEffect } from 'react';
import FilterIcon from './icons/FilterIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';

const allCategories = ['All Categories', "Men's Fashion", "Women's Fashion", 'Electronics', 'Sports', 'Shoes', 'Clothing', 'Accessories', 'Home & Living'];
const allBrands = ['Nike', 'Adidas', 'Samsung', 'Gucci', 'Apple', 'Dior', 'ZenMist', 'KitchenPro', 'HyperGear', 'KeyPro', 'SkyView', 'CleanBot', 'KidCare', 'Artify', 'BeautyLux', 'BrightHome', 'HomeElegance', 'Oraimo', 'Sony', 'LG', 'HP', 'Asus', 'Dell', 'Puma',  'UrbanStyle', 'FastFeet', 'TechTime', 'SoundMax', 'FashionHub', 'FitGear'];

const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
const sortOptions = [
    { name: 'Featured', value: 'featured' },
    { name: 'Price: Low to High', value: 'price-asc' },
    { name: 'Price: High to Low', value: 'price-desc' },
];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [tempCategory, setTempCategory] = useState('All Categories');
    const [tempMaxPrice, setTempMaxPrice] = useState(2000);
    const [tempBrands, setTempBrands] = useState([]);
    const [tempSizes, setTempSizes] = useState([]);

    const [filterCategory, setFilterCategory] = useState('All Categories');
    const [filterMaxPrice, setFilterMaxPrice] = useState(2000);
    const [filterBrands, setFilterBrands] = useState([]);
    const [filterSizes, setFilterSizes] = useState([]);

    const [sortBy, setSortBy] = useState('featured');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { addToCart } = useCart();

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
                params.append('sortBy', sortBy);

                let categoryParam = filterCategory;
                if (filterCategory === "Women's Fashion") categoryParam = "Women's Fashion";
                if (filterCategory === "Men's Fashion") categoryParam = "Men'sFashion";
                if (filterCategory === 'UrbanStyle') categoryParam = 'UrbanStyle';
                if (categoryParam !== 'All Categories') params.append('category', categoryParam);

                if (filterMaxPrice < 2000) params.append('maxPrice', filterMaxPrice);
                if (filterBrands.length > 0) params.append('brands', filterBrands.join(','));
                if (filterSizes.length > 0) params.append('sizes', filterSizes.join(','));

                const apiUrl = `https://e-commerce-backend-7gua.onrender.com/api/products?${params.toString()}`;
                const res = await fetch(apiUrl, { headers });

                if (!res.ok) throw new Error('Failed to fetch products');

                const data = await res.json();

                setProducts(data.products || []);
                setTotalPages(data.pages || 1);
                setTotalProducts(data.totalCount || (data.products ? data.products.length : 0));
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, filterCategory, filterMaxPrice, filterBrands, filterSizes, sortBy]);

    const handleBrandChange = (brand) => {
        setTempBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleSizeChange = (size) => {
        setTempSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleApplyFilters = () => {
        setFilterCategory(tempCategory);
        setFilterMaxPrice(tempMaxPrice);
        setFilterBrands(tempBrands);
        setFilterSizes(tempSizes);
        setPage(1);
        setIsSidebarOpen(false);
    };

    const handleResetFilters = () => {
        setTempCategory('All Categories');
        setTempMaxPrice(2000);
        setTempBrands([]);
        setTempSizes([]);

        setFilterCategory('All Categories');
        setFilterMaxPrice(2000);
        setFilterBrands([]);
        setFilterSizes([]);
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

            <div>
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="flex justify-between items-center text-gray-700 mb-2">
                    <span>$0</span>
                    <span>${tempMaxPrice}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={tempMaxPrice}
                    onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-indigo-600"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                    {allBrands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={brand}
                                checked={tempBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                    {allSizes.map(size => (
                        <button
                            key={size}
                            onClick={() => handleSizeChange(size)}
                            className={`px-3 py-1 rounded-md border text-sm font-medium
                                ${tempSizes.includes(size)
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {size}
                        </button>
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
                                All Products ({totalProducts})
                            </h2>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none block pl-3 pr-8 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    {sortOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </div>

                        {loading && <div className="flex justify-center items-center min-h-[400px] text-gray-500 font-semibold">Updating products...</div>}

                        {!loading && products.length === 0 && <div className="flex justify-center items-center min-h-[400px] text-gray-500 font-semibold">No products found matching your criteria. {error}</div>}

                        {!loading && products.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl flex flex-col">
                                        
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                src={product.image || 'https://placehold.co/600x400?text=No+Image'}
                                                alt={product.name}
                                                className="w-full h-48 object-cover cursor-pointer"
                                            />
                                        </Link>
                                        
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="flex items-center">
                                                <span className={ product.rating ? "text-yellow-400" : "text-gray-300"}>
                                                    {product.rating}★ ({product.numReviews})
                                                </span>
                                            </div>

                                            <Link to={`/product/${product._id}`}>
                                                <h3 className="text-lg font-semibold truncate cursor-pointer mt-2" title={product.name}>{product.name}</h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2" title={product.description}>{product.description}</p>
                                            <p className="text-lg font-bold text-indigo-600 mt-4">${product.price}</p>
                                            
                                            <div className="flex-grow" /> 

                                            <button 
                                                onClick={() => addToCart(product, 1)}
                                                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700"
                                            >
                                                Add to Cart
                                            </button>
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

export default Products;