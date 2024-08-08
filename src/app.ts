import express from "express";
import { Request, Response } from "express";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error-handler";
import connectDB from './models/db/connect'
import mainRouter from './routes/main-router'
import 'express-async-errors'
require('dotenv').config()

declare global {
    namespace Express{
        interface Request{
            user?: string | any
        }
    }
}
const app = express()
app.use(express.json())

app.get('/', (req:Request, res: Response) =>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})
app.use(mainRouter)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3500
const url = process.env.DATABASE_URL as string

const start = async () =>{
    try {
        await connectDB(url)
        app.listen(PORT, () =>{
            console.log(`server listing on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()



