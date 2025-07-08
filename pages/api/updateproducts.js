import Productdb from '../../models/Productdb';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {  // <-- Replace your existing if here
    try {
      const updates = req.body; // Expecting an array of update objects

      if (!Array.isArray(updates)) {
        return res.status(400).json({ error: 'Request body should be an array' });
      }

      for (let i = 0; i < updates.length; i++) {
        const { _id, ...updateData } = updates[i];
        if (!_id) {
          return res.status(400).json({ error: `Missing _id in update at index ${i}` });
        }

        const updatedProduct = await Productdb.findByIdAndUpdate(_id, updateData, {
          new: true,
          runValidators: true,
        });

        if (!updatedProduct) {
          return res.status(404).json({ error: `Product with _id ${_id} not found` });
        }
      }

      return res.status(200).json({ success: 'All products updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default connectDb(handler);
