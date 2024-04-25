import { generateToken, hashPassword } from '../../utils';
import { USER } from '../../models';
import { transporter } from '../../utils/mailTransport.js';

export const signUp = async (req, res) => {
  try {
    const User = await USER.findOne({ email: req.body.email });

    if (User) {
      return res.status(409).json({
        message: 'User with this email already exists',
      });
    }

    const hashedPassword = await hashPassword(req.body.password);

    req.body.password = hashedPassword;

    const newUser = await USER.create(req.body);
    if (!newUser) {
      res.status(404).json({ message: 'Failed to register' });
    }

    // Send a welcome email to the user
    const mailOptions = {
      from: 'robertwilly668@gmail.com',
      to: newUser.email,
      subject: 'Welcome to HOLIDAY PLANNER',
      text: 'Thank you for signing up!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    const token = generateToken({
      id: newUser.id,
    });

    res.status(201).json({
      message: 'User registered successfully',
      access_token: token,
      USER: {
        email: newUser.email,
        location: newUser.location,
        fullNames: newUser.fullNames,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
