import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid, initialPrice }) => {
    const { closeSellWindow } = useContext(GeneralContext);
    const [stockQuantity, setStockQuantity] = useState(1);
    const resolvedPrice = initialPrice || (watchlist.find(s => s.name === uid)?.price ?? 100);
    const [stockPrice, setStockPrice]       = useState(resolvedPrice);
    const [activeTab, setActiveTab]         = useState("Market");

    useEffect(() => {
        if (initialPrice) setStockPrice(initialPrice);
    }, [initialPrice]);

    const handleSellClick = async (e) => {
        if (e) e.preventDefault();
        try {
            await axios.post("http://localhost:3002/newOrder", {
                name:  uid,
                qty:   Number(stockQuantity),
                price: Number(stockPrice),
                mode:  "SELL",
            });
            closeSellWindow(true, stockQuantity, stockPrice);
        } catch (err) {
            console.error("Sell order error:", err);
            closeSellWindow(false);
        }
    };

    const marginRequired = (Number(stockQuantity) * Number(stockPrice) * 0.2).toFixed(2);

    return (
        <div className="container" id="sell-window" draggable="true">
            {/* Header */}
            <div className="window-header sell-header">
                <div>
                    <h3>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M12 19V5M5 12l7 7 7-7"/>
                        </svg>
                        Sell {uid}
                    </h3>
                    <div className="subtitle">NSE · Regular · CNC</div>
                </div>
                <button className="close-btn" onClick={closeSellWindow} type="button">✕</button>
            </div>

            {/* Tabs */}
            <div className="tab">
                {["Market", "Limit", "SL", "SL-M"].map(t => (
                    <button
                        key={t}
                        className={activeTab === t ? "active" : ""}
                        onClick={() => setActiveTab(t)}
                        type="button"
                        style={activeTab === t ? { color: "#ef4444", borderBottomColor: "#ef4444" } : {}}
                    >{t}</button>
                ))}
            </div>

            {/* Inputs */}
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty-sell"
                            min="1"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price (₹)</legend>
                        <input
                            type="number"
                            name="price"
                            id="price-sell"
                            step="0.05"
                            onChange={(e) => setStockPrice(e.target.value)}
                            value={stockPrice}
                        />
                    </fieldset>
                </div>
            </div>

            {/* Footer */}
            <div className="buttons">
                <span>Margin req: ₹{isNaN(marginRequired) ? "0.00" : marginRequired}</span>
                <div>
                    <button type="button" className="btn btn-red" onClick={handleSellClick}>
                        Sell
                    </button>
                    <button type="button" className="btn btn-grey" onClick={closeSellWindow}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellActionWindow;
