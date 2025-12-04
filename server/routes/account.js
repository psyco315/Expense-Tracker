import express from 'express'
import Account from '../models/account.js'
const router = express.Router()

import { getAccounts } from '../controllers/account.js'

router.route('/').get((req, res) => getAccounts(req, res, Account))

export default router