import express from 'express';
import {
  getTours, createTour, createTours, updateTour,
  deleteTours
} from '../controllers/tours';
// import { verifyToken, isAdmin, uploads } from '../middleware';
import { uploaded, verifyToken } from '../middleware';
const tourRouter = express.Router();
// tourRouter.use(verifyToken);

tourRouter.get('/all', getTours);

tourRouter.get('/getByField', getTours);

tourRouter.post('/addNew',  uploaded, createTour);

tourRouter.post('/addNews', uploaded, createTours);

tourRouter.put('/update', uploaded, updateTour);

tourRouter.delete('/delete', deleteTours);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Tour:
 *       type: object
 *       properties:
 *         destination:
 *           type: string
 *         backdropImage:
 *           type: string
 *         title:
 *           type: string
 *         Description:
 *           type: string
 *         Duration:
 *           type: string
 *         Group_size:
 *           type: string
 *         Price:
 *           type: string
 *         Discount:
 *           type: string
 *         Tour_type:
 *           type: string
 *         Departure:
 *           type: string
 *         Seats:
 *           type: integer
 *         fromMonth:
 *           type: string
 *         toMonth:
 *           type: string
 *         departureTime:
 *           type: string
 *         ReturnTime:
 *           type: string
 *         Gallery:
 *           type: array
 *           items:
 *             type: string
 */
/**
 * @swagger
 * /tour/all:
 *   get:
 *     summary: Get all tours
 *     tags: [Tours]
 *     description: Get a list of all tours.
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
 */


/**
 * @swagger
 * /tour/getByField:
 *   get:
 *     summary: Get a tour by a specified 
 *     tags: [Tours]
 *     description: Get a single tour by a specified field (e.g., "_id" or "destination").
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to search for (e.g., "_id" or "destination").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value to match in the specified field.
 *     responses:
 *       200:
 *         description: Tour found successfully
 *       404:
 *         description: Tour not found
 * */



/**
 * @swagger
 * tags:
 *  name: Tours
 * description: Tours API
 * 
 */ 

/**
 * @swagger
 * /tour/addNew:
 *  post:
 *    summary: Create a new tour
 *    tags: [Tours]
 *    description: Create a new tour
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *             destination:
 *              type: string
 *             backdropImage:
 *              type: file
 *              items:
 *                type: String
 *                format: binary
 *             title:
 *              type: string
 *             Description:
 *              type: string
 *             Duration:
 *              type: string
 *             Group_size:
 *              type: string
 *             Price:
 *              type: string
 *             Discount:
 *              type: string
 *             Tour_type:
 *              type: string
 *             Departure:
 *              type: string
 *             Seats:
 *              type: integer
 *             fromMonth:
 *              type: string
 *             toMonth:
 *              type: string
 *             departureTime:
 *              type: string
 *             ReturnTime:
 *              type: string
 *             Gallery:
 *              type: array
 *              items:
 *                type: file
 *                format: binary
 *    responses:
 *       201:
 *         description: Tour created successfully
 *       404:
 *         description: Failed to add tour
 */



/**
 * @swagger
 * /tour/update:
 *   put:
 *     summary: Update a tour
 *     tags: [Tours]
 *     description: Update an existing tour.
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to identify the tour to update (e.g., "_id" or "destination").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value of the field to match when identifying the tour.
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *             destination:
 *              type: string
 *             backdropImage:
 *              type: file
 *              items:
 *                type: String
 *                format: binary
 *             title:
 *              type: string
 *             Description:
 *              type: string
 *             Duration:
 *              type: string
 *             Group_size:
 *              type: string
 *             Price:
 *              type: string
 *             Discount:
 *              type: string
 *             Tour_type:
 *              type: string
 *             Departure:
 *              type: string
 *             Seats:
 *              type: integer
 *             fromMonth:
 *              type: string
 *             toMonth:
 *              type: string
 *             departureTime:
 *              type: string
 *             ReturnTime:
 *              type: string
 *             Gallery:
 *              type: array
 *              items:
 *                type: file
 *                format: binary
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Tour not found or update failed
 */



/**
 * @swagger
 * /tour/delete:
 *   delete:
 *     summary: Delete a tour
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     description: Delete an existing tour.
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to identify the tour to delete (e.g., "_id" or "destination").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value of the field to match when identifying the tour.
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found or delete failed
 */







export default tourRouter;