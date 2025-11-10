import React from "react";
import { Link } from "react-router-dom";

const handpickedItems = [
    {
        title: "Designer Leather Jacket",
        image: "https://images.unsplash.com/photo-1727515546577-f7d82a47b51d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736://images.unsplash.com/photo-1543168256-418811576931?q=80&w=1887&auto=format&fit=crop",
        price: "$999.00",
    },
    {
        title: "Wireless Noise-Cancelling Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
        price: "$349.00",
    },
    {
        title: "Women's Evening Gown",
        image: "https://images.unsplash.com/photo-1758728836733-269aacb10068?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
        price: "$750.00",
    },
    {
        title: "Smart Home Hub",
        image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1974&auto=format&fit=crop",
        price: "$129.00",
    },
    {
        title: "Men's Chronograph Watch",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop",
        price: "$450.00",
    },
    {
        title: "Premium Denim Jeans",
        image: "https://images.unsplash.com/photo-1564322955382-5dda5a13efb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        price: "$85.00",
    },
];

const Handpicked = () => {
    return (
        <section className="bg-gray-50 py-20 font-sans pb-40">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Handpicked for You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {handpickedItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="rounded-t-lg w-full h-72 object-cover"
                            />

                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">{item.price}</p>

                                <button className="mt-4 w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <Link to={'/product'} >View Product</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Handpicked;