import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AdminSidebar.css';
import '../../styles/Admin.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        setCategories(data);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ name, image, description }),
            });
            if (res.ok) {
                setName('');
                setImage('');
                setDescription('');
                fetchCategories();
            } else {
                alert('Failed to create category');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (res.ok) {
                    fetchCategories();
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
                    <h1>Categories</h1>
                </div>

                <div className="form-container" style={{ marginBottom: '30px' }}>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary">Add Category</button>
                    </form>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id}>
                                    <td>{category._id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <button className="btn-danger" onClick={() => deleteHandler(category._id)}>Delete</button>
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

export default CategoryList;
