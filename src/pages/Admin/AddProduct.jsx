import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AdminSidebar.css';
import '../../styles/Admin.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);

    const [uploading, setUploading] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.text();
            // Cloudinary returns absolute URL, so no need to prepend localhost
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    name,
                    price,
                    image,
                    brand,
                    category,
                    countInStock,
                    description,
                }),
            });

            if (res.ok) {
                navigate('/admin/products');
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>Add Product</h1>
                </div>
                <div className="form-container">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                type="file"
                                id="image-file" // Use id for label association if needed, or just unique
                                onChange={uploadFileHandler}
                                style={{ marginTop: '10px' }}
                            />
                            {uploading && <p>Uploading...</p>}
                            {image && (
                                <div style={{ marginTop: '10px' }}>
                                    <img src={image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                type="text"
                                className="form-control"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Count In Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary">Create Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
