const express = require('express');

const router = express.Router();
// Route to handle email sending
app.post('/send-email', async (req, res) => {
    const { email } = req.body;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for subscribing to Fuzzies!',
      text: `Hello,
  
  Thank you for subscribing to Fuzzies! We're excited to keep you updated on the latest news, products, and offers.
  
  Best regards,
  The Fuzzies Team`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error });
    }
  });
  module.exports=router;