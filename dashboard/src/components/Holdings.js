import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { API_BASE_URL } from "../config";

function tick(price) {
    const volatility = 0.0012; // ±0.12%
    const change = price * (Math.random() * volatility * 2 - volatility);
    return Math.round((price + change) * 100) / 100;
}

const Holdings = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const [livePrices, setLivePrices] = useState({});
    const [flashing, setFlashing] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchHoldings = () => {
        axios.get(`${API_BASE_URL}/allHoldings`)
            .then((res) => {
                setAllHoldings(res.data);
                const seed = {};
                res.data.forEach(s => { seed[s.name] = s.price; });
                setLivePrices(seed);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchHoldings();
    }, []);

    // Live price simulation ticks every 2.5s
    useEffect(() => {
        if (!allHoldings.length) return;
        const interval = setInterval(() => {
            setLivePrices(prev => {
                const next = { ...prev };
                const changed = {};
                allHoldings.forEach(stock => {
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
    }, [allHoldings]);

    const labels = allHoldings.map((s) => s["name"]);
    const data = {
        labels,
        datasets: [{
            label: "Live Stock Price (₹)",
            data: allHoldings.map((s) => livePrices[s.name] || s.price),
            backgroundColor: "rgba(59,130,246,0.5)",
            borderColor: "#3b82f6",
            borderWidth: 1,
        }],
    };

    const totalInvestment = allHoldings.reduce((acc, s) => acc + s.avg * s.qty, 0);
    const currentValue    = allHoldings.reduce((acc, s) => acc + (livePrices[s.name] || s.price) * s.qty, 0);
    const totalPnL        = currentValue - totalInvestment;
    const pnlPercent      = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : "0.00";
    const isPnLProfit     = totalPnL >= 0;

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading holdings...</p>
            </div>
        );
    }

    return (
        <>
            <div className="page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 className="title">
                    Holdings
                    <span className="count-badge">{allHoldings.length}</span>
                </h3>
                <button
                    onClick={fetchHoldings}
                    style={{
                        padding: "6px 14px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#3b82f6",
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    ↻ Refresh
                </button>
            </div>

            <div className="order-table" style={{ marginBottom: "20px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Avg. Cost</th>
                            <th>LTP</th>
                            <th>Cur. Value</th>
                            <th>P&L</th>
                            <th>Net Chg.</th>
                            <th>Day Chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allHoldings.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                                    No holdings found. Place an order to see it appear here!
                                </td>
                            </tr>
                        ) : allHoldings.map((stock, index) => {
                            const ltp       = livePrices[stock.name] || stock.price;
                            const curValue  = ltp * stock.qty;
                            const diff      = curValue - stock.avg * stock.qty;
                            const isProfit  = diff >= 0;
                            const profClass = isProfit ? "profit" : "loss";
                            const netPct    = ((diff / (stock.avg * stock.qty)) * 100).toFixed(2);
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
                                    <td style={{ fontWeight: 700 }}>{stock.name}</td>
                                    <td>{stock.qty}</td>
                                    <td>₹{stock.avg.toFixed(2)}</td>
                                    <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                        ₹{ltp.toFixed(2)}
                                        {flash === "up" && <span style={{ color: "#22c55e", fontSize: "0.75rem", marginLeft: "4px" }}>▲</span>}
                                        {flash === "down" && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginLeft: "4px" }}>▼</span>}
                                    </td>
                                    <td>₹{curValue.toFixed(2)}</td>
                                    <td className={profClass}>
                                        {isProfit ? "+" : ""}₹{diff.toFixed(2)}
                                    </td>
                                    <td className={profClass}>
                                        {netPct >= 0 ? "+" : ""}{netPct}%
                                    </td>
                                    <td className={profClass}>{stock.day || "+0.00%"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="row">
                <div className="col">
                    <p>Total Investment</p>
                    <h5>₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
                </div>
                <div className="col">
                    <p>Current Value</p>
                    <h5>₹{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
                </div>
                <div className="col">
                    <p>Total P&L</p>
                    <h5 className={isPnLProfit ? "profit" : "loss"}>
                        {isPnLProfit ? "+" : ""}₹{totalPnL.toFixed(2)}
                        <span style={{ fontSize: "0.85rem", marginLeft: "6px", fontWeight: 500 }}>
                            ({pnlPercent >= 0 ? "+" : ""}{pnlPercent}%)
                        </span>
                    </h5>
                </div>
            </div>

            <div style={{ marginTop: "24px" }}>
                <VerticalGraph data={data} />
            </div>
        </>
    );
};

export default Holdings;