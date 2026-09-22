import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL, DASHBOARD_URL } from '../../config';
import './auth.css';

function Signup() {
    const [inputValue, setInputValue] = useState({ email: "", password: "", username: "" });
    const [message, setMessage]       = useState("");
    const [isSuccess, setIsSuccess]   = useState(false);
    const [loading, setLoading]       = useState(false);
    const [showPass, setShowPass]     = useState(false);

    const { email, password, username } = inputValue;

    const handleOnChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/signup`,
                { ...inputValue },
                { withCredentials: true }
            );
            const { success, message: msg, user, token } = data;
            if (success && user) {
                setMessage("Account created! Redirecting to dashboard...");
                setIsSuccess(true);
                localStorage.setItem("username", user.username);
                document.cookie = `username=${encodeURIComponent(user.username)}; path=/; max-age=259200`;
                if (token) document.cookie = `token=${token}; path=/; max-age=259200`;
                setTimeout(() => {
                    window.location.href = `${DASHBOARD_URL}?user=${encodeURIComponent(user.username)}`;
                }, 800);
            } else {
                setMessage(msg || "Signup failed. Please try again.");
                setIsSuccess(false);
                setLoading(false);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            setIsSuccess(false);
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left branding panel */}
            <div className="auth-brand">
                <div className="auth-brand-content">
                    <div className="brand-logo">S</div>
                    <h1>Start trading with Stockly</h1>
                    <p>Join millions of traders who trust Stockly for smarter investing. Zero brokerage on equity delivery.</p>
                    <div className="brand-features">
                        <div className="brand-feature">
                            <span className="feature-check">✓</span>
                            <span>Zero brokerage on equity delivery</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-check">✓</span>
                            <span>Real-time market data & charts</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-check">✓</span>
                            <span>Portfolio analytics & P&L tracking</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-check">✓</span>
                            <span>Instant account activation</span>
                        </div>
                    </div>
                </div>
                <div className="auth-brand-deco"></div>
            </div>

            {/* Right form panel */}
            <div className="auth-form-panel">
                <div className="auth-card">
                <div className="auth-card-header">
                        <h2>Create account</h2>
                        <p>Start your trading journey in minutes</p>
                    </div>

                    {message && (
                        <div className={`auth-alert ${isSuccess ? 'auth-alert-success' : 'auth-alert-error'}`}>
                            <span>{isSuccess ? '✓' : '⚠'}</span>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="signup-username">Username</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <input
                                    id="signup-username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="Choose a username"
                                    onChange={handleOnChange}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-email">Email address</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <input
                                    id="signup-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="you@example.com"
                                    onChange={handleOnChange}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <input
                                    id="signup-password"
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    placeholder="Min. 8 characters"
                                    onChange={handleOnChange}
                                    required
                                    className="auth-input"
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? (
                                <span className="btn-spinner"></span>
                            ) : (
                                <>Create Account →</>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer-text">
                        Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;