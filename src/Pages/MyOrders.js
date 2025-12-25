import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.email) {
                    setError('Please log in to view orders.');
                    setLoading(false);
                    return;
                }

                // Use the user's email to fetch their specific orders
                const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:2151'}/api/orders/my-orders?email=${user.email}`);
                if (res.data.success) {
                    setOrders(res.data.orders);
                } else {
                    setError('Failed to load orders.');
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Could not fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="my-orders-loading">Loading orders...</div>;
    if (error) return <div className="my-orders-error">{error}</div>;

    return (
        <div className="my-orders-page">
            <div className="my-orders-container">
                <h1 className="my-orders-title">My Orders</h1>
                {orders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders found.</p>
                        <a href="/products" className="shop-now-btn">Shop Now</a>
                    </div>
                ) : (
                    <div className="orders-table-wrapper">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="order-id">#{order._id.slice(-6)}</td>
                                        <td>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>
                                            {order.items.length} items
                                        </td>
                                        <td className="order-total">${order.totalAmount}</td>
                                        <td>
                                            <span className={`status-badge ${order.paymentStatus?.toLowerCase()}`}>
                                                {order.paymentStatus || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
