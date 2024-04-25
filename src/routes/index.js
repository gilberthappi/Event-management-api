import express from 'express';
import authRouter from './authentication';
import tourRouter from './Tours';
import bookingRouter from './booking';
import contactRouter from './contacts';
import PaymentRoute from './payment';


const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/tour', tourRouter);
mainRouter.use('/booking', bookingRouter);
mainRouter.use('/cont', contactRouter);
mainRouter.use('/pay', PaymentRoute);

export default mainRouter;