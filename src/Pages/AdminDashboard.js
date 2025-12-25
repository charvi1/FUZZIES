
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { FaBox, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import './AdminDashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        rating: '',
        images: ''
    });
    const [editingProductId, setEditingProductId] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, products, orders

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2151';

    useEffect(() => {
        fetchProducts();
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/orders`); // Ensure this route exists and is protected/admin-only
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageUrls = formData.images.split(',').map(url => url.trim());
            const dataToSend = { ...formData, images: imageUrls };

            if (editingProductId) {
                await axios.put(`${API_URL}/api/products/${editingProductId}`, dataToSend);
                setFeedbackMessage('Product updated successfully!');
            } else {
                await axios.post(`${API_URL}/api/products/create`, dataToSend);
                setFeedbackMessage('Product created successfully!');
            }

            fetchProducts();
            setFormData({ name: '', description: '', price: '', category: '', rating: '', images: '' });
            setEditingProductId(null);
        } catch (error) {
            console.error('Error submitting form:', error);
            setFeedbackMessage('An error occurred. Please try again.');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category.name || product.category, // Handle populated vs unpopulated
            rating: product.rating,
            images: product.images.join(', ')
        });
        setEditingProductId(product._id);
        setFeedbackMessage('');
        setActiveTab('products');
        // Scroll to form if needed
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`${API_URL}/api/products/${id}`);
            fetchProducts();
            setFeedbackMessage('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            setFeedbackMessage('An error occurred while deleting the product.');
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
            fetchOrders(); // Refresh orders
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // --- Chart Data Preparation ---
    // --- Chart Data Preparation ---
    const categoryData = products.reduce((acc, curr) => {
        // Handle both populated category object and simple string
        const catName = (typeof curr.category === 'object' && curr.category !== null && curr.category.name)
            ? curr.category.name
            : (curr.category || 'Uncategorized');

        acc[catName] = (acc[catName] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                label: '# of Products',
                data: Object.values(categoryData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)',
                    'rgba(40, 159, 64, 0.6)',
                    'rgba(210, 199, 199, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Real Sales Data Aggregation
    const salesByMonth = orders.reduce((acc, order) => {
        const date = new Date(order.date || Date.now());
        const month = date.toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + (order.totalAmount || 0);
        return acc;
    }, {});

    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Create data arrays ensuring all months are represented (0 if no sales)
    const salesValues = allMonths.map(month => salesByMonth[month] || 0);

    // Dummy Target Line Data (Smooth curve)
    const targetValues = [1200, 1500, 1100, 1800, 2000, 2200, 1900, 2400, 2600, 2800, 3000, 3200];

    const salesData = {
        labels: allMonths,
        datasets: [
            {
                label: 'Actual Sales ($)',
                data: salesValues,
                borderColor: '#f39c12', /* Brand Gold */
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Target Sales ($)',
                data: targetValues,
                borderColor: '#CAC0B5', /* Brand Beige */
                borderDash: [5, 5],
                backgroundColor: 'transparent',
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}><FaChartLine /> Dashboard</li>
                    <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}><FaBox /> Products</li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}><FaShoppingCart /> Orders</li>
                </ul>
            </div>

            <div className="admin-content">
                <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                {feedbackMessage && <div className={`feedback-message ${feedbackMessage.includes('error') ? 'error' : 'success'}`}>{feedbackMessage}</div>}

                {activeTab === 'dashboard' && (
                    <div className="dashboard-widgets">
                        <div className="widget-container">
                            <div className="widget">
                                <h3>Total Products</h3>
                                <p>{products.length}</p>
                            </div>
                            <div className="widget">
                                <h3>Total Orders</h3>
                                <p>{orders.length}</p>
                            </div>
                            <div className="widget">
                                <h3>Total Revenue</h3>
                                <p>${orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0)}</p>
                            </div>
                        </div>
                        <div className="charts-container">
                            <div className="chart-wrapper">
                                <h3>Product Categories</h3>
                                <Doughnut
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom', // Names will appear below the chart
                                                labels: {
                                                    boxWidth: 20
                                                }
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context) {
                                                        const label = context.label || '';
                                                        const value = context.raw || 0;
                                                        const total = context.chart._metasets[context.datasetIndex].total;
                                                        const percentage = Math.round((value / total) * 100) + '%';
                                                        return `${label}: ${value} (${percentage})`;
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="chart-wrapper">
                                <h3>Monthly Sales</h3>
                                <Line data={salesData} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="products-management">
                        <form onSubmit={handleSubmit} className="product-form">
                            <h3>{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input name="price" value={formData.price} onChange={handleChange} type="number" required />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input name="category" value={formData.category} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Rating</label>
                                    <input name="rating" value={formData.rating} onChange={handleChange} type="number" required />
                                </div>
                                <div className="form-group full-width">
                                    <label>Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                                </div>
                                <div className="form-group full-width">
                                    <label>Image URLs (comma separated)</label>
                                    <input name="images" value={formData.images} onChange={handleChange} required />
                                </div>
                            </div>
                            <button type="submit" className="submit-button">
                                {editingProductId ? 'Update Product' : 'Create Product'}
                            </button>
                        </form>

                        <div className="product-list-container">
                            <h3>Product List</h3>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category?.name || product.category}</td>
                                            <td>
                                                <button onClick={() => handleEdit(product)} className="action-btn edit">Edit</button>
                                                <button onClick={() => handleDelete(product._id)} className="action-btn delete">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-management">
                        <h3>Orders</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.userId?.name || order.userId}</td>
                                        <td>${order.totalAmount}</td>
                                        <td>
                                            <span className={`status-badge ${order.paymentStatus?.toLowerCase()}`}>
                                                {order.paymentStatus || 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                value={order.paymentStatus || 'Pending'}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
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

export default AdminDashboard;