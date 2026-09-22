import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './auth.css';

function Login() {
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const [message, setMessage]       = useState("");
    const [isSuccess, setIsSuccess]   = useState(false);
    const [loading, setLoading]       = useState(false);
    const [showPass, setShowPass]     = useState(false);

    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:3002/login",
                { ...inputValue },
                { withCredentials: true }
            );
            const { success, message: msg, user, token } = data;
            if (success) {
                setMessage("Logged in successfully! Redirecting...");
                setIsSuccess(true);
                const uname = user ? user.username : "Trader";
                localStorage.setItem("username", uname);
                document.cookie = `username=${encodeURIComponent(uname)}; path=/; max-age=259200`;
                if (token) document.cookie = `token=${token}; path=/; max-age=259200`;
                setTimeout(() => {
                    window.location.href = `http://localhost:3001?user=${encodeURIComponent(uname)}`;
                }, 800);
            } else {
                setMessage(msg || "Invalid credentials. Please try again.");
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
        <div className="auth-fullpage">
            {/* Background decoration */}
            <div className="auth-bg-deco">
                <div className="deco-circle deco-1"></div>
                <div className="deco-circle deco-2"></div>
                <div className="deco-circle deco-3"></div>
            </div>

            {/* Center card */}
            <div className="auth-center-wrap">
                {/* Brand mark */}
                <div className="auth-brand-mark">
                    <div className="brand-mark-icon">S</div>
                    <span className="brand-mark-name">Stockly</span>
                </div>

                <div className="auth-center-card">
                    <div className="auth-center-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to your trading account</p>
                    </div>

                    {message && (
                        <div className={`auth-alert ${isSuccess ? 'auth-alert-success' : 'auth-alert-error'}`}>
                            <span>{isSuccess ? '✓' : '⚠'}</span>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="login-email">Email address</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="you@example.com"
                                    onChange={handleOnChange}
                                    required
                                    className="auth-input"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <input
                                    id="login-password"
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={handleOnChange}
                                    required
                                    className="auth-input"
                                    autoComplete="current-password"
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? <span className="btn-spinner"></span> : <>Sign In →</>}
                        </button>
                    </form>

                    <div className="auth-footer-text">
                        Don't have an account? <Link to="/signup" className="auth-link">Create one free</Link>
                    </div>
                </div>

                {/* Trust badges */}
                <div className="auth-trust-row">
                    <span>🔒 256-bit SSL</span>
                    <span>·</span>
                    <span>⚡ Instant Access</span>
                    <span>·</span>
                    <span>📊 Live Markets</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
