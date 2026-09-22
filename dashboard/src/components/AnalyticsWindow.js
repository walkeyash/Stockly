import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";

const AnalyticsWindow = ({ uid }) => {
    const { closeAnalyticsWindow } = useContext(GeneralContext);

    const stock = watchlist.find((item) => item.name === uid) || {
        name: uid,
        price: 345.5,
        percent: "+1.2%",
        isDown: false,
    };

    const ltp        = stock.price || 345.5;
    const dayHigh    = (ltp * 1.035).toFixed(2);
    const dayLow     = (ltp * 0.972).toFixed(2);
    const weekHigh52 = (ltp * 1.25).toFixed(2);
    const weekLow52  = (ltp * 0.78).toFixed(2);
    const volume     = "1.42M";
    const mktCap     = "₹4.2T";
    const pe         = "28.4";
    const divYield   = "1.2%";

    const isUp = !stock.isDown;

    return (
        <div
            className="container"
            id="analytics-window"
            style={{
                top: "80px",
                left: "50%",
                width: "420px",
                padding: 0,
            }}
        >
            {/* Header */}
            <div className="window-header" style={{ background: isUp ? "var(--profit, #16a34a)" : "var(--loss, #dc2626)" }}>
                <div>
                    <h3>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        {stock.name}
                    </h3>
                    <div className="subtitle">
                        ₹{ltp} · {stock.percent} · {isUp ? "▲ Bullish" : "▼ Bearish"}
                    </div>
                </div>
                <button className="close-btn" onClick={closeAnalyticsWindow} type="button">✕</button>
            </div>

            {/* Analytics Grid */}
            <div className="analytics-grid">
                <div className="analytics-cell">
                    <div className="a-label">Day High / Low</div>
                    <div className="a-value">₹{dayHigh} <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>/</span> ₹{dayLow}</div>
                </div>
                <div className="analytics-cell">
                    <div className="a-label">52-Wk High / Low</div>
                    <div className="a-value">₹{weekHigh52} <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>/</span> ₹{weekLow52}</div>
                </div>
                <div className="analytics-cell">
                    <div className="a-label">Volume</div>
                    <div className="a-value">{volume}</div>
                </div>
                <div className="analytics-cell">
                    <div className="a-label">Market Cap</div>
                    <div className="a-value">{mktCap}</div>
                </div>
                <div className="analytics-cell">
                    <div className="a-label">P/E Ratio</div>
                    <div className="a-value">{pe}x</div>
                </div>
                <div className="analytics-cell">
                    <div className="a-label">Div. Yield</div>
                    <div className="a-value">{divYield}</div>
                </div>
            </div>

            {/* Footer */}
            <div className="buttons">
                <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Data is indicative only</span>
                <div>
                    <button
                        type="button"
                        className="btn btn-grey"
                        onClick={closeAnalyticsWindow}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsWindow;
