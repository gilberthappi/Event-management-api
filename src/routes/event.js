import express from 'express';
import {
  getEvent, createEvent, updateEvent, deleteEvent
} from '../controllers/event';
// import { verifyToken, isAdmin, uploads } from '../middleware';
import { uploaded, verifyToken } from '../middleware';
const eventRouter = express.Router();

eventRouter.get('/all', getEvent);

eventRouter.get('/getByField', getEvent);

eventRouter.post('/addNew',  uploaded, createEvent);

eventRouter.put('/update', uploaded, updateEvent);

eventRouter.delete('/delete', deleteEvent);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *         price:
 *           type: string
 *         ticketsAvailable:
 *           type: integer
 *         location:
 *           type: string
 */
/**
 * @swagger
 * /event/all:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     description: Get a list of all Events.
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
 * /event/getByField:
 *   get:
 *     summary: Get a event by a specified 
 *     tags: [Events]
 *     description: Get a single event by a specified field (e.g., "_id" or "destination").
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
 *         description: Event found successfully
 *       404:
 *         description: Event not found
 * */



/**
 * @swagger
 * tags:
 *  name: Events
 * description: Events API
 * 
 */ 

/**
 * @swagger
 * /event/addNew:
 *  post:
 *    summary: Create a new event
 *    tags: [Events]
 *    description: Create a new event.
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *             title:
 *              type: string
 *             description:
 *              type: string
 *             date:
 *              type: string
 *             location:
 *              type: string
 *             ticketsAvailable:
 *              type: integer
 *             price:
 *              type: string
 *    responses:
 *       201:
 *         description: Event created successfully
 *       404:
 *         description: Failed to add Event
 */



/**
 * @swagger
 * /event/update:
 *   put:
 *     summary: Update a event
 *     tags: [Events]
 *     description: Update an existing event.
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to identify the event to update (e.g., "_id" or "destination").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value of the field to match when identifying the event.
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *             title:
 *              type: string
 *             description:
 *              type: string
 *             date:
 *              type: string
 *             location:
 *              type: string
 *             ticketsAvailable:
 *              type: integer
 *             price:
 *              type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found or update failed
 */



/**
 * @swagger
 * /event/delete:
 *   delete:
 *     summary: Delete a event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     description: Delete an existing Event.
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to identify the Event to delete (e.g., "_id" or "destination").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value of the field to match when identifying the Event.
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found or delete failed
 */







export default eventRouter;