import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart, cartLoading } = useCart();
        const navigate = useNavigate()
    const cheeckOut = () => {
        navigate('/checkout')
    }
    if (cartLoading) {
        return <div>Loading your cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
                <Link to="/user/products" className="text-indigo-600 hover:underline">
                    Go Shopping
                </Link>
            </div>
        );
    }

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.product._id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <button 
                                onClick={() => removeFromCart(item.product._id)}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-right">
                <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
                <button className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-md font-medium hover:bg-indigo-700" onClick={() => cheeckOut()}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;