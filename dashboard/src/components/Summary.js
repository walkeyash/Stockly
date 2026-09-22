import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

// Simulate a realistic small market tick
function tick(price) {
    const volatility = 0.0012; // ±0.12%
    const change = price * (Math.random() * volatility * 2 - volatility);
    return Math.round((price + change) * 100) / 100;
}

const Summary = () => {
    const { username } = useContext(GeneralContext);
    const displayName = username && username !== "Trader"
        ? username
        : (localStorage.getItem("username") || "Trader");

    // ── Real data from API ──────────────────────────────────────
    const [holdings,  setHoldings]  = useState([]);
    const [orders,    setOrders]    = useState([]);
    const [positions, setPositions] = useState([]);
    const [margin,    setMargin]    = useState(50000);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/allHoldings`)
            .then(r => setHoldings(r.data)).catch(() => {});
        axios.get(`${API_BASE_URL}/allOrders`)
            .then(r => setOrders(r.data)).catch(() => {});
        axios.get(`${API_BASE_URL}/allPositions`)
            .then(r => setPositions(r.data)).catch(() => {});
        axios.get(`${API_BASE_URL}/funds`)
            .then(r => { if (r.data && r.data.balance !== undefined) setMargin(r.data.balance); }).catch(() => {});
    }, []);

    // ── Live price simulation for watchlist items ────────────────
    const [livePrices, setLivePrices] = useState({});

    useEffect(() => {
        if (!holdings.length && !positions.length) return;
        // Seed initial live prices from holdings & positions
        const seed = {};
        [...holdings, ...positions].forEach(s => { seed[s.name] = s.price; });
        setLivePrices(seed);

        const interval = setInterval(() => {
            setLivePrices(prev => {
                const next = { ...prev };
                Object.keys(next).forEach(name => { next[name] = tick(next[name]); });
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [holdings.length, positions.length]);

    // ── Derived stats ────────────────────────────────────────────
    const totalInvestment = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
    const currentValue    = holdings.reduce((s, h) => s + (livePrices[h.name] ?? h.price) * h.qty, 0);
    const holdingsPnL     = currentValue - totalInvestment;
    const holdingsPct     = totalInvestment > 0 ? ((holdingsPnL / totalInvestment) * 100).toFixed(2) : "0.00";
    const isPnLProfit     = holdingsPnL >= 0;

    const positionsPnL    = positions.reduce((s, p) => {
        const ltp = livePrices[p.name] ?? p.price;
        return s + (ltp - p.avg) * p.qty;
    }, 0);

    // ── Time ─────────────────────────────────────────────────────
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

    // ── Market status ─────────────────────────────────────────────
    const istOffset  = 5.5 * 60;
    const utcMin     = now.getUTCHours() * 60 + now.getUTCMinutes();
    const istMin     = (utcMin + istOffset) % (24 * 60);
    const istHour    = Math.floor(istMin / 60);
    const istMinute  = istMin % 60;
    const dayOfWeek  = now.getUTCDay();
    const isWeekday  = dayOfWeek >= 1 && dayOfWeek <= 5;
    const afterOpen  = istHour > 9 || (istHour === 9 && istMinute >= 0);
    const beforeClose = istHour < 15 || (istHour === 15 && istMinute === 0);
    const isMarketOpen = isWeekday && afterOpen && beforeClose;
    const isPreOpen    = isWeekday && istHour === 9 && istMinute < 15;
    const marketLabel  = isPreOpen ? "Pre-Open" : isMarketOpen ? "Market Open" : "Market Closed";
    const marketColor  = isPreOpen ? "#f59e0b" : isMarketOpen ? "#22c55e" : "#94a3b8";
    const marketBg     = isPreOpen ? "rgba(245,158,11,0.12)" : isMarketOpen ? "rgba(34,197,94,0.12)" : "rgba(148,163,184,0.12)";
    const marketBorder = isPreOpen ? "rgba(245,158,11,0.25)" : isMarketOpen ? "rgba(34,197,94,0.25)" : "rgba(148,163,184,0.25)";

    const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <>
            {/* Greeting Bar */}
            <div className="greeting-bar">
                <div>
                    <h2>Good {now.getHours() < 12 ? "Morning" : now.getHours() < 17 ? "Afternoon" : "Evening"}, {displayName}! 👋</h2>
                    <p>{dateStr} · {timeStr} IST</p>
                </div>
                <div className="market-status" style={{ color: marketColor, background: marketBg, border: `1px solid ${marketBorder}` }}>
                    <span className="dot" style={{ background: marketColor, animation: isMarketOpen ? "pulse 1.8s infinite" : "none" }}></span>
                    {marketLabel}
                </div>
            </div>

            {/* Quick Stats — LIVE from API */}
            <div className="stat-cards-grid">
                <div className="stat-card">
                    <div className="card-icon" style={{ background: "#eff6ff" }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>
                    </div>
                    <div className="label">Equity Margin</div>
                    <div className="value">₹{fmt(margin)}</div>
                    <div className="sub">Available for trading</div>
                    <div className="change-pill profit">↑ Funded</div>
                </div>

                <div className="stat-card">
                    <div className="card-icon" style={{ background: isPnLProfit ? "#f0fdf4" : "#fef2f2" }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke={isPnLProfit ? "#22c55e" : "#ef4444"} strokeWidth="2" strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    </div>
                    <div className="label">Holdings P&L</div>
                    <div className="value" style={{ color: isPnLProfit ? "var(--profit)" : "var(--loss)" }}>
                        {holdings.length > 0 ? `${isPnLProfit ? "+" : ""}₹${fmt(holdingsPnL)}` : "—"}
                    </div>
                    <div className="sub">Across {holdings.length} stocks</div>
                    <div className={`change-pill ${isPnLProfit ? "profit" : "loss"}`}>
                        {holdings.length > 0 ? `${holdingsPct >= 0 ? "+" : ""}${holdingsPct}% overall` : "No holdings"}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="card-icon" style={{ background: "#fff7ed" }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#f97316" strokeWidth="2" strokeLinecap="round" d="M16 8v5l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div className="label">Today's Orders</div>
                    <div className="value">{orders.length}</div>
                    <div className="sub">{orders.length === 0 ? "No orders placed" : `${orders.filter(o => o.mode === "BUY").length} buy · ${orders.filter(o => o.mode === "SELL").length} sell`}</div>
                    <div className={`change-pill ${orders.length > 0 ? "profit" : "loss"}`}>
                        {orders.length > 0 ? "Active" : "—"}
                    </div>
                </div>
            </div>

            {/* Equity Section */}
            <div className="summary-section">
                <div className="summary-section-title">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>
                    Equity
                </div>
                <div className="summary-data-row">
                    <div className="summary-metric">
                        <div className="big-value">₹{fmt(margin)}</div>
                        <div className="metric-label">Margin available</div>
                    </div>
                    <div className="summary-details">
                        <div className="detail-row">
                            <span className="d-label">Margins used</span>
                            <span className="d-value">₹0.00</span>
                        </div>
                        <div className="detail-row">
                            <span className="d-label">Opening balance</span>
                            <span className="d-value">₹{fmt(margin)}</span>
                        </div>
                        <div className="detail-row">
                            <span className="d-label">Collateral</span>
                            <span className="d-value">₹0.00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Holdings Section — live data */}
            <div className="summary-section">
                <div className="summary-section-title">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    Holdings ({holdings.length})
                </div>
                {holdings.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No holdings in your portfolio yet.</p>
                ) : (
                    <div className="summary-data-row">
                        <div className="summary-metric">
                            <div className={`big-value ${isPnLProfit ? "profit" : "loss"}`}>
                                {isPnLProfit ? "+" : ""}₹{fmt(holdingsPnL)}{" "}
                                <small>{holdingsPct >= 0 ? "+" : ""}{holdingsPct}%</small>
                            </div>
                            <div className="metric-label">Total P&L (live)</div>
                        </div>
                        <div className="summary-details">
                            <div className="detail-row">
                                <span className="d-label">Current Value</span>
                                <span className="d-value">₹{fmt(currentValue)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="d-label">Total Investment</span>
                                <span className="d-value">₹{fmt(totalInvestment)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="d-label">Positions P&L</span>
                                <span className="d-value" style={{ color: positionsPnL >= 0 ? "var(--profit)" : "var(--loss)" }}>
                                    {positionsPnL >= 0 ? "+" : ""}₹{fmt(positionsPnL)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Summary;