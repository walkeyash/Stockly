import React, { useState, useEffect } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import AnalyticsWindow from "./AnalyticsWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid) => { },
    closeBuyWindow: () => { },
    openSellWindow: (uid) => { },
    closeSellWindow: () => { },
    openAnalyticsWindow: (uid) => { },
    closeAnalyticsWindow: () => { },
    username: "",
    isLoggedIn: false,
    logout: () => { },
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
    const [isAnalyticsWindowOpen, setIsAnalyticsWindowOpen] = useState(false);
    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [selectedStockPrice, setSelectedStockPrice] = useState(0);
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    useEffect(() => {
        axios.post("http://localhost:3002/verify", {}, { withCredentials: true })
            .then((res) => {
                if (res.data.status && res.data.user) {
                    setUsername(res.data.user);
                    setIsLoggedIn(true);
                    setLoading(false);
                } else {
                    setIsLoggedIn(false);
                    setUsername("");
                    setLoading(false);
                    window.location.href = "http://localhost:3000/login";
                }
            })
            .catch((err) => {
                console.error("Auth verification error:", err);
                setIsLoggedIn(false);
                setUsername("");
                setLoading(false);
                window.location.href = "http://localhost:3000/login";
            });
    }, []);

    const handleOpenBuyWindow = (uid, price = 0) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
        if (price) setSelectedStockPrice(price);
    };

    const handleCloseBuyWindow = (didOrder, qty, price) => {
        setIsBuyWindowOpen(false);
        const stockName = selectedStockUID;
        setSelectedStockUID("");
        if (didOrder) showToast(`✅ Buy order placed for ${stockName} · ${qty} qty @ ₹${price}`, "success");
    };

    const handleOpenSellWindow = (uid, price = 0) => {
        setIsSellWindowOpen(true);
        setSelectedStockUID(uid);
        if (price) setSelectedStockPrice(price);
    };

    const handleCloseSellWindow = (didOrder, qty, price) => {
        setIsSellWindowOpen(false);
        const stockName = selectedStockUID;
        setSelectedStockUID("");
        if (didOrder) showToast(`🔴 Sell order placed for ${stockName} · ${qty} qty @ ₹${price}`, "sell");
    };

    const handleOpenAnalyticsWindow = (uid) => {
        setIsAnalyticsWindowOpen(true);
        setSelectedStockUID(uid);
    };

    const handleCloseAnalyticsWindow = () => {
        setIsAnalyticsWindowOpen(false);
        setSelectedStockUID("");
    };

    const handleLogout = async () => {
        const clearAllCookies = () => {
            const pastDate = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            document.cookie = `username=; ${pastDate}`;
            document.cookie = `token=; ${pastDate}`;
            document.cookie = `username=; domain=localhost; ${pastDate}`;
            document.cookie = `token=; domain=localhost; ${pastDate}`;
            document.cookie = `username=; domain=.localhost; ${pastDate}`;
            document.cookie = `token=; domain=.localhost; ${pastDate}`;
            document.cookie = `username=; domain=127.0.0.1; ${pastDate}`;
            document.cookie = `token=; domain=127.0.0.1; ${pastDate}`;
            localStorage.clear();
            sessionStorage.clear();
        };

        clearAllCookies();

        try {
            await axios.post("http://localhost:3002/logout", {}, { withCredentials: true });
        } catch (e) {
            console.error("Logout request error:", e);
        }

        clearAllCookies();
        setIsLoggedIn(false);
        setUsername("");
        window.location.href = "http://localhost:3000/login";
    };

    if (loading) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f8fafc",
                fontFamily: "'Inter', sans-serif",
                gap: "16px"
            }}>
                <div style={{
                    width: "36px",
                    height: "36px",
                    border: "3px solid #e2e8f0",
                    borderTopColor: "#3b82f6",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite"
                }}></div>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, fontWeight: 500 }}>
                    Verifying your session…
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <GeneralContext.Provider
            value={{
                openBuyWindow:       handleOpenBuyWindow,
                closeBuyWindow:      handleCloseBuyWindow,
                openSellWindow:      handleOpenSellWindow,
                closeSellWindow:     handleCloseSellWindow,
                openAnalyticsWindow: handleOpenAnalyticsWindow,
                closeAnalyticsWindow: handleCloseAnalyticsWindow,
                username: username || "Trader",
                isLoggedIn,
                logout:   handleLogout,
                showToast,
            }}
        >
            {props.children}
            {isBuyWindowOpen      && <BuyActionWindow    uid={selectedStockUID} initialPrice={selectedStockPrice} />}
            {isSellWindowOpen     && <SellActionWindow   uid={selectedStockUID} initialPrice={selectedStockPrice} />}
            {isAnalyticsWindowOpen && <AnalyticsWindow   uid={selectedStockUID} />}

            {/* Toast Notifications */}
            <div style={{
                position: "fixed", bottom: "24px", right: "24px",
                display: "flex", flexDirection: "column", gap: "10px",
                zIndex: 99999,
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: "12px",
                        background: toast.type === "sell" ? "#1a0808" : toast.type === "error" ? "#1a0808" : "#0a1628",
                        color: "#fff",
                        padding: "13px 18px",
                        borderRadius: "10px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                        fontSize: "0.84rem",
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                        borderLeft: `3px solid ${toast.type === "sell" ? "#ef4444" : toast.type === "error" ? "#ef4444" : "#22c55e"}`,
                        minWidth: "280px",
                        maxWidth: "380px",
                        animation: "toastIn 0.25s ease",
                    }}>
                        <span>{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} style={{
                            background: "none", border: "none", color: "rgba(255,255,255,0.5)",
                            cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: "0 2px",
                            flexShrink: 0,
                        }}>✕</button>
                    </div>
                ))}
            </div>
            <style>{`@keyframes toastIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }`}</style>
        </GeneralContext.Provider>
    );
};

export default GeneralContext;