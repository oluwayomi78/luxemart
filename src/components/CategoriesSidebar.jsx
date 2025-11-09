import React from 'react';

const categories = ['Men', 'Women', 'Electronics', 'Jewellery', 'Shoes', 'Kid\'s Wear', 'Sports'];

const CategoriesSidebar = () => {
    return (
        <div className="w-full rounded-lg border bg-white shadow-sm">
            <h3 className="bg-gray-800 p-4 font-bold text-white rounded-t-lg">
                CATEGORIES
            </h3>
            <ul className="flex flex-col divide-y">
                {categories.map((category) => (
                    <li
                        key={category}
                        className="cursor-pointer p-4 text-gray-700 hover:bg-gray-50"
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesSidebar;