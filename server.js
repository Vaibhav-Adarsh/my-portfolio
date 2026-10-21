const cors = require("cors")
const express = require("express");
const path = require("path");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cors({
    origin: "https://vaibhav-adarsh.github.io",
    methods: ["POST" , "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

// Serve your portfolio from the public folder
app.use(express.static(path.join(__dirname, "public")));

const pageRoutes = require("./routes/pageroutes");
app.use("/", pageRoutes)

const contactRoutes  = require("./routes/contactroutes");
app.use("/api", contactRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on port ${PORT}`);
});
