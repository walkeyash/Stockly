import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

const Funds = () => {
    const { showToast } = useContext(GeneralContext);
    const [balance, setBalance] = useState(50000);
    const [holdings, setHoldings] = useState([]);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [amountInput, setAmountInput] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const fetchFundsData = () => {
        Promise.all([
            axios.get(`${API_BASE_URL}/funds`),
            axios.get(`${API_BASE_URL}/allHoldings`),
        ])
            .then(([fundsRes, holdingsRes]) => {
                if (fundsRes.data && fundsRes.data.balance !== undefined) {
                    setBalance(fundsRes.data.balance);
                }
                if (holdingsRes.data) {
                    setHoldings(holdingsRes.data);
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        fetchFundsData();
    }, []);

    const usedMargin = holdings.reduce((sum, h) => sum + (h.avg * h.qty), 0);
    const availableMargin = balance;
    const availableCash = balance;
    const totalCollateral = 0.00;

    const handleAddFunds = async (e) => {
        if (e) e.preventDefault();
        const num = Number(amountInput);
        if (!num || num <= 0) return;
        setActionLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/addFunds`, { amount: num });
            if (res.data && res.data.balance !== undefined) {
                setBalance(res.data.balance);
            }
            if (showToast) showToast(`✅ ₹${num.toLocaleString("en-IN")} added successfully via UPI!`, "success");
            setShowAddModal(false);
            setAmountInput("");
        } catch (err) {
            console.error(err);
            if (showToast) showToast("Failed to add funds. Please try again.", "error");
        } finally {
            setActionLoading(false);
        }
    };

    const handleWithdrawFunds = async (e) => {
        if (e) e.preventDefault();
        const num = Number(amountInput);
        if (!num || num <= 0) return;
        if (num > availableMargin) {
            if (showToast) showToast("Amount exceeds available margin!", "error");
            return;
        }
        setActionLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/withdrawFunds`, { amount: num });
            if (res.data && res.data.balance !== undefined) {
                setBalance(res.data.balance);
            }
            if (showToast) showToast(`💸 ₹${num.toLocaleString("en-IN")} payout initiated to registered bank!`, "success");
            setShowWithdrawModal(false);
            setAmountInput("");
        } catch (err) {
            console.error(err);
            if (showToast) showToast("Failed to withdraw funds. Please try again.", "error");
        } finally {
            setActionLoading(false);
        }
    };

    const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <>
            <div className="page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 className="title">Funds</h3>
                <button
                    onClick={fetchFundsData}
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

            {/* Header Action Bar */}
            <div className="funds-header">
                <p>Instant, zero-cost fund transfers with UPI & Net Banking</p>
                <div className="btn-group">
                    <button
                        className="btn btn-green"
                        onClick={() => { setAmountInput(""); setShowAddModal(true); }}
                    >
                        + Add Funds
                    </button>
                    <button
                        className="btn btn-blue"
                        onClick={() => { setAmountInput(""); setShowWithdrawModal(true); }}
                    >
                        ↑ Withdraw
                    </button>
                </div>
            </div>

            <div className="funds-grid">
                {/* Equity Card */}
                <div className="funds-card">
                    <div className="funds-card-title">
                        <span className="icon-dot"></span>
                        Equity
                    </div>

                    <div className="data-row">
                        <span className="d-key">Available Margin</span>
                        <span className="d-val highlight" style={{ color: "#16a34a", fontWeight: 800 }}>
                            ₹{fmt(availableMargin)}
                        </span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Used Margin (Holdings)</span>
                        <span className="d-val" style={{ fontWeight: 600 }}>
                            ₹{fmt(usedMargin)}
                        </span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Available Cash</span>
                        <span className="d-val">₹{fmt(availableCash)}</span>
                    </div>

                    <div style={{ margin: "16px 0 8px", borderTop: "1px solid var(--border-light)", paddingTop: "12px" }}>
                        <div className="funds-card-title" style={{ marginBottom: "12px", fontSize: "0.68rem" }}>
                            <span className="icon-dot" style={{ background: "var(--text-muted)" }}></span>
                            Breakdown
                        </div>
                    </div>

                    <div className="data-row">
                        <span className="d-key">Opening Balance</span>
                        <span className="d-val">₹{fmt(availableMargin + usedMargin)}</span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Invested Equity</span>
                        <span className="d-val">₹{fmt(usedMargin)}</span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">SPAN Margin</span>
                        <span className="d-val">₹0.00</span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Delivery Margin</span>
                        <span className="d-val">₹0.00</span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Exposure</span>
                        <span className="d-val">₹0.00</span>
                    </div>

                    <div style={{ margin: "16px 0 8px", borderTop: "1px solid var(--border-light)", paddingTop: "12px" }}>
                        <div className="funds-card-title" style={{ marginBottom: "12px", fontSize: "0.68rem" }}>
                            <span className="icon-dot" style={{ background: "var(--text-muted)" }}></span>
                            Collateral
                        </div>
                    </div>

                    <div className="data-row">
                        <span className="d-key">Liquid Funds</span>
                        <span className="d-val">₹0.00</span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Equity</span>
                        <span className="d-val">₹0.00</span>
                    </div>
                    <div className="data-row">
                        <span className="d-key">Total Collateral</span>
                        <span className="d-val" style={{ fontWeight: 700 }}>₹{fmt(totalCollateral)}</span>
                    </div>
                </div>

                {/* Commodity Card */}
                <div className="funds-card">
                    <div className="funds-card-title">
                        <span className="icon-dot" style={{ background: "var(--accent-orange)" }}></span>
                        Commodity
                    </div>
                    <div className="commodity-placeholder">
                        <div style={{ fontSize: "2.5rem", opacity: 0.2 }}>🏭</div>
                        <p>You don't have a commodity account</p>
                        <button className="btn btn-blue" onClick={() => {
                            if (showToast) showToast("Commodity account activation requested!", "success");
                        }}>
                            Open Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Funds Modal */}
            {showAddModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 99999,
                }}>
                    <div style={{
                        background: "#fff", borderRadius: "14px", width: "420px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        padding: "24px 28px", fontFamily: "'Inter', sans-serif"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                                Add Funds
                            </h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#94a3b8" }}
                            >
                                ✕
                            </button>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 16px" }}>
                            Add virtual trading margin directly to your Stockly balance.
                        </p>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                                Amount (₹)
                            </label>
                            <input
                                type="number"
                                min="100"
                                step="100"
                                placeholder="Enter amount (e.g. 10000)"
                                value={amountInput}
                                onChange={(e) => setAmountInput(e.target.value)}
                                autoFocus
                                style={{
                                    width: "100%", padding: "10px 14px", fontSize: "1.1rem",
                                    borderRadius: "8px", border: "1.5px solid #cbd5e1",
                                    outline: "none", boxSizing: "border-box", fontWeight: 700
                                }}
                            />
                        </div>

                        {/* Quick Presets */}
                        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
                            {[5000, 10000, 25000, 50000, 100000].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmountInput(String(val))}
                                    style={{
                                        padding: "6px 12px", borderRadius: "6px",
                                        border: "1px solid #e2e8f0", background: "#f8fafc",
                                        fontSize: "0.78rem", fontWeight: 600, color: "#475569",
                                        cursor: "pointer"
                                    }}
                                >
                                    +₹{val >= 1000 ? `${val / 1000}k` : val}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                style={{
                                    padding: "10px 18px", borderRadius: "8px",
                                    background: "#f1f5f9", border: "none", color: "#475569",
                                    fontSize: "0.88rem", fontWeight: 600, cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={actionLoading || !amountInput}
                                onClick={handleAddFunds}
                                style={{
                                    padding: "10px 22px", borderRadius: "8px",
                                    background: "#16a34a", border: "none", color: "#fff",
                                    fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                                    boxShadow: "0 4px 12px rgba(22,163,74,0.3)"
                                }}
                            >
                                {actionLoading ? "Processing…" : "Deposit Funds"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdraw Funds Modal */}
            {showWithdrawModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 99999,
                }}>
                    <div style={{
                        background: "#fff", borderRadius: "14px", width: "420px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        padding: "24px 28px", fontFamily: "'Inter', sans-serif"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                                Withdraw Funds
                            </h3>
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#94a3b8" }}
                            >
                                ✕
                            </button>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 16px" }}>
                            Max withdrawable: <strong style={{ color: "#0f172a" }}>₹{fmt(availableMargin)}</strong>
                        </p>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                                Amount to Withdraw (₹)
                            </label>
                            <input
                                type="number"
                                min="100"
                                max={availableMargin}
                                step="100"
                                placeholder={`Up to ₹${availableMargin}`}
                                value={amountInput}
                                onChange={(e) => setAmountInput(e.target.value)}
                                autoFocus
                                style={{
                                    width: "100%", padding: "10px 14px", fontSize: "1.1rem",
                                    borderRadius: "8px", border: "1.5px solid #cbd5e1",
                                    outline: "none", boxSizing: "border-box", fontWeight: 700
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                            <button
                                type="button"
                                onClick={() => setShowWithdrawModal(false)}
                                style={{
                                    padding: "10px 18px", borderRadius: "8px",
                                    background: "#f1f5f9", border: "none", color: "#475569",
                                    fontSize: "0.88rem", fontWeight: 600, cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={actionLoading || !amountInput || Number(amountInput) > availableMargin}
                                onClick={handleWithdrawFunds}
                                style={{
                                    padding: "10px 22px", borderRadius: "8px",
                                    background: "#3b82f6", border: "none", color: "#fff",
                                    fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                                    boxShadow: "0 4px 12px rgba(59,130,246,0.3)"
                                }}
                            >
                                {actionLoading ? "Processing…" : "Withdraw to Bank"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Funds;