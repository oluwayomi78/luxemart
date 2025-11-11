import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, StarHalf, Plus, Minus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx'; 

const Rating = ({ rating, numReviews }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
                {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={20} fill="currentColor" />)}
                {halfStar && <StarHalf key="half" size={20} fill="currentColor" />}
                {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={20} className="text-gray-300" />)}
            </div>
            <span className="text-gray-600 ml-2">
                {rating.toFixed(1)} ({numReviews} reviews)
            </span>
        </div>
    );
};

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4"
            >
                <h3 className="text-lg font-medium">{title}</h3>
                <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
};

const StarRatingInput = ({ rating, setRating }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="cursor-pointer"
                >
                    <Star 
                        size={24} 
                        fill={star <= rating ? 'currentColor' : 'none'} 
                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                </button>
            ))}
        </div>
    );
};

const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || !comment) {
            setError('Please provide a rating and a comment.');
            return;
        }

        setLoading(true);
        setError(null);

        let token = null;
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            token = JSON.parse(userInfoString).token;
        }

        if (!token) {
            setError('You must be logged in to leave a review.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`https://e-commerce-backend-7gua.onrender.com/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ rating, title, comment }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to submit review.');
            }

            await res.json();
            
            onReviewSubmitted(); 

            setRating(0);
            setTitle('');
            setComment('');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold">Write a Customer Review</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
            </div>
            <div>
                <label htmlFor="review-title" className="block text-sm font-medium text-gray-700">
                    Review Title (Optional)
                </label>
                <input
                    type="text"
                    id="review-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="What's most important to know?"
                />
            </div>
            <div>
                <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700">
                    Your Comment
                </label>
                <textarea
                    id="review-comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="What did you like or dislike?"
                />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');
    
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    const params = useParams();
    const productId = params.id;


    const { addToCart } = useCart();

    const fetchProduct = async () => {
        if (!productId) return;

        setLoading(true);
        setError(null);
        setRelatedProducts([]);
        try {
            const res = await fetch(`https://e-commerce-backend-7gua.onrender.com/api/products/${productId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch product: ${res.statusText}`);
            }
            const data = await res.json();
            setProduct(data);

            if (data.images && data.images.length > 0) {
                setMainImage(data.images[0]);
            }
            if (data.sizes && data.sizes.length > 0) {
                setSelectedSize(data.sizes[0]);
            }
            if (data.colors && data.colors.length > 0) {
                setSelectedColor(data.colors[0]);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product && product.category) {
            const fetchRelatedProducts = async () => {
                setRelatedLoading(true);
                try {
                    const res = await fetch(`https://e-commerce-backend-7gua.onrender.com/api/products?category=${product.category}&limit=5`);
                    if (!res.ok) {
                        throw new Error('Failed to fetch related products');
                    }
                    const data = await res.json();
                    
                    if (data.products) {
                        const filteredProducts = data.products
                            .filter(p => p._id !== productId)
                            .slice(0, 4);
                        setRelatedProducts(filteredProducts);
                    }
                } catch (err) {
                    console.error("Error fetching related products:", err);
                } finally {
                    setRelatedLoading(false);
                }
            };

            fetchRelatedProducts();
        }
    }, [product, productId]);

    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCartClick = () => {
        addToCart(product, quantity);
    };

    const handleReviewSubmitted = () => {
        fetchProduct();
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                
                <div className="w-full md:w-1/2">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <img
                            src={product.image || 'https://placehold.co/600x600?text=Product'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex gap-2">
                        {product.images?.map((img, index) => (
                            <button
                                key={index}
                                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-indigo-500' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <p className="text-sm text-gray-500">by {product.brand || 'Brand'}</p>
                    <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
                    
                    <div className="mt-3">
                        <Rating rating={product.rating || 0} numReviews={product.numReviews || 0} />
                    </div>
                    
                    <p className="text-3xl font-semibold text-indigo-600 mt-4">${product.price?.toFixed(2)}</p>
                    <p className="text-gray-700 mt-4">{product.description}</p>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium">Size</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-md border text-sm font-medium
                                        ${selectedSize === size
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium">Color</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.colors?.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 rounded-md border text-sm font-medium
                                        ${selectedColor === color
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={() => handleQuantityChange(-1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><Minus size={16} /></button>
                            <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"><Plus size={16} /></button>
                        </div>
                        
                        <button
                            onClick={handleAddToCartClick}
                            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12 lg:mt-16">
                <AccordionItem title="Full Description">
                    <p>{product.description || 'No full description available.'}</p>
                </AccordionItem>
                
                <AccordionItem title="Shipping & Returns">
                    <p>Free shipping on orders over $50. Easy returns within 30 days. Check our policy page for more details.</p>
                </AccordionItem>
            </div>
            
            <div className="mt-12 lg:mt-16">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {product.reviews.map((review, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <Rating rating={review.rating} numReviews={0} />
                                <h4 className="font-semibold mt-2">{review.title}</h4>
                                <p className="text-gray-600 text-sm mt-1">by {review.name} on {new Date(review.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 mt-3">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to share your thoughts!</p>
                )}

                <ReviewForm 
                    productId={productId} 
                    onReviewSubmitted={handleReviewSubmitted} 
                />
            </div>

            <div className="mt-12 lg:mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                
                {relatedLoading && (
                    <p className="text-gray-600">Loading related products...</p>
                )}

                {!relatedLoading && relatedProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                        {relatedProducts.map((related) => (
                            <div key={related._id} className="border rounded-lg overflow-hidden group">
                                <Link to={`/product/${related._id}`}>
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        <img 
                                            src={related.image || 'https://placehold.co/400x400?text=Product'} 
                                            alt={related.name} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-medium truncate">{related.name}</h4>
                                        <p className="font-semibold text-indigo-600 mt-1">${related.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                
                {!relatedLoading && relatedProducts.length === 0 && (
                    <p className="text-gray-600">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;