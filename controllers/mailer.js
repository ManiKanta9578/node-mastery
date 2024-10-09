import nodemailer from 'nodemailer'
import Mailgen from 'mailgen';
import dotenv from "dotenv";
dotenv.config();

let config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
}

const transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
        name: "TaskFlow",
        link: 'http://localhost:3000'
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    //body of the email

    let email = {
        body: {
            name: username,
            intro: text || "This is intro",
            // table: {
            //     data: [
            //         {
            //             item: "Nodemailer Stack Book",
            //             description: 'A Backend Application',
            //             price: 'Rs. 1999/-',
            //         }
            //     ]
            // },
            outro: "Don't share your OTP!"
        }
    }

    let emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup successfully!",
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch((error) => {
            return res.status(500).send({ error });
        })
}