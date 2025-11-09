import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "./icons/LogoIcon";
import SearchIcon from "./icons/SearchIcon";
import CartIcon from "./icons/CartIcon";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import ProfileIcon from "./icons/ProfileIcon";
import { useCart } from "../context/CartContext";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { cartItems } = useCart();
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("userInfo");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing userInfo:", error);
            localStorage.removeItem("userInfo");
        }
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    let displayName = "Guest";
    let avatarURL = "https://ui-avatars.com/api/?name=G&background=4f46e5&color=fff&size=128&rounded=true";

    if (user) {
        const userData = user.user || user;
        const name = userData.displayName || userData.name || userData.email || "User";

        displayName = name.split(" ")[0];
        avatarURL =
            userData.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName[0].toUpperCase()
            )}&background=4f46e5&color=fff&size=128&rounded=true`;
    }

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm font-sans">
            <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <LogoIcon />
                    <span className="font-bold text-lg sm:text-xl text-gray-900">LuxeMart</span>
                </Link>

                <div className="hidden lg:flex gap-5 xl:gap-8">
                    <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                        Home
                    </Link>
                    <Link to="/user/products" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                        Shop
                    </Link>
                    <Link to="/product" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                        Products
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="hidden lg:flex relative items-center">
                        <span className="absolute left-3.5">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-200 rounded-lg py-2 px-4 pl-10 w-36 sm:w-48 lg:w-60 xl:w-72 focus:outline-none focus:border-gray-400 transition-all"
                        />
                    </div>

                    <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors">
                        <CartIcon />
                        <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    </Link>

                    <div className="relative flex items-center">
                        {user ? (
                            <Link to="/profile" className="flex items-center gap-2 hover:opacity-90 transition">
                                <img
                                    src={avatarURL}
                                    alt="User Avatar"
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                                />
                                <span className="hidden md:inline text-gray-700 font-medium text-sm">
                                    {displayName}
                                </span>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <ProfileIcon />
                            </Link>
                        )}
                    </div>

                    <button
                        className="lg:hidden text-gray-600 hover:text-gray-900 ml-1"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 w-full px-6 pt-4 pb-6">
                    <div className="flex flex-col gap-3">
                        <Link to="/" onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 py-1">
                            Home
                        </Link>
                        <Link to="/user/products" onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 py-1">
                            Shop
                        </Link>
                        <Link to="/product" onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 py-1">
                            Products
                        </Link>

                        <div className="relative mt-3">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                <SearchIcon className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border border-gray-200 rounded-lg py-2 px-4 pl-10 w-full focus:outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
