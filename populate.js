require('dotenv').config()
const connectDB = require("./dist/models/db/connect.js").default
const products = require("./dist/models/schemas/product.js").default
const jsonProducts = require('./products.json')

const url = process.env.DATABASE_URL

const start = async() =>{
    try {
        if(url){
            await connectDB(url)
            await products.deleteMany({})
            await products.insertMany(jsonProducts)
            console.log('success')
        }
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
