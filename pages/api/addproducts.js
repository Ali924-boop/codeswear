import Productdb from '../../models/Productdb';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      for (let i = 0; i < req.body.length; i++) {
        let p = new Productdb({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,        
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty,
        });

        await p.save();
      }
      res.status(200).json({ success: "Products added successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
