const mongoose = require('mongoose');

const OrderdbSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdb', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Productdb', required: true },
    quantity: { type: Number, default: 1, min: 1 }
  }],
  address: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending', 
    required: true 
  },
}, { timestamps: true });

// const OrderdbSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   orderId: {  type: String, required: true },
//   paymentInfo: {  type: String, default: '' },
//   products: { type: Object, required: true},
//   address: { type: String, required: true },
//   amount: { type: Number, required: true, min: 0 },
//   status: { type: String, default: 'Pending', required: true },
// }, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Order", OrderdbSchema);
