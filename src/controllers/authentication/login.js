import { USER } from '../../models';
import { comparePassword, generateToken } from '../../utils';

export const logIn = async (req, res) => {
  try {
    const User = await USER.findOne({ email: req.body.email });

    if (!User) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      User.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    const token = generateToken({
      id: User.id,
      // email: User.email,
    });

    res.status(200).json({
      message: 'User logged in successfully',
      access_token: token,
      USER: {
        email: User.email,
        location: User.location,
        fullNames: User.fullNames,
        phoneNumber: User.phoneNumber,
        role: User.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};