const nodemailer = require('nodemailer')

async function sendEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "assetmanagementkpp@gmail.com",
            pass: "wfqh fahc stpz uwjh"
        }
    })
    const sendMail = transporter.sendMail({
        from: "noreply",
        to: `${email}`,
        subject: "REMINDER YOUR ASSET IS OVERDUE",
        text: 'REMINDER YOUR ASSET IS OVERDUE, PLEASE UPDATE YOUR ASSET REALISASI STATUS'
    })
    console.log("email berhasil dikirim")
}


module.exports = {
    sendEmail
}