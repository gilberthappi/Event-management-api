import { Transactions, cashIn, cashOut} from "../controllers/payment";
import express from 'express';
import { verifyToken, uploaded, isAdmin } from '../middleware';

const PaymentRoute =express.Router();

PaymentRoute.post('/cashin',uploaded, cashIn);
PaymentRoute.post('/cashout',uploaded, cashOut);
PaymentRoute.get('/history',uploaded, Transactions);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: 'http'
 *       scheme: 'bearer'
 *       bearerFormat: 'JWT'
 *   schemas:
 *     Payment:
 *       type: 'object'
 *       properties:
 *         number:
 *           type: 'string'
 *         amount:
 *           type: 'number'
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment API
 */

/**
 * @swagger
 * /pay/cashin:
 *   post:
 *     summary: CASH IN
 *     tags: [Payment]
 *     description: Create a new CashIn.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               amount:
 *                 type: number
 *             required:
 *               - number
 *               - amount
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /pay/cashout:
 *   post:
 *     summary: CASH OUT
 *     tags: [Payment]
 *     description: Create a new CashOut.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               amount:
 *                 type: number
 *             required:
 *               - number
 *               - amount
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /pay/history:
 *   get:
 *     summary: Get all Transactions
 *     tags: [Payment]
 *     description: Get a list of all Transactions.
 *     responses:
 *       200:
 *         description: Success
 */

export default PaymentRoute;