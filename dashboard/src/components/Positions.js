import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

function tick(price) {
    const volatility = 0.0012;
    const change = price * (Math.random() * volatility * 2 - volatility);
    return Math.round((price + change) * 100) / 100;
}

const Positions = () => {
    const [allPositions, setAllPositions] = useState([]);
    const [livePrices, setLivePrices] = useState({});
    const [flashing, setFlashing] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchPositions = () => {
        axios.get(`${API_BASE_URL}/allPositions`)
            .then((res) => {
                setAllPositions(res.data);
                const seed = {};
                res.data.forEach(s => { seed[s.name] = s.price; });
                setLivePrices(seed);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    useEffect(() => {
        if (!allPositions.length) return;
        const interval = setInterval(() => {
            setLivePrices(prev => {
                const next = { ...prev };
                const changed = {};
                allPositions.forEach(stock => {
                    const currentPrice = prev[stock.name] || stock.price;
                    const newPrice = tick(currentPrice);
                    next[stock.name] = newPrice;
                    if (newPrice !== currentPrice) {
                        changed[stock.name] = newPrice > currentPrice ? "up" : "down";
                    }
                });
                setFlashing(changed);
                setTimeout(() => setFlashing({}), 600);
                return next;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [allPositions]);

    const totalPnL = allPositions.reduce((acc, s) => {
        const ltp = livePrices[s.name] || s.price;
        return acc + (ltp * s.qty - s.avg * s.qty);
    }, 0);
    const isPnLProfit = totalPnL >= 0;

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading positions...</p>
            </div>
        );
    }

    return (
        <>
            <div className="page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h3 className="title" style={{ margin: 0 }}>
                        Positions
                        <span className="count-badge">{allPositions.length}</span>
                    </h3>
                    {allPositions.length > 0 && (
                        <div style={{
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            background: isPnLProfit ? "var(--profit-bg)" : "var(--loss-bg)",
                            color: isPnLProfit ? "var(--profit)" : "var(--loss)"
                        }}>
                            Day P&L: {isPnLProfit ? "+" : ""}₹{totalPnL.toFixed(2)}
                        </div>
                    )}
                </div>
                <button
                    onClick={fetchPositions}
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

            {allPositions.length === 0 ? (
                <div className="no-orders">
                    <div className="empty-icon">📊</div>
                    <p>No open positions today</p>
                </div>
            ) : (
                <div className="order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Instrument</th>
                                <th>Qty.</th>
                                <th>Avg.</th>
                                <th>LTP</th>
                                <th>P&L</th>
                                <th>Day Chg.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPositions.map((stock, index) => {
                                const ltp       = livePrices[stock.name] || stock.price;
                                const curValue  = ltp * stock.qty;
                                const diff      = curValue - stock.avg * stock.qty;
                                const isProfit  = diff >= 0;
                                const profClass = isProfit ? "profit" : "loss";
                                const flash     = flashing[stock.name];

                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            transition: "background 0.25s ease",
                                            background: flash === "up"
                                                ? "rgba(34,197,94,0.08)"
                                                : flash === "down"
                                                ? "rgba(239,68,68,0.08)"
                                                : undefined,
                                        }}
                                    >
                                        <td>
                                            <span className="product-badge">{stock.product}</span>
                                        </td>
                                        <td style={{ fontWeight: 700 }}>{stock.name}</td>
                                        <td>{stock.qty}</td>
                                        <td>₹{stock.avg.toFixed(2)}</td>
                                        <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                            ₹{ltp.toFixed(2)}
                                            {flash === "up" && <span style={{ color: "#22c55e", fontSize: "0.75rem", marginLeft: "4px" }}>▲</span>}
                                            {flash === "down" && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginLeft: "4px" }}>▼</span>}
                                        </td>
                                        <td className={profClass}>
                                            {isProfit ? "+" : ""}₹{diff.toFixed(2)}
                                        </td>
                                        <td className={profClass}>{stock.day || "+0.00%"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Positions;