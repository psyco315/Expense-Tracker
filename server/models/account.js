import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [22, 'Name cannot be longer than 22 characters'] // Adding the 22 char limit
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

const Account = mongoose.model('Account', accountSchema, "accounts");

export default Account;
