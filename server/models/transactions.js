import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    groupID: {
        type: String,
        required: true
    },
    expID: {
        type: String,
        required: true
    },
    party1: {
        type: String,
        required: true
    },
    party2: {
        type: [String], // Array of numbers
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema, "transactions");

export default Transaction;
