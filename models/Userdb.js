const mongoose = require('mongoose');

const UserdbSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  password: { type: String, required: true },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Userdb", UserdbSchema);
