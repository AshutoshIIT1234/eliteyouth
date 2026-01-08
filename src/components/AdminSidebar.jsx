import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';
import { LayoutDashboard, ShoppingBag, FolderTree, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/admin" className={isActive('/admin')}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/categories" className={isActive('/admin/categories')}>
                        <FolderTree size={20} />
                        <span>Categories</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products" className={isActive('/admin/products')}>
                        <ShoppingBag size={20} />
                        <span>Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/product/add" className={isActive('/admin/product/add')}>
                        <PlusCircle size={20} />
                        <span>Add Product</span>
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <button onClick={logout} className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
