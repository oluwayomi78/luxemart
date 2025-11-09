import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react'; 

const faqData = [
    {
        question: "What are your shipping options?",
        answer: "We offer standard, expedited, and next-day shipping. Standard shipping typically takes 5-7 business days, expedited takes 2-3 business days, and next-day arrives on the next business day for orders placed before 1 PM EST."
    },
    {
        question: "What is your return policy?",
        answer: "You can return any new, unopened item within 30 days of purchase for a full refund. Please visit our returns page to start the process. Note that return shipping fees may apply for non-defective items."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also log into your account and view your order history to find tracking information."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), as well as PayPal, Apple Pay, and Google Pay."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 50 countries. International shipping rates and times vary by location. Please note that customers are responsible for any customs duties or import taxes."
    }
];

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none"
            >
                <span className="text-lg font-medium text-gray-900">{question}</span>
                <ChevronDown 
                    size={24} 
                    className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>
            
            {isOpen && (
                <div className="p-5 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <p className="text-base text-gray-700 leading-relaxed">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Can't find the answer you're looking for? 
                        <Link to="/contact" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            Contact our support
                        </Link>.
                    </p>
                </div>
                
                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <AccordionItem 
                            key={index} 
                            question={item.question} 
                            answer={item.answer} 
                        />
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default FAQ;