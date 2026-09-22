const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");
const authRoute = require("./Routes/AuthRoute");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith(".vercel.app") ||
            origin.endsWith(".onrender.com") ||
            origin.includes("localhost")
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

// Helper to get or initialize funds
async function getFunds() {
    let fund = await FundsModel.findOne({ userId: "default" });
    if (!fund) {
        fund = await FundsModel.create({ userId: "default", balance: 50000 });
    }
    return fund;
}

app.get('/allHoldings', async (req, res) => {
    try {
        let allHoldings = await HoldingsModel.find({});
        res.json(allHoldings);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch holdings" });
    }
});

app.get('/allPositions', async (req, res) => {
    try {
        let allPositions = await PositionsModel.find({});
        res.json(allPositions);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch positions" });
    }
});

app.get('/allOrders', async (req, res) => {
    try {
        let allOrders = await OrdersModel.find({}).sort({ createdAt: -1 });
        res.json(allOrders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

app.get('/funds', async (req, res) => {
    try {
        let fund = await getFunds();
        res.json(fund);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch funds" });
    }
});

app.post('/addFunds', async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        let fund = await getFunds();
        fund.balance += amount;
        await fund.save();
        res.json({ success: true, balance: fund.balance });
    } catch (err) {
        res.status(500).json({ error: "Failed to add funds" });
    }
});

app.post('/withdrawFunds', async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        let fund = await getFunds();
        if (fund.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }
        fund.balance -= amount;
        await fund.save();
        res.json({ success: true, balance: fund.balance });
    } catch (err) {
        res.status(500).json({ error: "Failed to withdraw funds" });
    }
});

app.post('/newOrder', async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;
        const numQty = Number(qty);
        const numPrice = Number(price);
        const totalCost = numQty * numPrice;

        let fund = await getFunds();

        // Save order
        let newOrder = new OrdersModel({
            name,
            qty: numQty,
            price: numPrice,
            mode,
            status: "COMPLETE",
            createdAt: new Date(),
        });
        await newOrder.save();

        if (mode === "BUY") {
            // Deduct funds
            fund.balance = Math.max(0, fund.balance - totalCost);
            await fund.save();

            // Update or create holding
            let existing = await HoldingsModel.findOne({ name });
            if (existing) {
                const combinedQty = existing.qty + numQty;
                const combinedCost = (existing.qty * existing.avg) + totalCost;
                existing.qty = combinedQty;
                existing.avg = Number((combinedCost / combinedQty).toFixed(2));
                existing.price = numPrice;
                await existing.save();
            } else {
                await HoldingsModel.create({
                    name,
                    qty: numQty,
                    avg: numPrice,
                    price: numPrice,
                    net: "+0.00%",
                    day: "+0.00%",
                });
            }
        } else if (mode === "SELL") {
            // Credit funds
            fund.balance += totalCost;
            await fund.save();

            // Reduce or remove holding
            let existing = await HoldingsModel.findOne({ name });
            if (existing) {
                if (existing.qty <= numQty) {
                    await HoldingsModel.deleteOne({ _id: existing._id });
                } else {
                    existing.qty -= numQty;
                    existing.price = numPrice;
                    await existing.save();
                }
            }
        }

        res.json({ message: "Order Saved!", order: newOrder, currentBalance: fund.balance });
    } catch (err) {
        console.error("Order error:", err);
        res.status(500).json({ error: "Failed to process order" });
    }
});

app.listen(PORT, () => {
    console.log("App started");
    mongoose.connect(uri);
    console.log("DB Connected");

})