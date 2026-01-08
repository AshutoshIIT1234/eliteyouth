import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [step, setStep] = useState('input'); // input, otp
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        dob: '',
        gender: '',
        otp: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { login, register, sendOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            await sendOtp(formData.email);
            setStep('otp');
            alert('OTP sent to your email (check console)');
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert(error.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(formData.email, formData.otp);
            alert('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert(error.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            // After signup, send OTP to verify/login
            await sendOtp(formData.email);
            setActiveTab('login');
            setStep('otp');
            alert('Signup successful! Validating email...');
        } catch (error) {
            console.error('Error signing up:', error);
            alert(error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('login'); setStep('input'); }}
                        >
                            Log In
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('signup'); setStep('input'); }}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 className="auth-title">
                        {activeTab === 'login'
                            ? (step === 'otp' ? 'Enter OTP' : 'Login with OTP')
                            : 'Create Account'}
                    </h2>

                    {activeTab === 'login' ? (
                        <form onSubmit={step === 'input' ? handleSendOtp : handleVerifyOtp} className="auth-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={step === 'otp'}
                                />
                            </div>

                            {step === 'otp' && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="Enter 6-digit OTP"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        required
                                        maxLength="6"
                                    />
                                </div>
                            )}

                            <button type="submit" className="btn-auth">
                                {step === 'input' ? 'Send OTP' : 'Verify & Login'}
                            </button>

                            {step === 'otp' && (
                                <button type="button" className="btn-link" onClick={() => setStep('input')} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#4a90e2', cursor: 'pointer' }}>
                                    Change Email
                                </button>
                            )}
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="auth-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="date"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-auth">
                                Sign Up (No Password)
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Login;
