import config from '../config/index.js'
import nodemailer from "nodemailer"


async function sendEmail(filePath, csvString) {
    const transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        auth: {
            user: config.email.emailUser,
            pass: config.email.emailPass,
        }
    });


    const attachments = []
    if (filePath) {
        // If serverStorage=true attach file from path
        attachments.push({
            filename: "export.csv",
            path: filePath
        })
    }
    else {
        // If serverStorage=false attach CSV directly
        attachments.push({
            filename: "export.csv",
            content: csvString,
            contentType: "text/csv",
        })
    }


    const mailOptions = {
        from: "Automated Reports <no-reply@example.com>",
        to: config.email.emailTo,
        cc: config.email.emailCC,
        subject: "Daily MongoDB CSV Report",
        text: "Please find the attached report.",
        attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Eamil sent:", info.response);

}


export default sendEmail