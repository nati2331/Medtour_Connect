const { User } = require('../../models'); // Adjust path as needed
const nodemailer = require('nodemailer');

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password'    // Replace with your email password
  }
});

// Send an email
const sendEmail = async (user) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: 'natnael.mk2@gmail.com',
    subject: 'New User Submission',
    text: `New user submitted:\n\nFirst Name: ${user.firstName}\nLast Name: ${user.lastName}\nEmail: ${user.email}\nDesired Service: ${user.desiredService}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await sendEmail(user); // Send email after user creation
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
