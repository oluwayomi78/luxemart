import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Lightbulb } from 'lucide-react'; 

const teamMembers = [
    {
        name: 'Abiodun Precious Enoch',
        role: 'CEO & Co-Founder',
        imageUrl: 'https://res.cloudinary.com/dffq0vemv/image/upload/v1762376402/ecommerce-products/qqmajnuh3l5kwsnuv0tv.png',
    },
    {
        name: 'Babatunde Israel Bright',
        role: 'CTO & Co-Founder',
        imageUrl: 'https://avatars.githubusercontent.com/u/198909714?v=4',
    },
    {
        name: 'Oyebode Samuel',
        role: 'Head of Design',
        imageUrl: 'oyebode.jpg',
    },
    {
        name: '	Oladipupo Samuel .T',
        role: 'Head of Marketing',
        imageUrl: 'Samuel.jpg',
    },
];

const AboutUs = () => {
    return (
        <div className="bg-white">
            <main>
                <div className="text-center py-16 sm:py-24 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                            About LuxeMart
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            We believe that style is a way to say who you are without having to speak. We're dedicated to bringing you the best in fashion, quality, and service.
                        </p>
                    </div>
                </div>

                <div className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Our Story
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                                Founded in 2024, LuxeMart started with a simple idea: to make high-end fashion accessible to everyone, everywhere. What began as a small passion project has grown into a global destination for style-conscious individuals.
                            </p>
                            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                                We source our collections from the world's most creative designers and trusted brands, ensuring every piece you find is authentic and of the highest quality. Our mission is to empower you to express your unique identity through the art of fashion.
                            </p>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <img
                                className="rounded-lg shadow-xl"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjq8LS6oAzcJmLy8nWLWpTLAAB_Zb-b-b5w&s"
                                alt="Our Store"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Our Core Values
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                The principles that guide everything we do.
                            </p>
                        </div>
                        <div className="mt-12 grid md:grid-cols-3 gap-10">
                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 bg-indigo-600 text-white rounded-full mx-auto">
                                    <Award size={32} />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-gray-900">Quality First</h3>
                                <p className="mt-2 text-base text-gray-600">
                                    We provide only authentic, high-quality products sourced from the best brands and designers.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 bg-indigo-600 text-white rounded-full mx-auto">
                                    <Users size={32} />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-gray-900">Customer Obsession</h3>
                                <p className="mt-2 text-base text-gray-600">
                                    Our customers are at the center of our universe. We are dedicated to providing an unparalleled service.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 bg-indigo-600 text-white rounded-full mx-auto">
                                    <Lightbulb size={32} />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-gray-900">Constant Innovation</h3>
                                <p className="mt-2 text-base text-gray-600">
                                    We are always looking for new ways to improve your shopping experience, from our technology to our styles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Meet Our Team
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                The passionate individuals behind the scenes.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {teamMembers.map((person) => (
                                <div key={person.name} className="text-center">
                                    <img
                                        className="h-32 w-32 rounded-full object-cover mx-auto shadow-lg"
                                        src={person.imageUrl}
                                        alt={person.name}
                                    />
                                    <h4 className="mt-4 text-lg font-semibold text-gray-900">
                                        {person.name}
                                    </h4>
                                    <p className="text-base font-medium text-indigo-600">
                                        {person.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-700">
                    <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Ready to find your style?
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-indigo-200">
                            Browse our latest collections and discover your next favorite piece.
                        </p>
                        <Link
                            to="/user/products"
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;