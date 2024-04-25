import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: String,
  fullNames: String,
  location: String,
  role: { type: String, default: 'user' },

});
userSchema.plugin(mongoosePaginate);
export const USER = mongoose.model('user', userSchema);