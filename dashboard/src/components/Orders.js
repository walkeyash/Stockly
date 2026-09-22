import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    const fetchOrders = () => {
        axios.get(`${API_BASE_URL}/allOrders`)
            .then((res) => {
                setAllOrders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading orders...</p>
            </div>
        );
    }

    if (allOrders.length === 0) {
        return (
            <>
                <div className="page-header">
                    <h3 className="title">Orders <span className="count-badge">0</span></h3>
                </div>
                <div className="no-orders">
                    <div className="empty-icon">📋</div>
                    <p>You haven't placed any orders today</p>
                    <Link to="/" className="btn btn-blue">Start Trading</Link>
                </div>
            </>
        );
    }

    const buyCount  = allOrders.filter(o => o.mode === "BUY").length;
    const sellCount = allOrders.filter(o => o.mode === "SELL").length;

    const filteredOrders = allOrders.filter(order => {
        if (filter === "BUY") return order.mode === "BUY";
        if (filter === "SELL") return order.mode === "SELL";
        return true;
    });

    const formatTime = (dateStr) => {
        if (!dateStr) return "Just now";
        try {
            const d = new Date(dateStr);
            return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        } catch {
            return "Just now";
        }
    };

    return (
        <>
            <div className="page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h3 className="title" style={{ margin: 0 }}>
                        Orders
                        <span className="count-badge">{allOrders.length}</span>
                    </h3>
                    <div style={{ display: "flex", gap: "8px", fontSize: "0.78rem" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "20px", background: "#eff6ff", color: "var(--accent-blue)", fontWeight: 600 }}>
                            {buyCount} Buy
                        </span>
                        <span style={{ padding: "4px 10px", borderRadius: "20px", background: "var(--loss-bg)", color: "var(--loss)", fontWeight: 600 }}>
                            {sellCount} Sell
                        </span>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {/* Filter buttons */}
                    <div style={{ display: "flex", background: "#f1f5f9", padding: "3px", borderRadius: "8px", gap: "4px" }}>
                        {["ALL", "BUY", "SELL"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    border: "none",
                                    padding: "4px 10px",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    background: filter === f ? "#fff" : "transparent",
                                    color: filter === f ? "#0f172a" : "#64748b",
                                    boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchOrders}
                        style={{
                            padding: "6px 14px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#3b82f6",
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        ↻ Refresh
                    </button>
                </div>
            </div>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Instrument</th>
                            <th>Product</th>
                            <th>Qty.</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={index}>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                                    {formatTime(order.createdAt)}
                                </td>
                                <td style={{ fontWeight: 700 }}>{order.name}</td>
                                <td>
                                    <span className="product-badge">CNC</span>
                                </td>
                                <td>{order.qty}</td>
                                <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                    ₹{order.price ? Number(order.price).toFixed(2) : "0.00"}
                                </td>
                                <td>
                                    <span style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "0.74rem",
                                        fontWeight: 600,
                                        color: "#16a34a",
                                        background: "rgba(34,197,94,0.1)",
                                        padding: "3px 8px",
                                        borderRadius: "12px",
                                    }}>
                                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e" }}></span>
                                        {order.status || "COMPLETE"}
                                    </span>
                                </td>
                                <td>
                                    <span className={`mode-badge ${order.mode === "BUY" ? "buy" : "sell"}`}>
                                        {order.mode}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Orders;