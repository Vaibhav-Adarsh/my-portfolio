
const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "about.html"));
});

router.get("/experience", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "experience.html"));
});

router.get("/projects", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "project.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "contact.html"));
});

module.exports = router;
