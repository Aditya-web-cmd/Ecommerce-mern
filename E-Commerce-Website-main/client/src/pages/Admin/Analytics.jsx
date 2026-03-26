import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [customerStats, setCustomerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [statsRes, productsRes, salesRes, revenueRes, customersRes] = await Promise.all([
        axios.get('/api/analytics/order-stats'),
        axios.get('/api/analytics/top-products?limit=5'),
        axios.get('/api/analytics/monthly-sales'),
        axios.get('/api/analytics/revenue'),
        axios.get('/api/analytics/customers')
      ]);

      setStats(statsRes.data.data);
      setTopProducts(productsRes.data.data);
      setMonthlySales(salesRes.data.data);
      setRevenueByCategory(revenueRes.data.data);
      setCustomerStats(customersRes.data.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;
  if (error) return <div className="analytics-error">{error}</div>;

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total Orders</div>
          <div className="metric-value">{stats?.totalOrders || 0}</div>
          <div className="metric-subtext">All time</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Completed Orders</div>
          <div className="metric-value">{stats?.completedOrders || 0}</div>
          <div className="metric-subtext">Paid orders</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total Revenue</div>
          <div className="metric-value">${(stats?.totalRevenue || 0).toFixed(2)}</div>
          <div className="metric-subtext">From completed orders</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Average Order Value</div>
          <div className="metric-value">${(stats?.averageOrderValue || 0).toFixed(2)}</div>
          <div className="metric-subtext">Per order</div>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="analytics-section">
        <h2>Order Status Distribution</h2>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">Pending</span>
            <span className="status-count">{stats?.pendingOrders || 0}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Processing</span>
            <span className="status-count">-</span>
          </div>
          <div className="status-item">
            <span className="status-label">Shipped</span>
            <span className="status-count">{stats?.shippedOrders || 0}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Delivered</span>
            <span className="status-count">{stats?.deliveredOrders || 0}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Cancelled</span>
            <span className="status-count">{stats?.cancelledOrders || 0}</span>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="analytics-section">
        <h2>Top Selling Products</h2>
        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.product?.name || 'Unknown'}</td>
                  <td>{product.totalSold}</td>
                  <td>${product.totalRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Sales */}
      <div className="analytics-section">
        <h2>Monthly Sales</h2>
        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Average Order Value</th>
              </tr>
            </thead>
            <tbody>
              {monthlySales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale._id.month}/{sale._id.year}</td>
                  <td>{sale.totalOrders}</td>
                  <td>${sale.totalRevenue.toFixed(2)}</td>
                  <td>${sale.averageOrderValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue by Category */}
      <div className="analytics-section">
        <h2>Revenue by Category</h2>
        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Revenue</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {revenueByCategory.map((category, index) => (
                <tr key={index}>
                  <td>{category._id}</td>
                  <td>${category.totalRevenue.toFixed(2)}</td>
                  <td>{category.totalOrders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Analytics */}
      {customerStats && (
        <div className="analytics-section">
          <h2>Customer Analytics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Total Customers</div>
              <div className="metric-value">{customerStats.totalCustomers}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">New This Month</div>
              <div className="metric-value">{customerStats.newCustomersThisMonth}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Repeat Customers</div>
              <div className="metric-value">{customerStats.repeatCustomers}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Customer LTV</div>
              <div className="metric-value">${customerStats.averageCustomerLifetimeValue.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
