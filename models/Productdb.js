const mongoose = require('mongoose');

const ProductdbSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  desc: { type: String, required: true },
  img: { type: String, required: true }, // single image
  category: { type: String, required: true, lowercase: true, trim: true },
  size: [{ type: String, trim: true }],   // array of size strings, e.g. ['S', 'M', 'L']
  color: [{ type: String, trim: true }],  // array of color strings, e.g. ['red', 'blue']
  price: { type: Number, required: true, min: 0 },
  availableQty: { type: Number, required: true, min: 0 },
}, { timestamps: true });

mongoose.models = {}; // clear model cache to avoid overwrite errors
export default mongoose.model("Productdb", ProductdbSchema);
