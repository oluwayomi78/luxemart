import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [shippingAddress, setShippingAddress] = useState(() => {
        try {
            const storedAddress = localStorage.getItem("shippingAddress");
            return storedAddress ? JSON.parse(storedAddress) : {};
        } catch (error) {
            console.error("Error loading shippingAddress:", error);
            return {};
        }
    });

    const [userInfo, setUserInfo] = useState(() => {
        try {
            const storedUser = localStorage.getItem("userInfo");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error loading userInfo:", error);
            return null;
        }
    });

    useEffect(() => {
        const handleAuthChange = (event) => {
            setUserInfo(event.detail);
        };
        
        window.addEventListener("authChange", handleAuthChange);
        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            if (userInfo && userInfo.token) {
                setLoading(true);
                try {
                    const res = await fetch(`https://e-commerce-backend-7gua.onrender.com/api/users/cart`, {
                        headers: {
                            'Authorization': `Bearer ${userInfo.token}`,
                        },
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setCartItems(data);
                    } else {
                        console.error(data.message);
                    }
                } catch (err) {
                    console.error("Error fetching cart:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchCart();
    }, [userInfo]);

    const addToCart = async (product, quantity) => {
        if (!userInfo) {
            alert('Please log in to add items to your cart.');
            return;
        }

        try {
            const res = await fetch('https://e-commerce-backend-7gua.onrender.com/api/users/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({ productId: product._id, quantity: quantity }),
            });
            
            const data = await res.json();
            
            if (res.ok) {
                setCartItems(data);
                alert('Item added to cart!');
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert(err.message);
        }
    };

    const removeFromCart = async (productId) => {
        if (!userInfo) return;

        try {
            const res = await fetch(`https://e-commerce-backend-7gua.onrender.com/api/users/cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setCartItems(data);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error("Error removing from cart:", err);
            alert(err.message);
        }
    };

    const saveShippingAddress = (data) => {
        setShippingAddress(data);
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    const clearCart = () => {
        setCartItems([]);
        setShippingAddress({});
        localStorage.removeItem('shippingAddress');
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        cartLoading: loading,
        shippingAddress,
        saveShippingAddress,
        clearCart,
        userInfo,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};