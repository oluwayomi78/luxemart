import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShippingFast, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const FormInput = ({ label, id, placeholder, optional = false, half = false, value, onChange }) => (
    <div className={half ? 'w-full' : 'col-span-2'}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {optional && <span className="text-gray-400">(Optional)</span>}
        </label>
        <input
            type="text"
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
);

const Checkout = () => {
    const { cartItems, cartLoading, saveShippingAddress } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const shippingData = {
            address: formData.address,
            city: `${formData.city}, ${formData.state}`,
            postalCode: formData.postalCode,
            country: formData.country,
        };

        saveShippingAddress(shippingData);
        navigate('/payment');
    };

    useEffect(() => {
        if (!cartLoading && cartItems.length === 0) {
            navigate('/user/products');
        }
    }, [cartItems, cartLoading, navigate]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 25.00;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    if (cartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading Your Cart...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

                <div className="lg:col-span-3">

                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col items-center text-indigo-600"><div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"><FaShippingFast size={20} /></div><span className="mt-2 font-semibold">Shipping</span></div>
                        <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
                        <div className="flex flex-col items-center text-gray-400"><div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center"><FaCreditCard size={20} /></div><span className="mt-2">Payment</span></div>
                        <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
                        <div className="flex flex-col items-center text-gray-400"><div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center"><FaCheckCircle size={20} /></div><span className="mt-2">Review</span></div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">Shipping Information</h2>
                        <p className="text-gray-500 mb-6">Enter your shipping address details.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <FormInput label="Address" id="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} />
                                <FormInput label="City" id="city" placeholder="Owode" value={formData.city} onChange={handleChange} half />
                                <FormInput label="State / Province" id="state" placeholder="Oyo" value={formData.state} onChange={handleChange} half />
                                <FormInput label="Zip / Postal Code" id="postalCode" placeholder="210001" value={formData.postalCode} onChange={handleChange} half />
                                <FormInput label="Country" id="country" placeholder="Nigeria" value={formData.country} onChange={handleChange} half />
                            </div>

                            <div className="mt-8 text-right">
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-4">Order Summary</h2>

                        <div className="space-y-4">
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

                    </div>
                </div>
            </div>
        </div>
    );
}



export default Checkout;