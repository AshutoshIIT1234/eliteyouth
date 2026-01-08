import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AdminSidebar.css';
import '../../styles/Admin.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (res.ok) {
                    fetchProducts();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>Products</h1>
                    <Link to="/admin/product/add">
                        <button className="btn-primary">Create Product</button>
                    </Link>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category?.name}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button className="btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
