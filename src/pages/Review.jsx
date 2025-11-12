import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { FaShippingFast, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const ReviewPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {
        cartItems,
        shippingAddress,
        paymentMethod, 
        userInfo,
        clearCart,
        cartLoading
    } = useCart();

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const itemsPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            const shippingPrice = 25.00;
            const taxPrice = (itemsPrice * 0.08).toFixed(2);
            const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2);

            const orderItems = cartItems.map(item => ({
                name: item.product.name,
                qty: item.quantity,
                image: item.product.image,
                price: item.product.price,
                product: item.product._id,
            }));

            const res = await fetch('https://e-commerce-backend-7gua.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    orderItems,
                    shippingAddress,
                    paymentMethod, 
                    itemsPrice: itemsPrice,
                    taxPrice: parseFloat(taxPrice),
                    shippingPrice: shippingPrice,
                    totalPrice: parseFloat(totalPrice),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create order');
            }

            setLoading(false);
            clearCart();
            navigate(`/order/${data._id}`);

        } catch (err) {
            setLoading(false);
            setError(err.message);
            console.error(err);
        }
    };

    useEffect(() => {
        if (cartLoading) return;
        if (!shippingAddress.address) {
            navigate('/checkout');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [shippingAddress, paymentMethod, cartLoading, navigate]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 25.00;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    if (cartLoading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

                <div className="lg:col-span-3">

                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col items-center text-indigo-600"><div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"><FaShippingFast size={20} /></div><span className="mt-2 font-semibold">Shipping</span></div>
                        <div className="flex-1 h-0.5 bg-indigo-600 mx-4"></div>
                        <div className="flex flex-col items-center text-indigo-600"><div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"><FaCreditCard size={20} /></div><span className="mt-2 font-semibold">Payment</span></div>
                        <div className="flex-1 h-0.5 bg-indigo-600 mx-4"></div>
                        <div className="flex flex-col items-center text-indigo-600"><div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"><FaCheckCircle size={20} /></div><span className="mt-2 font-semibold">Review</span></div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">Shipping Address</h2>
                                <button onClick={() => navigate('/checkout')} className="text-sm text-indigo-600 hover:underline">Change</button>
                            </div>
                            <div className="text-gray-600">
                                <p>{shippingAddress.address}</p>
                                <p>{shippingAddress.city}, {shippingAddress.state}</p>
                                <p>{shippingAddress.postalCode}, {shippingAddress.country}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">Payment Method</h2>
                                <button onClick={() => navigate('/payment')} className="text-sm text-indigo-600 hover:underline">Change</button>
                            </div>
                            <div className="text-gray-600">
                                <p className="text-lg font-medium">{paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-4">Order Summary</h2>

                        <div className="space-y-4 border-t pt-4">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        </div>
                                    <span className="font-semibold text-gray-900">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-6 pt-6 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">
                                <strong>Error:</strong> {error}
                            </div>
                        )}

                        <form onSubmit={placeOrderHandler} className="mt-6">
                            <button
                                type="submit"
                                disabled={loading || cartItems.length === 0}
                                className="w-full bg-gray-900 text-white py-3 px-8 rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewPage;