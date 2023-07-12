const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {

    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"mandar.technocommet@gmail.com",
            pass:"vddiewtxdwtxyzup"
        }
      })

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)
}