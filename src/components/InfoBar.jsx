import React from 'react';

const InfoBar = () => {
    // You would replace these with icons from a library like react-icons
    const InfoItem = ({ title, text }) => (
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
            <span className="text-3xl">🚚</span> {/* Placeholder icon */}
            <div>
                <h4 className="font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <InfoItem title="FREE SHIPPING" text="On All Orders" />
            <InfoItem title="24/7 SUPPORT" text="Get Help When You Need" />
            <InfoItem title="100% RETURN" text="Within 30 Days" />
        </div>
    );
};

export default InfoBar;