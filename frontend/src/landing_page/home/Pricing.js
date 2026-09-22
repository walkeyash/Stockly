import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const PLANS = [
    {
        price: "₹0",
        label: "Equity Delivery",
        desc: "Free equity delivery and direct mutual funds. No hidden charges.",
        highlight: true,
        tag: "Most Popular",
    },
    {
        price: "₹20",
        label: "Intraday & F&O",
        desc: "Flat ₹20 per order for intraday and futures & options trades.",
        highlight: false,
        tag: "Flat fee",
    },
];

function Pricing() {
    return (
        <section className="lp-section">
            <div className="lp-inner lp-two-col" style={{ alignItems: "flex-start" }}>
                {/* Left */}
                <div className="lp-col" style={{ maxWidth: "360px" }}>
                    <p className="lp-eyebrow">Transparent Pricing</p>
                    <h2 className="lp-heading">Unbeatable pricing</h2>
                    <p className="lp-subtext">
                        We pioneered discount broking and price transparency in India.
                        Flat fees, no hidden charges, no nonsense.
                    </p>
                    <Link to="/pricing" className="lp-text-link" style={{ marginTop: "8px" }}>
                        See full pricing →
                    </Link>
                </div>

                {/* Right: Pricing cards */}
                <div className="lp-col" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {PLANS.map(plan => (
                        <div
                            key={plan.label}
                            className={`lp-price-card ${plan.highlight ? "lp-price-card--highlight" : ""}`}
                        >
                            {plan.tag && (
                                <div className="lp-price-tag">{plan.tag}</div>
                            )}
                            <div className="lp-price-value">{plan.price}</div>
                            <div className="lp-price-label">{plan.label}</div>
                            <p className="lp-price-desc">{plan.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;