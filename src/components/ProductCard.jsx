import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition flex flex-col justify-between">
            <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-3"
            />
            <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"}>
                        ★
                    </span>
                ))}
            </div>

            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.brand}</p>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => onEdit(product._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
