import React from 'react';
import { Link } from 'react-router-dom';
import './home/landing.css';

function OpenAccount() {
    return (
        <section className="lp-open-account">
            <div className="lp-inner" style={{ textAlign: "center", maxWidth: "620px" }}>
                <div className="lp-open-badge">Join 1.5 Crore+ Investors</div>
                <h2 className="lp-heading" style={{ fontSize: "2rem", marginBottom: "14px" }}>
                    Open a Stockly account
                </h2>
                <p className="lp-subtext" style={{ marginBottom: "32px" }}>
                    Modern platforms and apps, ₹0 delivery investments, and flat ₹20 intraday and F&O trades.
                </p>
                <Link to="/signup" className="lp-cta-btn">
                    Sign up for free →
                </Link>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "16px" }}>
                    No account opening fees · Instant activation · SEBI registered
                </p>
            </div>
        </section>
    );
}

export default OpenAccount;