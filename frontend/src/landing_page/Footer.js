import React from 'react';
import { Link } from 'react-router-dom';
import './home/landing.css';

const FOOTER_LINKS = {
    Company: [
        { label: "About", to: "/about" },
        { label: "Products", to: "/product" },
        { label: "Pricing", to: "/pricing" },
        { label: "Referral Programme", to: "/" },
        { label: "Careers", to: "/" },
        { label: "Press & Media", to: "/" },
    ],
    Support: [
        { label: "Contact", to: "/support" },
        { label: "Support Portal", to: "/support" },
        { label: "List of Charges", to: "/pricing" },
        { label: "Downloads & Resources", to: "/" },
    ],
    Accounts: [
        { label: "Open an Account", to: "/signup" },
        { label: "Fund Transfer", to: "/" },
        { label: "60-Day Challenge", to: "/" },
    ],
};

function Footer() {
    return (
        <footer className="lp-footer">
            <div className="lp-footer-grid">
                {/* Brand */}
                <div className="lp-footer-brand">
                    <img
                        src="media/images/logo.png"
                        alt="Stockly"
                        style={{ width: "120px", display: "block", marginBottom: "14px" }}
                    />
                    <p>© 2026, Stockly Broking Ltd.<br />All rights reserved.</p>
                </div>

                {/* Link columns */}
                {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                    <div className="lp-footer-col" key={heading}>
                        <h5>{heading}</h5>
                        {links.map(link => (
                            <Link to={link.to} key={link.label}>{link.label}</Link>
                        ))}
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="lp-footer-bottom">
                <p>Stockly is a stock market analytics and portfolio tracking platform built for educational and informational purposes.</p>
                <p>Stockly is not a SEBI-registered stock broker, investment adviser, research analyst, or depository participant. Stockly does not execute trades, provide personalized investment advice, or hold securities on behalf of users.</p>
                <p>Investments in securities market are subject to market risks. Read all related documents carefully before investing. Market data displayed may be delayed or inaccurate. Stockly is not affiliated with Zerodha, NSE, BSE, SEBI, CDSL, or NSDL.</p>
            </div>
        </footer>
    );
}

export default Footer;