const nodemailer = require('nodemailer')

async function sendEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "muhamadandinaufal@gmail.com",
            pass: "kmnz hmdw bxbr dweq"
        }
    })
    const sendMail = transporter.sendMail({
        from: "noreply",
        to: `${email}`,
        subject: "REMINDER YOUR ASSET IS OVERDUE",
        text: 'REMINDER YOUR ASSET IS OVERDUE, PLEASE UPDATE YOUR ASSET REALISASI STATUS'
    })
    // console.log("email berhasil dikirim")
}


module.exports = {
    sendEmail
}