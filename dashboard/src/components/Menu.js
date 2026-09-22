import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const NAV_ITEMS = [
    { path: "/",          label: "Dashboard" },
    { path: "/orders",    label: "Orders"    },
    { path: "/holdings",  label: "Holdings"  },
    { path: "/positions", label: "Positions" },
    { path: "/funds",     label: "Funds"     },
    { path: "/apps",      label: "Apps"      },
];

const Menu = () => {
    const { username, logout } = useContext(GeneralContext);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const location = useLocation();

    const displayName  = username && username !== "Trader" ? username : (localStorage.getItem("username") || "Trader");
    const userInitials = displayName.length > 0 ? displayName.slice(0, 2).toUpperCase() : "TR";

    const handleLogoutClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsProfileDropdownOpen(false);
        logout();
    };

    return (
        <div className="menu-container">
            <img src="/logo.png" alt="Stockly Logo" style={{ height: "32px", width: "auto" }} />

            <div className="menus">
                <ul>
                    {NAV_ITEMS.map(({ path, label }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={path}>
                                <Link style={{ textDecoration: "none" }} to={path}>
                                    <p className={isActive ? "menu selected" : "menu"}>{label}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <hr />

                {/* Profile */}
                <div
                    className="profile"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                    <div className="avatar">{userInitials}</div>
                    <p className="username">{displayName}</p>
                    <svg
                        width="12" height="12" fill="none" viewBox="0 0 24 24"
                        style={{ color: "var(--text-muted)", marginLeft: "2px", transition: "transform 0.2s", transform: isProfileDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}
                    >
                        <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
                    </svg>

                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                            <div className="user-info">
                                <p>{displayName}</p>
                                <span>Active Account</span>
                            </div>
                            <button className="logout-btn" onClick={handleLogoutClick}>
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;