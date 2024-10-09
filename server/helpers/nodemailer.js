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
        subject: "testing ya",
        text: 'REMINDER YOUR ASSET IS OVERDUE'
    })
    console.log("email berhasil dikirim")
}


module.exports = {
    sendEmail
}