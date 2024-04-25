import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const bookingSchema = mongoose.Schema({
    tourID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TOUR', // Reference to the "TOUR" model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER', // Reference to the "USER" model
    },
    Date:{
        type: Date,
        required: true
    },
    Status: { type: String, default: 'pending' },
    NumberOfTicket: String,
    isPayed: { type: Boolean, default: false},
    paymentMethod: String,
});

bookingSchema.plugin(mongoosePaginate);
export const Booking = mongoose.model('Booking', bookingSchema);
