const nodemailer = require("nodemailer");





module.exports = async (userEmail , subject , template) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.APP_EMAIL_ADDRESS,
                pass: process.env.APP_EMAIL_PASSWORD
            }
        });

        mailOptions = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: userEmail,
            subject: subject,
            html: template
        }

        const info = await transporter.sendMail(mailOptions);
        console.log(info.response);

    }
    catch (err){
        console.log(err);
        throw new Error("Internal server error (nodemailer)")
    }
}  