import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../api/productService";

const ProductForm = ({ initialData = null, onClose, isEditing }) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        countInStock: "",
        rating: "0",
        numReviews: "0",
    });

    const [imageMethod, setImageMethod] = useState('url'); 
    const [imageUrl, setImageUrl] = useState(''); 
    const [imageFile, setImageFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState(''); 

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                brand: initialData.brand || "",
                category: initialData.category || "",
                price: initialData.price || "",
                countInStock: initialData.countInStock || "",
                rating: initialData.rating || "0",
                numReviews: initialData.numReviews || "0",
            });
            if (initialData.image) {
                setImageUrl(initialData.image);
                setImagePreview(initialData.image);
                setImageMethod('url');
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
        setImagePreview(e.target.value); 
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); 
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleImageMethodChange = (method) => {
        setImageMethod(method);
        if (method === 'url') {
            setImageFile(null);
            setImagePreview(imageUrl); 
        } else {
            setImageUrl('');
            setImagePreview(imageFile ? URL.createObjectURL(imageFile) : '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const data = new FormData();

        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        if (imageMethod === 'file' && imageFile) {
            data.append('image', imageFile);
        } else if (imageMethod === 'url' && imageUrl) {
            data.append('image', imageUrl);
        }

        try {
            if (isEditing) {
                const response = await updateProduct(initialData._id, data);
                setMessage(response.message || "✅ Product updated successfully!");
                window.location.reload();
            } else {
                const response = await createProduct(data);
                setMessage(response.message || "✅ Product created successfully!");
                window.location.reload();
            }

            setTimeout(() => {
                if (onClose) onClose();
            }, 1500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Operation failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                {isEditing ? "Edit Product" : "Create New Product"}
            </h2>

            {message && (
                <div
                    className={`p-3 rounded mb-4 text-sm ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text" name="name" placeholder="Enter product name"
                            value={formData.name} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Price</label>
                        <input
                            type="number" name="price" placeholder="Enter price"
                            value={formData.price} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Brand</label>
                        <input
                            type="text" name="brand" placeholder="Enter brand"
                            value={formData.brand} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <input
                            type="text" name="category" placeholder="Enter category"
                            value={formData.category} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Count In Stock</label>
                        <input
                            type="number" name="countInStock" placeholder="Enter quantity"
                            value={formData.countInStock} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Rating</label>
                        <input
                            type="number" name="rating" placeholder="Enter rating" min="0" max="5" step="0.1"
                            value={formData.rating} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Num Reviews</label>
                        <input
                            type="number" name="numReviews" placeholder="Enter numReviews"
                            value={formData.numReviews} onChange={handleChange}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description" placeholder="Enter product description"
                            value={formData.description} onChange={handleChange}
                            rows="4"
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Product Image</label>
                        <div className="flex gap-4 mb-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio" name="imageMethod" value="url"
                                    checked={imageMethod === 'url'}
                                    onChange={() => handleImageMethodChange('url')}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm">Image URL</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio" name="imageMethod" value="file"
                                    checked={imageMethod === 'file'}
                                    onChange={() => handleImageMethodChange('file')}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm">Upload File</span>
                            </label>
                        </div>

                        {imageMethod === 'url' ? (
                            <input
                                type="text"
                                name="image"
                                placeholder="Enter image URL"
                                value={imageUrl}
                                onChange={handleUrlChange}
                                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        )}

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                D className="mt-3 h-32 w-full object-cover rounded border border-gray-200"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Invalid+Image'; }}
                                />
                        )}
                    </div>
                </div>

                <input type="hidden" name="rating" value={formData.rating} />
                <input type="hidden" name="numReviews" value={formData.numReviews} />

                <div className="md:col-span-2 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose} 
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        E className="w-48 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                        {loading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Product" : "Create Product")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;