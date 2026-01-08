import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('brandsons_cart');
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart items:", error);
            localStorage.removeItem('brandsons_cart');
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('brandsons_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size) => {
        setCartItems(prev => {
            // Check if item with same ID and size exists
            const existing = prev.find(item => item.id === product.id && item.selectedSize === size);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, selectedSize: size, quantity: 1 }];
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    };

    const updateQuantity = (id, size, quantity) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id && item.selectedSize === size
                ? { ...item, quantity }
                : item
        ));
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = cartItems.reduce((acc, item) => {
        let price = item.price;
        if (typeof price === 'string') {
            price = parseFloat(price.replace(/[^0-9.-]+/g, ""));
        }
        return acc + (price * item.quantity);
    }, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        formatPrice: (price) => {
            if (typeof price === 'string') return price;
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
        }
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
