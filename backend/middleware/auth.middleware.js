import { JWT_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "Invalid Authorization Token Passed"
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({
            message: "Authentiation Failed"
        })
    }
}