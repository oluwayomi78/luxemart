import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, MapPin, Gift, Coffee, Heart, ArrowRight } from 'lucide-react';

const jobListings = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
    },
    {
        id: 2,
        title: 'Product Marketing Manager',
        department: 'Marketing',
        location: 'Oyo State, Nigeria',
        type: 'Full-time',
    },
    {
        id: 3,
        title: 'Customer Support Specialist',
        department: 'Support',
        location: 'Remote',
        type: 'Contract',
    },
    {
        id: 4,
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'New York, NY',
        type: 'Part-time',
    },
];

const perks = [
    {
        icon: Gift,
        name: 'Generous PTO',
        description: 'Flexible paid time off and company-paid holidays so you can rest and recharge.',
    },
    {
        icon: Coffee,
        name: 'Flexible Work',
        description: 'We trust you to get your work done. Work from home, our office, or a mix of both.',
    },
    {
        icon: Heart,
        name: 'Health & Wellness',
        description: 'Comprehensive health, dental, and vision insurance for you and your family.',
    },
];

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setJobs(jobListings);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="bg-white">
            <main>
                <div className="bg-indigo-700 text-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold sm:text-5xl">
                            Join Our Team
                        </h1>
                        <p className="mt-4 text-xl text-indigo-200 max-w-2xl mx-auto">
                            We're a passionate team building the future of e-commerce. We're looking for talented individuals to help us grow.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Why You'll Love Working Here
                            </h2>
                        </div>
                        <div className="mt-12 grid md:grid-cols-3 gap-10">
                            {perks.map((perk) => (
                                <div key={perk.name} className="text-center">
                                    <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto">
                                        <perk.icon size={32} />
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-gray-900">{perk.name}</h3>
                                    <p className="mt-2 text-base text-gray-600">{perk.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                            Open Positions
                        </h2>

                        {loading ? (
                            <div className="text-center text-gray-600 font-medium">
                                Loading open roles...
                            </div>
                        ) : (
                            <div className="bg-white shadow-xl rounded-lg overflow-hidden divide-y divide-gray-200">
                                {jobs.length > 0 ? jobs.map((job) => (
                                    <Link 
                                        to={`/career/${job.id}`} 
                                        key={job.id} 
                                        className="block p-6 hover:bg-gray-50 transition duration-150 ease-in-out"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-indigo-600">
                                                {job.title}
                                            </h3>
                                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {job.department}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center space-x-6 text-gray-600">
                                            <div className="flex items-center text-sm">
                                                <MapPin size={16} className="mr-1.5 flex-shrink-0" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Clock size={16} className="mr-1.5 flex-shrink-0" />
                                                {job.type}
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="p-6 text-center text-gray-500">
                                        No open positions at this time. Check back soon!
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50">
                    <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Don't see your role?
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-gray-600">
                            We're always looking for talented and passionate people. Send us your resume and let's talk.
                        </p>
                        <Link
                            to="/contact"
                            className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
                        >
                            Contact Us <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Careers;