import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css'; // Reusing Login styles for consistent look

const Profile = () => {
    const { user, login } = useAuth(); // getting user from context, but we might want to refresh it?
    // Actually Profile was fetching from localstorage on mount. Context handles that now.
    // But specific Profile Edit logic might need separate state.
    // Let's use user from context as initial state.
    const { logout } = useAuth();

    // We can keep local state for editing form
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        dob: '',
        gender: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                mobile: user.mobile || '',
                dob: user.dob ? user.dob.split('T')[0] : '',
                gender: user.gender || '',
                password: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Profile updated successfully!');
                localStorage.setItem('userInfo', JSON.stringify({ ...data, token: user.token }));
                setUser({ ...data, token: user.token });
                setIsEditing(false);
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to server');
        }
    };

    if (!user) return null;

    return (
        <div className="login-page">
            <div className="auth-container">
                <div className="auth-card" style={{ maxWidth: '800px' }}>
                    <div className="auth-tabs" style={{ justifyContent: 'center' }}>
                        <h2 className="auth-title" style={{ marginBottom: 0 }}>My Profile</h2>
                    </div>

                    {!isEditing ? (
                        <div className="profile-view">
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    <User size={64} color="#1a2a5e" />
                                </div>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <p>{user.email}</p>
                            </div>

                            <div className="profile-details" style={{ textAlign: 'left', marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="detail-item">
                                    <strong><User size={16} /> Gender:</strong> {user.gender}
                                </div>
                                <div className="detail-item">
                                    <strong><Phone size={16} /> Mobile:</strong> {user.mobile}
                                </div>
                                <div className="detail-item">
                                    <strong><Calendar size={16} /> DOB:</strong> {new Date(user.dob).toLocaleDateString()}
                                </div>
                                <div className="detail-item">
                                    <strong><UserCheck size={16} /> Member Since:</strong> {new Date().getFullYear()}
                                </div>
                            </div>

                            <button
                                className="btn-auth"
                                style={{ marginTop: '30px', width: '200px' }}
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>

                            <button
                                className="btn-auth"
                                style={{ marginTop: '15px', width: '200px', backgroundColor: '#e74c3c' }}
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: '20px' }}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Mobile</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Change Password (Optional)</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row" style={{ marginTop: '20px' }}>
                                <button type="button" className="btn-auth" style={{ background: '#ccc', color: '#333' }} onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className="btn-auth">Save Changes</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
