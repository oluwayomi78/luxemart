import React from "react";
import { Link } from "react-router-dom";

const seasonalDeals = [
    {
        title: "Seasonal Collection",
        buttonText: "Explore Collection",
        image: "https://images.unsplash.com/photo-1679307802259-7bf7fe443ed9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
        title: "Smart Devices",
        buttonText: "Discover Tech",
        image: "https://plus.unsplash.com/premium_photo-1729436833449-225649403fc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1567",
    },
];

const SeasonalDeals = () => {
    return (
        <section className="py-16 bg-white font-sans">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {seasonalDeals.map((deal, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-xl shadow-lg"
                        >
                            <img
                                src={deal.image}
                                alt={deal.title}
                                className="w-full h-80 object-cover rounded-xl transform hover:scale-105 transition-all duration-500"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-8 md:p-12 flex flex-col items-start justify-center"
                            >
                                <h3 className="text-white mt-20 text-3xl md:text-4xl font-bold">
                                    {deal.title}
                                </h3>

                                <button className="mt-4 bg-black text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
                                    <Link to={'/product'} >{deal.buttonText}</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeasonalDeals;