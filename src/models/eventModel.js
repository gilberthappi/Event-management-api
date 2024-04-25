import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const eventSchema = new mongoose.Schema({
      title: {
        type: String,
        required: false
      },
      description: {
        type: String,
        required: false
      },
      date: {
        type: String,
        required: false
      },
      location: {
        type: String,
        required: false
      },
      ticketsAvailable: {
        type: String,
        required: false,
        enum: ['Available', 'Sold Out', 'Not Available', 'Free'],
        default: 'Available'
      },
      price: {
        type: String,
        required: false
      },
      backdropImage: {
        type: String,
        required: false
      }
});
eventSchema.plugin(mongoosePaginate);
export const EVENT = mongoose.model('event', eventSchema);