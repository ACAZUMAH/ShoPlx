"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});
const sendConfirmationEmail = (email, email_token) => {
    const url = `http://localhost:3500/api/v1/shopX/confirm-email/${email_token}`;
    transporter.sendMail({
        to: email,
        subject: 'Confirm your email',
        html: `Please click <a href="${url}">here</a> to confirm your email`
    });
};
exports.default = sendConfirmationEmail;
