import connectDB from './db/connect.js'
import expenseRouter from './routes/expense.js'
import transactionRouter from './routes/transaction.js'
import accountRouter from './routes/account.js'
import dotenv from 'dotenv'
import 'express-async-errors'
dotenv.config()

import errorMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())

app.put('/api/test', (req, res) => {
    // Log the body of the request
    console.log("test working")
    console.log(req.body)

    res.status(200).json({
        message: 'Data received and updated',
        receivedData: req.body
    });
})

// Routes
app.use('/api/account', accountRouter)
app.use('/api/expense', expenseRouter)
app.use('/api/transaction', transactionRouter)


app.use(errorMiddleware)
app.use(notFoundMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Listening to port: ${port}`) })
    } catch (error) {
        console.log(error)
    }
}
start()