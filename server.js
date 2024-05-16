require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3500;
const path = require("path");
const connectDB = require("./config/dbConn");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.use(cors(corsOptions));

app.use("/projects", require("./Routes/projectRoutes"));
app.use("/interests", require("./Routes/interestRoutes"));
app.use("/skills", require("./Routes/skillsRoutes"));
app.use("/blogs", require("./Routes/blogsRoutes"));
app.use("/notes", require("./Routes/notesRoutes"));
app.use("/notebooks", require("./Routes/notebookRoutes"));
app.use("/educations", require("./Routes/educationRoutes"));

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hsdosanjh1234@gmail.com",
      pass: `${process.env.PASS}`,
    },
  });

  // Define email options
  const mailOptions = {
    from: email,
    to: "hsdosanjh1234@gmail.com",
    subject: `New Message From ${name}`,
    text: `Hello 

You've received a new message from ${name}:

Message: ${message}

Email: ${email}
Best wishes,`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});
mongoose.connection.once("open", () => {
  console.log("db");
  app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
