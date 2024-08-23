import { Router } from "express";
import { User } from "../db/models/user.model.js";
import {z} from 'zod'
import { signinBody, signupBody } from "../zodvalidations/index.js";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { Account } from "../db/models/account.schema.js";

import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router()


router.route("/signup").post( async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const {username, fullname, password} = req.body

    const existingUser = await User.findOne({username: username})
    if(existingUser){
        return res.status(411).json({
            message: "User Already Exists"
        })
    }

    const user = await User.create({
        username: username,
        password: password,
        fullname: fullname
    })
    const userId = user._id
    const token = jwt.sign({userId}, JWT_SECRET)
    
    // Add Intial Balance To Acccount Of This User
    const account = await Account.create({
        userid: userId,
        balance: 1000 + Math.floor(Math.random()*10000)
    })

    res.status(201).json({
        Response: "User SignUp Success",
        token: token,
        user,
    })
} )


router.route("/signin").post( async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const {username, password} = req.body

    const user = await User.findOne({username: username, password: password})
    if(!user){
        return res.status(411).json({
            message: "Invalid Login Ceredentials"
        })
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET)

    res.status(201).json({
        Response: "User Login Success",
        token: token,
        user,
    })
} )

// '/' update info route

router.route("/bulk").get(authMiddleware, async (req, res) => {
    const filter  = req.query.filter || ""

    const users = await User.find({
            $or: [
                    {
                        fullname: {
                            "$regex": filter
                        }
                    }
                ]
    })

    
    res.status(201).json({
        user: users.map( (user) => ({
            username: user.username,
            fullname: user.fullname,
            _id: user._id
        }) )
    })
} )


export default router