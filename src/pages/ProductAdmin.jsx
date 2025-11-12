import React, { useEffect, useState } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../api/productService"; 
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { useNavigate } from 'react-router-dom';

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const loadProducts = async (currentPage) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProducts(currentPage);
            setProducts(data.products);
            setTotalPages(data.pages); 
            setPage(data.page);
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
            navigate('/login');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts(page);
    }, [page]);

    const handleCreate = async (formData) => {
        try {
            await createProduct(formData);
            setIsCreating(false);
            if (page !== 1) {
                setPage(1);
            } else {
                loadProducts(1);
            }
        } catch (error) {
            console.error(error);
            setError("Failed to create product.");
        }
    };

    const handleEdit = async (formData) => {
        try {
            await updateProduct(editingProduct._id, formData);
            setEditingProduct(null);
            await loadProducts(page); 
        } catch (error) {
            console.error(error);
            setError("Failed to update product.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                if (products.length === 1 && page > 1) {
                    setPage(page - 1);
                } else {
                    await loadProducts(page); 
                }
            } catch (error) {
                console.error(error);
                setError("Failed to delete product.");
            }
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(currentPage => currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(currentPage => currentPage - 1);
        }
    };

    const closeForms = () => {
        setIsCreating(false);
        setEditingProduct(null);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Product Manager
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-end gap-2">
                        <button
                            onClick={() => {
                                setIsCreating(!isCreating);
                                setEditingProduct(null); 
                            }}
                            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                isCreating 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {isCreating ? "Cancel" : "Add New Product"}
                        </button>
                        <button 
                            onClick={() => navigate('/GetMessage')} 
                            className="px-4 py-2 rounded-lg text-white font-medium bg-gray-600 hover:bg-gray-700 transition-colors"
                        >
                            Get messages
                        </button>
                        <button 
                            onClick={() => navigate('/admin/user')} 
                            className="px-4 py-2 rounded-lg text-white font-medium bg-gray-600 hover:bg-gray-700 transition-colors"
                        >
                            Get Users
                        </button> 
                    </div>
                </div>

                <div className="mb-6">
                    {isCreating && (
                        <ProductForm 
                            onSubmit={handleCreate} 
                            onClose={closeForms} 
                        />
                    )}

                    {editingProduct && (
                        <ProductForm
                            onSubmit={handleEdit}
                            initialData={editingProduct}
                            onClose={closeForms}
                            isEditing={true}
                        />
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    {loading && <div className="text-center p-10 text-gray-500">Loading products...</div>}
                    {error && <div className="text-center p-10 text-red-500">{error}</div>}

                    {!loading && !error && (
                        <>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <ProductCard
                                            key={p._id}
                                            product={p}
                                            onEdit={() => {
                                                setEditingProduct(p);
                                                setIsCreating(false); 
                                            }}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                ) : (
                                    <p className="col-span-full text-center text-gray-500 p-10">
                                        No products found.
                                    </p>
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center items-center space-x-4">
                                    <button 
                                        onClick={handlePrevPage} 
                                        disabled={page === 1 || loading} 
                                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm font-medium text-gray-700">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button 
                                        onClick={handleNextPage} 
                                        disabled={page === totalPages || loading} 
                                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductAdmin;