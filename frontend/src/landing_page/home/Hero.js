import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <img
                    src="media/images/landingggg.svg"
                    alt="Invest in everything"
                    className="hero-image"
                />
                <h1 className="hero-title">Invest in everything</h1>
                <p className="hero-subtitle">
                    Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
                </p>
                <Link to="/signup" className="hero-cta">
                    Sign up for free
                </Link>
            </div>
        </div>
    );
}

export default Hero;