import express from 'express';
import { signUp, logIn, changePassword } from '../controllers/authentication';
import { All, deleteUser, getUserByEmail, updateByEmail } from '../controllers/authentication';

import { verifyToken,uploaded, isAdmin } from '../middleware';

const authRouter = express.Router();

authRouter.post('/signup',uploaded, signUp);
authRouter.post('/login',uploaded, logIn);
authRouter.post('/changePassword', uploaded, verifyToken, changePassword);

authRouter.get("/users", All);
authRouter.get('/users/getOne/:email',getUserByEmail);
authRouter.put('/users/update/:email',uploaded, updateByEmail);
// authRouter.delete('/users/delete/:email',verifyToken,isAdmin,deleteUser)
authRouter.delete('/users/delete/:email', deleteUser);

/**
 * @swagger
 * tags:
 *  name: Authentication
 * description: Tours API
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Users
 * description: Tours API
 * 
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           unique: true
 *         password:
 *           type: string
 *           required: true
 *         phoneNumber:
 *           type: string
 *         fullNames:
 *           type: string
 *         location:
 *           type: string
 *         role:
 *           type: string
 *           default: 'user'
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     tags: [Authentication]
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullNames:
 *                 type: string
 *               location:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - User already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Authentication]
 *     description: Authenticate a user and obtain an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated, access token obtained
 *       401:
 *         description: Unauthorized - Invalid credentials
 */

/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     summary: Change Password
 *     tags: [Authentication]
 *     description: Change the password of an authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       400:
 *         description: Bad Request - Invalid data
 */


/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: The page to search for (e.g., "3").
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: The limit to match in the specified page.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullNames:
 *                 type: string
 *               location:
 *                 type: string
 */

/**
 * @swagger
 * /auth/users/getOne/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     description: Retrieve a single user by their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to retrieve.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullNames:
 *                 type: string
 *               location:
 *                 type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/users/update/{email}:
 *   put:
 *     summary: Update a user by email
 *     tags: [Users]
 *     description: Update a user's information by their email address.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullNames:
 *                 type: string
 *               location:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */


/**
 * 
 * 
 * @swagger
 * /auth/users/delete/{email}:
 *   delete:
 *     summary: Delete a user by email
 *     tags: [Users]
 *     description: Delete a user by their email address.
 *     security:
 *       - bearerAuth: []
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden - Insufficient permissions
 */






export default authRouter;
