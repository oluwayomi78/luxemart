import React from "react";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const heroSlides = [
    {
        title: "Curated Elegance, Redefined.",
        description: "Explore exclusive high-fashion and cutting-edge electronics. LuxeVault brings you the pinnacle of style and innovation.",
        buttonText: "Shop New Arrivals",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    },
    {
        title: "The Fall Collection is Here.",
        description: "Discover new layers, warm tones, and sophisticated looks for the new season. Comfort meets high fashion.",
        buttonText: "Explore The Collection",
        image: "https://images.unsplash.com/photo-1679307802259-7bf7fe443ed9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    },
    {
        title: "Next-Gen Tech & Gadgets.",
        description: "Stay ahead with the latest in smart devices, audio, and personal tech. Innovation is at your fingertips.",
        buttonText: "Discover Tech",
        image: "https://plus.unsplash.com/premium_photo-1729436833449-225649403fc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1567"
    }
];

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        fade: true,
        cssEase: 'linear'
    };

    return (
        <section className="bg-gray-50 font-sans">
            <Slider {...settings}>
                {heroSlides.map((slide, index) => (
                    <div key={index}>
                        <div className="container mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="mt-4 text-lg text-gray-600">
                                    {slide.description}
                                </p>
                                <button className="mt-8 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
                                    {slide.buttonText}
                                </button>
                                </div>

                            <div>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            </section>
    );
};

export default Hero;