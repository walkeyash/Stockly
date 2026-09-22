import React from "react";

const APPS = [
    {
        icon: "📊",
        name: "Kite",
        tag: "Trading",
        desc: "Our flagship trading platform — web and mobile — with advanced charts, options chains, and one-click ordering.",
        color: "#3b82f6",
        bg: "#eff6ff",
        badge: "Live",
        badgeColor: "#22c55e",
    },
    {
        icon: "📈",
        name: "Console",
        tag: "Portfolio",
        desc: "Portfolio reporting, P&L statements, tax filing, and holding analytics — all in one powerful backoffice.",
        color: "#6366f1",
        bg: "#f0f0ff",
        badge: "Live",
        badgeColor: "#22c55e",
    },
    {
        icon: "📚",
        name: "Varsity",
        tag: "Education",
        desc: "The largest free stock market education platform — from basics to advanced derivatives strategies.",
        color: "#f97316",
        bg: "#fff7ed",
        badge: "Free",
        badgeColor: "#f97316",
    },
    {
        icon: "🎯",
        name: "Coin",
        tag: "Mutual Funds",
        desc: "Invest in direct mutual funds at zero commission — SIP, lump sum, and portfolio rebalancing.",
        color: "#22c55e",
        bg: "#f0fdf4",
        badge: "Zero Fee",
        badgeColor: "#22c55e",
    },
    {
        icon: "🔔",
        name: "Nudge",
        tag: "Risk Guard",
        desc: "Smart alerts that warn you before potentially risky trades — because better decisions start with better awareness.",
        color: "#ef4444",
        bg: "#fef2f2",
        badge: "New",
        badgeColor: "#3b82f6",
    },
    {
        icon: "📰",
        name: "Markets",
        tag: "Research",
        desc: "Real-time market data, sector screeners, earnings calendar, and news curated for Indian markets.",
        color: "#0ea5e9",
        bg: "#f0f9ff",
        badge: "Beta",
        badgeColor: "#f97316",
    },
];

const Apps = () => {
    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <div style={{
                background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                borderRadius: "var(--radius-md)",
                padding: "28px 28px 24px",
                marginBottom: "24px",
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", top: "-40px", right: "-40px",
                    width: "200px", height: "200px", borderRadius: "50%",
                    background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.12)",
                }}></div>
                <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 800, margin: "0 0 6px" }}>
                    The Stockly Universe
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", margin: 0 }}>
                    A complete ecosystem of tools built for modern Indian investors
                </p>
            </div>

            {/* Apps grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
            }}>
                {APPS.map((app) => (
                    <div key={app.name} style={{
                        background: "#fff",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "20px",
                        boxShadow: "var(--shadow-sm)",
                        cursor: "pointer",
                        transition: "box-shadow 0.15s, transform 0.15s",
                        position: "relative",
                        overflow: "hidden",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "none"; }}
                    >
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                            <div style={{
                                width: "44px", height: "44px",
                                borderRadius: "10px",
                                background: app.bg,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "1.4rem",
                            }}>
                                {app.icon}
                            </div>
                            <span style={{
                                fontSize: "0.65rem", fontWeight: 700,
                                padding: "3px 8px", borderRadius: "20px",
                                background: app.badgeColor + "18",
                                color: app.badgeColor,
                                border: `1px solid ${app.badgeColor}30`,
                            }}>
                                {app.badge}
                            </span>
                        </div>
                        <div style={{
                            fontSize: "0.68rem", fontWeight: 600,
                            textTransform: "uppercase", letterSpacing: "0.5px",
                            color: app.color, marginBottom: "4px",
                        }}>
                            {app.tag}
                        </div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>
                            {app.name}
                        </h3>
                        <p style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                            {app.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <div style={{
                marginTop: "20px",
                padding: "14px 18px",
                background: "#f8fafc",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                display: "flex", alignItems: "center", gap: "8px",
            }}>
                <span>🔒</span>
                All Stockly products use end-to-end encryption and follow SEBI data security guidelines.
            </div>
        </div>
    );
};

export default Apps;