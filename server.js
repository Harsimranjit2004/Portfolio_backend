require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
// Load configurations
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;
const app = express();

// Connect to MongoDB
connectDB();
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Credentials", "true");  
console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use(cookieParser())
// Middleware
//app.use(cors(corsOptions)); // CORS must come before other routes
//app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Credentials", "true");
//next();
//});
//app.options("*", (req, res) => {
  // console.log("options reqresu", req.headers);
  //res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  //res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //res.header("Access-Control-Allow-Credentials", "true");
  //res.sendStatus(200); // Respond immediately with 200 OK
//});
//app.options("*", (req, res) => {
  //const origin = req.headers.origin;

  // Dynamically set the Access-Control-Allow-Origin to the requesting origin
 // if (origin) {
  //  res.header("Access-Control-Allow-Origin", origin);
  //  res.header("Access-Control-Allow-Credentials", "true");
  //  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //  console.log("Preflight OPTIONS received from:", origin);
   // return res.sendStatus(200);
 // }

  //res.status(403).send("CORS origin not allowed");
//});
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
//co/nst cors = require('cors');
//app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
//app.use(cors({
  //origin: 'http://localhost:5173',
 // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 // allowedHeaders: ['Content-Type', 'Authorization'],
 // credentials: true//
//}));
//app.options("*", cors(corsOptions)); // Handle preflight OPTIONS requests globally
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Default route for testing
app.get("/", (req, res) => {
  res.json({ name: "harsimran" });
});

// Routes
app.use("/auth", require("./Routes/authRoutes"));
app.use("/user", require("./Routes/userRoutes"));
app.use("/userInfo", require("./Routes/userInfoRoutes"));
app.use("/projects", require("./Routes/projectRoutes"));
app.use("/interests", require("./Routes/interestRoutes"));
app.use("/skills", require("./Routes/skillsRoutes"));
app.use("/blogs", require("./Routes/blogsRoutes"));
app.use("/notes", require("./Routes/notesRoutes"));
app.use("/notebooks", require("./Routes/notebookRoutes"));
app.use("/educations", require("./Routes/educationRoutes"));

// Email sending route
app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hsdosanjh1234@gmail.com",
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "hsdosanjh1234@gmail.com",
    subject: `New Message From ${name}`,
    text: `Hello,

You've received a new message from ${name}:

Message: ${message}

Email: ${email}
Best wishes,`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({ success: "Email sent successfully!" });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

