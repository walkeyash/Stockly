import React from 'react';
import './landing.css';

const PRODUCTS = [
    "Futures & Options",
    "Commodity Derivatives",
    "Currency Derivatives",
    "Stocks & IPOs",
    "Direct Mutual Funds",
    "Bonds & Govt. Securities",
];

function Awards() {
    return (
        <section className="lp-section lp-section--gray">
            <div className="lp-inner lp-two-col">
                {/* Left: Image */}
                <div className="lp-col lp-col-center">
                    <img
                        src="media/images/largestBroker.svg"
                        alt="India's Largest Broker"
                        className="lp-img"
                    />
                </div>

                {/* Right: Content */}
                <div className="lp-col">
                    <p className="lp-eyebrow">Market Leader</p>
                    <h2 className="lp-heading">India's Largest Stock Broker</h2>
                    <p className="lp-subtext">
                        Stockly powers investing and trading for over 1.5 crore Indians —
                        stocks, mutual funds, F&amp;O, and more, all in one account.
                        Flat, transparent pricing and a platform built for speed.
                    </p>

                    <div className="lp-product-grid">
                        {PRODUCTS.map(p => (
                            <div className="lp-product-chip" key={p}>
                                <span className="lp-check">✓</span> {p}
                            </div>
                        ))}
                    </div>

                    <img
                        src="media/images/pressLogos.png"
                        alt="Featured in press"
                        style={{ width: "100%", maxWidth: "380px", marginTop: "28px", opacity: 0.75 }}
                    />
                </div>
            </div>
        </section>
    );
}

export default Awards;