const { Resend } = require("resend");
console.log(process.env.RESEND_API_KEY)
const dotenv = require("dotenv");
dotenv.config();
const resendClient = new Resend(process.env.RESEND_API_KEY);
const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME
}
module.exports = { resendClient, sender };