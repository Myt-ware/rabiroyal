const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneOrEmail: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String,
    default: '' 
  },
  otp: { 
    type: String 
  },
  otpExpires: { 
    type: Date 
  },
  savedAddress: {
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    pincode: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
