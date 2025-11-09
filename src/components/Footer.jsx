import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 font-sans">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <Link to='/' className="flex items-center gap-2 mb-4">
                            <LogoIcon />
                            <span className="font-bold text-xl text-gray-900">LuxeMart</span>
                        </Link>
                        <p className="text-gray-600">
                            Curated elegance, redefined. Discover premium products and striking style.
                        </p>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
                            <ul className="space-y-2">
                                <li><Link to='/user/products' className="text-gray-600 hover:text-gray-900 transition-colors">Women</Link></li>
                                <li><Link to='/user/products' className="text-gray-600 hover:text-gray-900 transition-colors">Men</Link></li>
                                <li><Link to='/user/products' className="text-gray-600 hover:text-gray-900 transition-colors">Accessories</Link></li>
                                <li><Link to='/user/products' className="text-gray-600 hover:text-gray-900 transition-colors">Watches</Link></li>
                                <li><Link to='/user/products' className="text-gray-600 hover:text-gray-900 transition-colors">Devices</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li><Link to='/contact' className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link></li>
                                <li><Link to='/faq' className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link></li>
                                <li><Link to='#' className="text-gray-600 hover:text-gray-900 transition-colors">Shipping & Returns</Link></li>
                                <li><Link to='#' className="text-gray-600 hover:text-gray-900 transition-colors">Order Tracking</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><Link to='/about' className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link></li>
                                <li><Link to='/careers' className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
                                <li><Link to='/privacy' className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                                <li><Link to='/term' className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">&copy; 2025 LuxeMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;