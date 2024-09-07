"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const connect_1 = __importDefault(require("./models/db/connect"));
const main_router_1 = __importDefault(require("./routes/main-router"));
require('dotenv').config();
const notFound = (_req, _res) => _res.status(404).send({ errors: [{ message: 'Route does not exist' }] });
const start = async () => {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(main_router_1.default);
        app.use(notFound);
        app.use(error_handler_1.default);
        const PORT = process.env.PORT || 3500;
        const url = process.env.DATABASE_URL;
        await (0, connect_1.default)(url);
        app.listen(PORT, () => {
            console.log(`server listing on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
// app.get('/', (req:Request, res: Response) =>{
//     res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
// })
