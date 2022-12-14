const nodeMailer = require('nodemailer');

exports.sendEmail = (emailAddress, emailText) => { 
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: emailAddress,
        subject: "Verification Code",
        text: emailText
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Email sent >>");
            console.log(info.response);
            console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
        }
    })
}