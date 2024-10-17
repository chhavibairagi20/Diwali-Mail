const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});





// API to send emails
app.post('/send-email', async (req, res) => {
  const { emails, subject, message } = req.body;
  const diwaliTemplate = `
  <div style="
    background-color: #fff6e6;
    padding: 20px;
    border: 2px solid #f9a602;
    border-radius: 10px;
    max-width: 600px;
    margin: auto;
    font-family: 'Arial', sans-serif;
    color: #444;
  ">
    <h1 style="text-align: center; color: #ff751a;">✨ Happy Diwali! ✨</h1>

    <p style="font-size: 18px; text-align: center;">
      May the festival of lights bring joy, prosperity, and happiness to you and your family!
    </p>

    <p style="font-size: 16px; text-align: center; color: #ff751a;">
      Wishing you lots of love, light, and laughter this Diwali!
    </p>

    <div style="text-align: center; margin-top: 10px;">
      <a href="#" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #f9a602;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">
        Celebrate with Us 🎉
      </a>
    </div>

    <footer style="
      margin-top: 20px;
      font-size: 14px;
      text-align: center;
      color: #777;
    ">
      © 2024 Your Company | All rights reserved
    </footer>
  </div>
  `;

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: emails.join(','),
      subject: '🎆 Wishing You a Joyous and Bright Diwali! 🎆' || subject,
      html: diwaliTemplate,
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
