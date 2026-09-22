import React, { useContext, useState, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
    BarChartOutlined,
    MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";

// Chart label colors
const COLORS = [
    'rgba(255,99,132,0.6)',  'rgba(54,162,235,0.6)',
    'rgba(255,206,86,0.6)',  'rgba(75,192,192,0.6)',
    'rgba(153,102,255,0.6)', 'rgba(255,159,64,0.6)',
    'rgba(255,99,132,0.6)',  'rgba(54,162,235,0.6)',
    'rgba(75,192,192,0.6)',
];

// Simulate small realistic price tick ±0.15%
function tick(price) {
    const v = 0.0015;
    return Math.round((price + price * (Math.random() * v * 2 - v)) * 100) / 100;
}

const WatchList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // ── Live prices state (seeded from data.js) ──────────────────
    const [livePrices, setLivePrices] = useState(() => {
        const seed = {};
        watchlist.forEach(s => { seed[s.name] = s.price; });
        return seed;
    });
    const [flashing, setFlashing] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setLivePrices(prev => {
                const next = { ...prev };
                const changed = {};
                watchlist.forEach(s => {
                    const newPrice = tick(prev[s.name]);
                    next[s.name] = newPrice;
                    if (Math.abs(newPrice - prev[s.name]) > 0) {
                        changed[s.name] = newPrice > prev[s.name] ? "up" : "down";
                    }
                });
                setFlashing(changed);
                setTimeout(() => setFlashing({}), 500);
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Build live percent change vs seed price
    const liveWatchlist = watchlist.map(s => {
        const ltp  = livePrices[s.name] ?? s.price;
        const diff = ltp - s.price;
        const pct  = ((diff / s.price) * 100).toFixed(2);
        return { ...s, livePrice: ltp, livePct: pct, liveDown: diff < 0 };
    });

    const filtered = liveWatchlist.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const chartData = {
        labels: watchlist.map(s => s.name),
        datasets: [{
            label: "Price",
            data: watchlist.map(s => livePrices[s.name] ?? s.price),
            backgroundColor: COLORS,
            borderColor:     COLORS.map(c => c.replace("0.6", "1")),
            borderWidth: 1,
        }],
    };

    return (
        <div className="watchlist-container">
            <div className="search-container">
                <input
                    className="search"
                    placeholder="Search eg: infy, tcs, wipro…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="counts">{filtered.length}/50</span>
            </div>

            <div className="watchlist-section-header">
                <span>My Watchlist</span>
                <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "2px 8px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 600 }}>
                    {filtered.length} stocks
                </span>
            </div>

            <ul className="list">
                {filtered.map((stock, index) => (
                    <WatchListItem
                        stock={stock}
                        flash={flashing[stock.name]}
                        key={index}
                    />
                ))}
            </ul>

            <DoughnutChart data={chartData} />

            <div className="watchlist-number">
                <ul>
                    <li style={{ color: "#3b82f6" }}>1</li>
                    <li>2</li><li>3</li><li>4</li><li>5</li>
                </ul>
            </div>
        </div>
    );
};

const WatchListItem = ({ stock, flash }) => {
    const [showActions, setShowActions] = useState(false);
    const isDown = stock.liveDown;
    const ltp    = stock.livePrice.toFixed(2);
    const pct    = stock.livePct;

    return (
        <li
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            style={{
                transition: "background 0.2s",
                background: flash === "up"
                    ? "rgba(34,197,94,0.07)"
                    : flash === "down"
                    ? "rgba(239,68,68,0.07)"
                    : undefined,
            }}
        >
            <div className="item">
                <div>
                    <p style={{
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        color: isDown ? "var(--loss)" : "var(--profit)",
                        marginBottom: "1px",
                    }}>
                        {stock.name}
                    </p>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>NSE</span>
                </div>

                <div className="itemInfo">
                    <span className="percent" style={{ color: isDown ? "var(--loss)" : "var(--profit)" }}>
                        {isDown ? "▼" : "▲"} {Math.abs(pct)}%
                    </span>
                    <span className="price" style={{
                        color: "var(--text-primary)",
                        fontVariantNumeric: "tabular-nums",
                        transition: "color 0.3s",
                    }}>
                        ₹{ltp}
                    </span>
                </div>
            </div>

            {showActions && <WatchListActions uid={stock.name} price={stock.livePrice} />}
        </li>
    );
};

const WatchListActions = ({ uid, price }) => {
    const { openBuyWindow, openSellWindow, openAnalyticsWindow } = useContext(GeneralContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
            if (e.key === "b" || e.key === "B") {
                openBuyWindow(uid, price);
            } else if (e.key === "s" || e.key === "S") {
                openSellWindow(uid, price);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [uid, price, openBuyWindow, openSellWindow]);

    return (
        <span className="actions">
            <span>
                <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="buy" onClick={() => openBuyWindow(uid, price)}>Buy</button>
                </Tooltip>
                <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="sell" onClick={() => openSellWindow(uid, price)}>Sell</button>
                </Tooltip>
                <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action" onClick={() => openAnalyticsWindow(uid)}>
                        <BarChartOutlined className="icon" />
                    </button>
                </Tooltip>
                <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action">
                        <MoreHoriz className="icon" />
                    </button>
                </Tooltip>
            </span>
        </span>
    );
};

export default WatchList;