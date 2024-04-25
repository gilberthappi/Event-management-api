import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const eventSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      ticketsAvailable: {
        type: Number,
        required: true
      },
      price: {
        type: String,
        required: true
      },
});
eventSchema.plugin(mongoosePaginate);
export const EVENT = mongoose.model('event', eventSchema);