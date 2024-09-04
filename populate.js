require('dotenv').config()
const connectDB = require("./dist/models/db/connect.js").default
const products = require("./dist/models/schemas/product.js").default
const catalog = require("./dist/models/schemas/catalog.js").default
const category = require("./dist/models/schemas/category.js").default
const brand = require('./dist/models/schemas/brand.js').default
//const jsonProducts = require('./products.json')

// const url = process.env.DATABASE_URL

// const start = async(name) =>{
//     try {
//         if(url){
//             await connectDB(url)
//             //await products.deleteMany({})
//             //await products.insertMany(jsonProducts)
//             // await catalog.create({
//             //     name: name
//             // })
//             // await category.create({
//             //     name: name
//             // })
//             await brand.create({
//                 name
//             })
//             console.log('success')
//         }
//         process.exit(0)
//     } catch (error) {
//         console.log(error)
//         process.exit(1)
//     }
// }

// start()
