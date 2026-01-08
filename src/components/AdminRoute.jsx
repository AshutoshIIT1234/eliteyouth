import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user } = useAuth(); // Assuming useAuth provides the user object

    if (user && user.isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/admin/login" replace />;
    }
};

export default AdminRoute;
