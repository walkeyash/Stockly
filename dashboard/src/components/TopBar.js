import React, { useState, useEffect } from "react";
import Menu from "./Menu";

// Base index values
const BASE = {
    nifty:  { value: 22458.35, label: "NIFTY 50" },
    sensex: { value: 73891.20, label: "SENSEX" },
};

// Simulate realistic small price movements
function tick(base, volatility = 0.0008) {
    const change = base * (Math.random() * volatility * 2 - volatility);
    return Math.round((base + change) * 100) / 100;
}

const TopBar = () => {
    const [nifty, setNifty]   = useState(BASE.nifty.value);
    const [sensex, setSensex] = useState(BASE.sensex.value);
    const [time, setTime]     = useState(new Date());

    const niftyOpen  = BASE.nifty.value;
    const sensexOpen = BASE.sensex.value;

    // Simulate live price ticks every 3 seconds
    useEffect(() => {
        const priceTimer = setInterval(() => {
            setNifty(prev  => tick(prev, 0.0006));
            setSensex(prev => tick(prev, 0.0006));
        }, 3000);
        return () => clearInterval(priceTimer);
    }, []);

    // Live clock — updates every second
    useEffect(() => {
        const clockTimer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(clockTimer);
    }, []);

    const niftyChange  = nifty  - niftyOpen;
    const sensexChange = sensex - sensexOpen;
    const niftyPct     = ((niftyChange  / niftyOpen)  * 100).toFixed(2);
    const sensexPct    = ((sensexChange / sensexOpen) * 100).toFixed(2);
    const niftyUp      = niftyChange  >= 0;
    const sensexUp     = sensexChange >= 0;

    const timeStr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    return (
        <div className="topbar-container">
            <div className="indices-container">
                {/* NIFTY 50 */}
                <div className="nifty">
                    <span className="index">NIFTY 50</span>
                    <span className="index-points" style={{ color: niftyUp ? "var(--profit)" : "var(--loss)" }}>
                        {nifty.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="percent" style={{ color: niftyUp ? "var(--profit)" : "var(--loss)" }}>
                        {niftyUp ? "▲" : "▼"} {Math.abs(niftyPct)}%
                    </span>
                </div>

                {/* SENSEX */}
                <div className="sensex">
                    <span className="index">SENSEX</span>
                    <span className="index-points" style={{ color: sensexUp ? "var(--profit)" : "var(--loss)" }}>
                        {sensex.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="percent" style={{ color: sensexUp ? "var(--profit)" : "var(--loss)" }}>
                        {sensexUp ? "▲" : "▼"} {Math.abs(sensexPct)}%
                    </span>
                </div>

                {/* Live clock */}
                <div style={{
                    marginLeft: "auto",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    paddingLeft: "14px",
                    borderLeft: "1px solid var(--border)",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.3px",
                }}>
                    {timeStr} IST
                </div>
            </div>
            <Menu />
        </div>
    );
};

export default TopBar;