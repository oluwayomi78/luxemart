import React from "react";
import { Link } from "react-router-dom";


const collections = [
    {
        title: "Women's Fashion",
        description: "Discover the latest trends in women's apparel and accessories.",
        image: "https://plus.unsplash.com/premium_photo-1689371953420-b6981e43fa38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
        title: "Men's Fashion",
        description: "Elevate your wardrobe with premium men's clothing and style essentials.",
        image: "https://plus.unsplash.com/premium_photo-1727967194534-d227764583b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    },
    {
        title: "Electronics",
        description: "Experience innovation with our selection of cutting-edge gadgets.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    },
    {
        title: "Accessories",
        description: "Complete your look with luxury accessories and statement pieces.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
    },
];

const Collections = () => {
    return (
        <section className="bg-white py-20 font-sans">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Explore Our Collections
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {collections.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="rounded-t-lg w-full h-64 object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-2 mb-[-7px] h-16">{item.description}</p>

                                <button
                                    className="mt-4 py-2 px-6 bg-white border border-gray-400 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 hover:border-gray-500 transition-all duration-200"
                                >
                                <Link to={'/user/products'} >Shop Now</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;