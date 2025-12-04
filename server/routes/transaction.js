import express from 'express'
import Transaction from '../models/transactions.js'
const router = express.Router()

import { getTransactions, postTransactions } from '../controllers/transaction.js'

router.route('/').get((req, res) => getTransactions(req, res, Transaction))
router.route('/').post((req, res) => postTransactions(req, res, Transaction))

export default router