import { Router } from "express";
import { authMiddleware } from '../middleware/auth.middleware.js'
import { Account } from "../db/models/account.schema.js";
import { User } from "../db/models/user.model.js";
import mongoose from "mongoose";

const router = Router()

router.route("/balance").get(authMiddleware, async (req, res) => {

    const userId = req.userId
    const user = await Account.findOne({userid: userId})
    if(!user){
        return res.status(411).json({
            message: "User Not Found",
        })
    }

    res.status(201).json({
        Balance: user.balance
    })
})

// Route For Transfering Money
router.route("/transfer").post(authMiddleware, async (req, res) => {

    // Transaction In DB
    const session = await mongoose.startSession();
    session.startTransaction();

    const {to, amount} = req.body // to - userid

    const fromAccount = await Account.findOne({userid: req.userId}).session(session)
    if(!fromAccount || fromAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userid: to}).session(session)
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Beneficiary Account"
        })
    }

    // Money Transfer Txn
    await Account.updateOne({userid: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userid: to}, {$inc: {balance: +amount}}).session(session)

    // Commiting The Transaction
    await session.commitTransaction()
    
    res.status(201).json({
        message: "Money Transfered Succesfully"
    })
})

export default router