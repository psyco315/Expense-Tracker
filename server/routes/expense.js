import express from 'express'
import { GroupExpense, SoloExpense } from '../models/expense.js'
const router = express.Router()

import { getFullData, addExpense, createGroup, leaveGroup } from '../controllers/expense.js'

router.route('/groupData').get((req, res) => getFullData(req, res, GroupExpense))
router.route('/groupData/editExpense/:groupID').put((req, res) => addExpense(req, res, GroupExpense))
router.route('/groupData/postGroup').post((req, res) => createGroup(req, res, GroupExpense))
router.route('/groupData/leaveExpense').put((req, res) => leaveGroup(req, res, GroupExpense))
router.route('/soloData').get((req, res) => getFullData(req, res, SoloExpense))

export default router