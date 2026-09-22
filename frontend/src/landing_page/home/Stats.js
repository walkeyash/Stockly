import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const FEATURES = [
    {
        icon: "⚡",
        title: "Customer-first always",
        desc: "That's why 1.6+ crore customers trust Stockly with ₹6 lakh crores of equity investments, making us India's largest broker — contributing 15% of daily retail exchange volumes.",
    },
    {
        icon: "🚫",
        title: "No spam or gimmicks",
        desc: "No gimmicks, spam, \"gamification\", or annoying push notifications. High-quality apps that you use at your own pace. Our philosophy, always.",
    },
    {
        icon: "🌐",
        title: "The Stockly universe",
        desc: "Not just an app — a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.",
    },
    {
        icon: "💡",
        title: "Do better with money",
        desc: "With Nudge and Kill Switch, we don't just facilitate transactions — we actively help you make smarter, safer financial decisions.",
    },
];

function Stats() {
    return (
        <section className="lp-section">
            <div className="lp-inner lp-two-col">
                {/* Left */}
                <div className="lp-col">
                    <p className="lp-eyebrow">Why Stockly</p>
                    <h2 className="lp-heading">Trust with confidence</h2>
                    <div className="lp-features">
                        {FEATURES.map((f) => (
                            <div className="lp-feature" key={f.title}>
                                <div className="lp-feature-icon">{f.icon}</div>
                                <div>
                                    <h4>{f.title}</h4>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="lp-col lp-col-center">
                    <img src="media/images/ecosystem.png" alt="Stockly Ecosystem" className="lp-img" />
                    <div className="lp-link-row">
                        <Link to="/product" className="lp-text-link">Explore products →</Link>
                        <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="lp-text-link">Try demo →</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Stats;