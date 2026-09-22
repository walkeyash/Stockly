import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, DASHBOARD_URL } from '../config';
import './navbar.css';

function Navbar() {
    const [user, setUser]             = useState("");
    const [scrolled, setScrolled]     = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    // Hide navbar on auth pages
    const hideNavbar = ['/login', '/signup'].includes(location.pathname);

    useEffect(() => {
        if (hideNavbar) return;
        axios.post(`${API_BASE_URL}/verify`, {}, { withCredentials: true })
            .then((res) => {
                if (res.data.status && res.data.user) setUser(res.data.user);
                else setUser("");
            })
            .catch(() => setUser(""));
    }, [hideNavbar]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = async () => {
        const clearAllCookies = () => {
            const pastDate = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            document.cookie = `username=; ${pastDate}`;
            document.cookie = `token=; ${pastDate}`;
            document.cookie = `username=; domain=localhost; ${pastDate}`;
            document.cookie = `token=; domain=localhost; ${pastDate}`;
            localStorage.clear();
            sessionStorage.clear();
        };
        clearAllCookies();
        try { await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true }); }
        catch (err) { /* ignore */ }
        clearAllCookies();
        setUser("");
        window.location.href = "/";
    };

    if (hideNavbar) return null;

    const NAV_LINKS = [
        { to: "/about",   label: "About"    },
        { to: "/product", label: "Products" },
        { to: "/pricing", label: "Pricing"  },
        { to: "/support", label: "Support"  },
    ];

    return (
        <nav className={`site-navbar ${scrolled ? "site-navbar--scrolled" : ""}`}>
            <div className="nav-inner">
                {/* Logo */}
                <Link to="/" className="nav-brand">
                    <img
                        src="media/images/logo.png"
                        alt="Stockly"
                        style={{ width: "100px", height: "auto", display: "block", cursor: "pointer" }}
                    />
                </Link>

                {/* Desktop Nav */}
                <ul className="nav-links">
                    {!user ? (
                        <>
                            <li><Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">Signup</Link></li>
                            <li><Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link></li>
                        </>
                    ) : (
                        <li className="nav-user-chip">
                            <span className="user-dot"></span>
                            Hi, {user}
                        </li>
                    )}
                    {NAV_LINKS.map(({ to, label }) => (
                        <li key={to}>
                            <Link className={`nav-link ${location.pathname === to ? 'active' : ''}`} to={to}>{label}</Link>
                        </li>
                    ))}
                    {user && (
                        <li>
                            <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    <li>
                        <a
                            className="nav-dashboard-btn"
                            href={DASHBOARD_URL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Dashboard →
                        </a>
                    </li>
                </ul>

                {/* Mobile toggle */}
                <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="nav-mobile-menu">
                    {NAV_LINKS.map(({ to, label }) => (
                        <Link key={to} to={to} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>{label}</Link>
                    ))}
                    {!user ? (
                        <>
                            <Link to="/signup" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Signup</Link>
                            <Link to="/login"  className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Login</Link>
                        </>
                    ) : (
                        <button className="mobile-nav-link" style={{ border: "none", background: "none", textAlign: "left", cursor: "pointer" }} onClick={handleLogout}>Logout</button>
                    )}
                    <a href={DASHBOARD_URL} className="mobile-nav-link nav-dashboard-btn" style={{ marginTop: "8px" }}>Dashboard →</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;