import express from 'express'

const app = express()

import cors from 'cors'
app.use(cors())

// Body-Parser
app.use(express.json())


// Cookie-Parser
import cookieParser from 'cookie-parser'
app.use(cookieParser())



import rootRouter from './routes/index.js'

app.use("/api/v1", rootRouter)




export { app }