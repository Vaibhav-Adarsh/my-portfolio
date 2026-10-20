
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Escape user input before inserting it into HTML emails
function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Create the email transporter once
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact API
router.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body || {};

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof subject !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !subject.trim() ||
        !message.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        name.length > 100 ||
        email.length > 254 ||
        subject.length > 150 ||
        message.length > 500
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid contact form details."
        });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Email environment variables are missing.");

        return res.status(500).json({
            success: false,
            message: "Email service is not configured."
        });
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_TO || "vaibhavadarsh07@gmail.com",
            replyTo: email.trim(),
            subject: `Portfolio Contact: ${subject.trim()}`,
            text: [
                `Name: ${name.trim()}`,
                `Email: ${email.trim()}`,
                `Subject: ${subject.trim()}`,
                "",
                "Message:",
                message.trim()
            ].join("\n"),
            html: `
                <h3>New Portfolio Message</h3>
                <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
                <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject.trim())}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>
            `
        });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });
    } catch (error) {
        console.error("Email sending failed:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to send your message right now."
        });
    }
});

module.exports = router;
