"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const connect_1 = __importDefault(require("./models/db/connect"));
const main_router_1 = __importDefault(require("./routes/main-router"));
require("express-async-errors");
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});
app.use(main_router_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
const PORT = process.env.PORT || 3500;
const url = process.env.DATABASE_URL;
const start = async () => {
    try {
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
