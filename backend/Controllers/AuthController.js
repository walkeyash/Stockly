const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists", success: false });
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            path: "/",
            httpOnly: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.cookie("username", user.username, {
            path: "/",
            httpOnly: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User signed up successfully",
            success: true,
            user: { username: user.username, email: user.email },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required', success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or email', success: false });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: 'Incorrect password or email', success: false });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            path: "/",
            httpOnly: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.cookie("username", user.username, {
            path: "/",
            httpOnly: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User logged in successfully",
            success: true,
            user: { username: user.username, email: user.email },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token || token === "" || token === "undefined" || token === "null") {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) return res.json({ status: true, user: user.username, email: user.email });
            else return res.json({ status: false });
        }
    });
};

module.exports.Logout = (req, res) => {
    const cookieOptions = [
        { path: "/" },
        { path: "/", domain: "localhost" },
        { path: "/", domain: ".localhost" },
        { path: "/", domain: "127.0.0.1" },
    ];

    cookieOptions.forEach((opts) => {
        res.cookie("token", "", { ...opts, expires: new Date(0), httpOnly: false });
        res.cookie("username", "", { ...opts, expires: new Date(0), httpOnly: false });
        res.clearCookie("token", opts);
        res.clearCookie("username", opts);
    });

    return res.status(200).json({ status: true, message: "Logged out successfully" });
};