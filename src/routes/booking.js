// bookingRoutes.js
import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsCount,
  // getAllBookings,
  // getAllBookingsAdmin,
  // deleteBookingByIdAdmin,
} from '../controllers/booking/bookingCrud.js';
import { verifyToken, uploaded, isAdmin } from '../middleware'; // Make sure to import the necessary middleware

const bookingRoute = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: 'http'
 *       scheme: 'bearer'
 *       bearerFormat: 'JWT'
 *   schemas:
 *     Booking:
 *       type: 'object'
 *       properties:
 *         tourID:
 *           type: 'string'
 *         UserID:
 *           type: 'string'
 *         isPayed:
 *           type: 'boolean'
 *         paymentMethod:
 *           type: 'string'
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking API
 */

// /**
//  * @swagger
//  * /booking/all:
//  *   get:
//  *     summary: Get all bookings
//  *     security:
//  *       - bearerAuth: []
//  *     tags: [Bookings]
//  *     description: Get a list of all bookings.
//  *     responses:
//  *       200:
//  *         description: Success
//  */

// bookingRoute.get('/all',verifyToken, isAdmin, getAllBookingsAdmin);

/**
 * @swagger
 * /booking/all:
 *   get:
 *     summary: Get all bookings
 *     security:
 *       - bearerAuth: []
 *     tags: [Bookings]
 *     description: Get a list of all bookings.
 *     responses:
 *       200:
 *         description: Success
 */

bookingRoute.get('/all', getBookings);

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     description: Get a single booking by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to retrieve.
 *     responses:
 *       200:
 *         description: Booking found successfully
 *       404:
 *         description: Booking not found
 */
bookingRoute.get('/:id', getBookingById);
/**
 * @swagger
 * /booking/book:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     description: Create a new booking.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tourID:
 *                 type: string
 *               UserID:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               NumberOfTicket:
 *                 type: string
 *             required:
 *               - tourID
 *               - UserID
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 */

bookingRoute.post('/book', uploaded, createBooking);

/**
 * @swagger
 * /booking/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     description: Update an existing booking by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tourID:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               NumberOfTicket:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Bad request
 */
bookingRoute.put('/:id', uploaded, updateBooking);


/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     description: Delete an existing booking by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to delete.
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */
bookingRoute.delete('/:id', deleteBooking);

// /**
//  * @swagger
//  * /booking/{id}:
//  *   delete:
//  *     summary: Delete a booking by ID
//  *     tags: [Bookings]
//  *     security:
//  *       - bearerAuth: []
//  *     description: Delete an existing booking by its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the booking to delete.
//  *     responses:
//  *       200:
//  *         description: Booking deleted successfully
//  *       404:
//  *         description: Booking not found
//  */
// bookingRoute.delete('/:id',verifyToken, isAdmin, deleteBookingByIdAdmin);

/**
 * @swagger
 * /booking/count:
 *   post:
 *     summary: Count Bookings by year 
 *     tags: [Bookings]
 *     description: Count Bookings  by a specified period (e.g., "year" ).
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to search for (e.g., "2023").
 *     responses:
 *       200:
 *         description: Bookings count successfully
 *       404:
 *         description: Bookings not found
 * */

bookingRoute.post('/count', getBookingsCount);

export default bookingRoute;
