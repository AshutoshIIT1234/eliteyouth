import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';
import { LayoutDashboard, ShoppingBag, FolderTree, PlusCircle, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <>
            <button className="admin-mobile-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
            </button>
            <div className={`admin-sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
            <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                    <button className="admin-mobile-close" onClick={closeSidebar}>
                        <X size={24} />
                    </button>
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/admin" className={isActive('/admin')} onClick={closeSidebar}>
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/categories" className={isActive('/admin/categories')} onClick={closeSidebar}>
                            <FolderTree size={20} />
                            <span>Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className={isActive('/admin/products')} onClick={closeSidebar}>
                            <ShoppingBag size={20} />
                            <span>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/product/add" className={isActive('/admin/product/add')} onClick={closeSidebar}>
                            <PlusCircle size={20} />
                            <span>Add Product</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <button onClick={() => { logout(); closeSidebar(); }} className="logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
