const { Schema } = require("mongoose");

const FundsSchema = new Schema({
    userId: {
        type: String,
        default: "default",
    },
    balance: {
        type: Number,
        default: 50000,
    },
});

module.exports = { FundsSchema };
