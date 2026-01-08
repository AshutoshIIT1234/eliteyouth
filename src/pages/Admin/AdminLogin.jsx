import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css'; // Reusing general login styles

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user && user.isAdmin) {
                navigate('/admin');
            } else {
                setError('Access Denied: You are not an admin.');
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password');
        }
    };

    return (
        <div className="login-page" style={{ background: '#f4f6f8' }}>
            <div className="auth-container">
                <div className="auth-card" style={{ borderTop: '4px solid #1a1a1a' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h2 className="auth-title">Admin Portal</h2>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Secure Access Restricted</p>
                    </div>

                    {error && <div className="error-message" style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-auth" style={{ marginTop: '10px', background: '#1a1a1a' }}>
                            Login to Dashboard
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
