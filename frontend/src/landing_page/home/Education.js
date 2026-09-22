import React from 'react';
import './landing.css';

const RESOURCES = [
    {
        icon: "📖",
        name: "Varsity",
        href: "https://zerodha.com/varsity/",
        desc: "The largest free stock market education book — from basics to advanced trading strategies.",
        tag: "Free",
        color: "#f97316",
    },
    {
        icon: "💬",
        name: "TradingQ&A",
        href: "https://tradingqna.com/",
        desc: "India's most active trading & investment community — get answers to all your market queries.",
        tag: "Community",
        color: "#3b82f6",
    },
];

function Education() {
    return (
        <section className="lp-section lp-section--gray">
            <div className="lp-inner lp-two-col">
                {/* Left: Image */}
                <div className="lp-col lp-col-center">
                    <img
                        src="media/images/education.svg"
                        alt="Free market education"
                        className="lp-img"
                    />
                </div>

                {/* Right: Content */}
                <div className="lp-col">
                    <p className="lp-eyebrow">Learn & Grow</p>
                    <h2 className="lp-heading">Free and open market education</h2>
                    <p className="lp-subtext">
                        We believe informed investors make better decisions.
                        That's why we built the world's largest free stock market learning platform.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "24px" }}>
                        {RESOURCES.map(r => (
                            <a
                                key={r.name}
                                href={r.href}
                                target="_blank"
                                rel="noreferrer"
                                className="lp-edu-card"
                            >
                                <div className="lp-edu-icon" style={{ background: r.color + "15" }}>
                                    {r.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                        <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>{r.name}</span>
                                        <span style={{
                                            fontSize: "0.65rem", fontWeight: 700,
                                            padding: "2px 7px", borderRadius: "20px",
                                            background: r.color + "15", color: r.color,
                                        }}>{r.tag}</span>
                                    </div>
                                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
                                </div>
                                <span style={{ color: "#94a3b8", fontSize: "1.1rem" }}>→</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Education;