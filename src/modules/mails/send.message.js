import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { html } from './fileHtml.js';
export const sendToEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "anamohamedahmed893@gmail.com",
            pass: "dydm xnrg fvnn dbnr",
        },
    });
    let token = jwt.sign({ email: options.email }, 'email123456')
    const info = await transporter.sendMail({
        from: '"Hello 👻" <anamohamedahmed893@gmail.com>', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: html(token), // html body
    });
}