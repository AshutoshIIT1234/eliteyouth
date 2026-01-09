import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                setUser(JSON.parse(userInfo));
            } catch (error) {
                console.error("Failed to parse user info:", error);
                localStorage.removeItem('userInfo');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } else {
            throw new Error(data.message || 'Login failed');
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, userData);
            // localStorage.setItem('userInfo', JSON.stringify(data)); // Commented out as per instruction
            // setUser(data); // Commented out as per instruction
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const sendOtp = async (email) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/otp-login`, { email });
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to send OTP');
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/otp-verify`, { email, otp });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'OTP verification failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        // window.location.href = '/login'; // Removed as per instruction
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        sendOtp, // Added sendOtp
        verifyOtp // Added verifyOtp
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
