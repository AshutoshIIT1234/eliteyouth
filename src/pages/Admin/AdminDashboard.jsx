import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/AdminSidebar.css';
import '../../styles/Admin.css';
import { Package, Users, DollarSign, ShoppingBag, Folder } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        productCount: 0,
        userCount: 0,
        categoryCount: 0,
        orderCount: 0,
        totalSales: 0
    });
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });

                if (response.status === 401) {
                    logout();
                    return;
                }

                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchStats();
        }
    }, [user]);

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>Dashboard</h1>
                </div>

                <div className="dashboard-cards">
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>Total Sales</h3>
                                <p>${stats.totalSales}</p>
                            </div>
                            <div style={{ padding: '10px', background: '#e0f2fe', borderRadius: '50%', color: '#0ea5e9' }}>
                                <DollarSign size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>Total Products</h3>
                                <p>{stats.productCount}</p>
                            </div>
                            <div style={{ padding: '10px', background: '#fce7f3', borderRadius: '50%', color: '#ec4899' }}>
                                <Package size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>Total Orders</h3>
                                <p>{stats.orderCount}</p>
                            </div>
                            <div style={{ padding: '10px', background: '#dcfce7', borderRadius: '50%', color: '#22c55e' }}>
                                <ShoppingBag size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>Total Users</h3>
                                <p>{stats.userCount}</p>
                            </div>
                            <div style={{ padding: '10px', background: '#f3e8ff', borderRadius: '50%', color: '#a855f7' }}>
                                <Users size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>Categories</h3>
                                <p>{stats.categoryCount}</p>
                            </div>
                            <div style={{ padding: '10px', background: '#ffedd5', borderRadius: '50%', color: '#f97316' }}>
                                <Folder size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
