import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the expense schema
const expenseSchema = new Schema({
    expID: {
        type: String,  // Make sure this is the correct type (String in your case)
        required: true,
    },
    expName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    paidBy: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    sharedBy: {
        type: [String], // Array of numbers (user IDs who share the expense)
        required: true,
    },
});

// Define the groupExpense schema
const groupExpenseSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['groupExpense'], // Restrict to groupExpense type
        },
        createDate: {
            type: String,
            required: true,
        },
        createBy: {
            type: String,
            required: true,
        },
        members: {
            type: [String],
            required: true,
        },
        expenses: [expenseSchema],
    }
);

// Create the model
const GroupExpense = mongoose.model('GroupExpense', groupExpenseSchema, 'groupExpense');
const SoloExpense = mongoose.model('GroupExpense', groupExpenseSchema, 'soloExpense');

export { GroupExpense, SoloExpense };
