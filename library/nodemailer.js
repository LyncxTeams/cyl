const nodemailer = require("nodemailer");
const { passEmailApp, myEmail } = require("./settings");

async function sendEmail(dataEmail, req, res, path1, path2) {
    try {        
        if (!dataEmail.from) dataEmail.from = myEmail;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: myEmail,
                pass: passEmailApp
            }
        });

        let info = await transporter.sendMail(dataEmail);
        console.log("Email sent: " + info.response);
        req.flash('success_msg', `Success Send Email to: ${dataEmail.to}, Check Your Mail Box/Spam Box.`);
        return res.redirect(path2);

    } catch (err) {
        console.log(err);
        req.flash('error_msg', 'Something went wrong while sending email');
        return res.redirect(path1);
    }
}

module.exports = { sendEmail };
