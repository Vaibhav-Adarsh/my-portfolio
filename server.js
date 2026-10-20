const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.post('/api/contact', async(req, res) =>{
    const {name, email, subject, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.EMAIL_USER, // Aapka email (env file se aayega)
            pass: process.env.EMAIL_PASS  // Aapka Gmail App Password
        }
    });

    const mailOptions = {
        from: email, 
        to: 'vaibhavadarsh07@gmail.com',
        subject: `💼 Portfolio Contact: ${subject}`,
        html: `
            <h3>New Message from Portfolio</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true, message: 'Message successfully sent!'});
    } catch(error){
        console.error("Error in sending Email:", error);
        res.status(500).json({success: false, message: 'server error, Mail can not be sent'});
    }
});

app.listen(PORT, () => {
    console.log(`Backend is ready at port ${PORT}!`)
});

