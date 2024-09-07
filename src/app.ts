import express from "express";
require('express-async-errors')
import { Request, Response } from "express";
import errorHandler from "./middleware/error-handler";
import connectDB from './models/db/connect'
import mainRouter from './routes/main-router'
require('dotenv').config()

declare global {
    namespace Express{
        interface Request{
            user?: string | any
        }
    }
}

const notFound = (_req: Request, _res: Response) => 
    _res.status(404).send({errors: [{ message:'Route does not exist' }]})

const start = async () =>{
    try {
        const app = express()
        app.use(express.json())
        app.use(mainRouter)
        app.use(notFound)
        app.use(errorHandler)
        const PORT = process.env.PORT || 3500
        const url = process.env.DATABASE_URL as string
        await connectDB(url)
        app.listen(PORT, () =>{
            console.log(`server listing on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()

// app.get('/', (req:Request, res: Response) =>{
//     res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
// })


