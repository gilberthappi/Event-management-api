import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    service : String,
    message: String,
    adminResponse: String,
});

contactSchema.plugin(mongoosePaginate);
export const CONTACT = mongoose.model('Contact', contactSchema);