import mongoose from "mongoose"

const schemaName = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product name required']
    },
    price:{
        type: Number,
        required: [true, 'Product price required']
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 4
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum: { // Makes sure that data is from one of these
            values: ['ikea', 'caressa', 'liddy', 'marcos'],
            message: '{VALUE} not supported' // Shown when a different value is provided
        }  
    }
})

export default mongoose.model('Test', schemaName)