require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.post("/send-email", function (req, res) {
  const { email, name, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.USER_MAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    },
  });
  const mailOptions = {
    to: "ghivalla.soumar@gmail.com",
    from: email,
    subject: `Website : New message from ${name}`,
    text: message,
  };
  try {
    transporter.sendMail(mailOptions, function (err, rep) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json("message sent successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, function () {
  console.log("App listening on port 3001!");
});
