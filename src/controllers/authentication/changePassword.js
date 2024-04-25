import { USER } from '../../models';
import { comparePassword, hashPassword } from '../../utils';

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req;
    const User = await USER.findById(userId);
    const isPasswordCorrect = comparePassword(currentPassword, User.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    User.password = hashedPassword;
    User.save();
    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// import { USER } from '../../models';
// import { comparePassword, hashPassword } from '../../utils';

// export const changePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body; // Note the change from currentPassword to oldPassword
//     const { userId } = req;
//     const User = await USER.findById(userId);
//     const isPasswordCorrect = comparePassword(oldPassword, User.password);

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         message: 'Wrong password',
//       });
//     }

//     const hashedPassword = await hashPassword(newPassword);
//     User.password = hashedPassword;
//     await User.save();
//     res.status(200).json({
//       message: 'Password changed successfully',
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// };
