
const express = require("express");
const { Resend } = require("resend");

const router = express.Router();

// Initialize Resend using the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

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

// Contact API
router.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body || {};

    // Validate incoming form data
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

    // Ensure the API key is configured
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing.");

        return res.status(500).json({
            success: false,
            message: "Email service is not configured."
        });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [
                process.env.CONTACT_TO ||
                "vaibhavadarsh07@gmail.com"
            ],
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

        if (error) {
            console.error("Resend email failed:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to send your message right now."
            });
        }

        console.log("Resend email accepted:", data?.id);

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
