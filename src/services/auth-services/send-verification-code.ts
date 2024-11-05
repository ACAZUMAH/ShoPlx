import nodemailer from 'nodemailer'
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS
    }
})


const sendVerificationOTP = async (email: string, otp: string) =>{
    transporter.sendMail(
        {
            to: email,
            subject: 'Verification code',
            html: `Please your verification code is: ${otp}`
        }
    )
};

// const sendConfirmationEmail = (email: string,email_token: string) =>{
//     const url = `http://localhost:3500/api/auth/email/${email_token}`
//     transporter.sendMail({
//         to: email,
//         subject: 'Confirm your email',
//         html: `Please click <a href="${url}">here</a> to confirm your email`
//     })
// }

export default sendVerificationOTP

