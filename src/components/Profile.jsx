import { useState, useEffect } from "react";
import { googleSignOut } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import LogoIcon from "./icons/LogoIcon";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);


    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                    <div className="flex items-center gap-2 pl-[120px] mb-5">
                    <LogoIcon/>
                    <span className="font-bold text-lg sm:text-xl text-gray-900">
                        LuxeMart
                    </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Please sign in to view your profile
                    </h2>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }
        
    const handleLogout = async () => {
        try {
            await googleSignOut();
            localStorage.removeItem("userInfo");
            setUser(null);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error signing out:", error);
        }
    };

    const displayName =
        user?.displayName ||
        user?.user?.displayName ||
        user?.user?.name ||
        "Guest User";

    const displayEmail =
        user?.email || user?.user?.email || "No email available";

    const displayPhotoURL =
        user?.photoURL ||
        user?.user?.photoURL ||
        `https://ui-avatars.com/api/?name=${displayName[0].toUpperCase()}&background=4f46e5&color=fff&size=128&rounded=true`;


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <img
                        src={displayPhotoURL}
                        alt="User profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {displayName}
                </h2>
                <p className="text-gray-500 mb-4">{displayEmail}</p>

                <div className="border-t border-gray-200 my-4"></div>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
