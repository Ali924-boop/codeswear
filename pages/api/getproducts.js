import Productdb from '../../models/Productdb';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  let products = await Productdb.find();
  let tshirts = {}

  for (let item of products) {
  if (tshirts[item.title]) {
    if (item.availableQty > 0) {
      // Add colors
      const itemColors = Array.isArray(item.color) ? item.color : [item.color];
      itemColors.forEach(c => {
        if (!tshirts[item.title].color.includes(c)) {
          tshirts[item.title].color.push(c);
        }
      });

      // Add sizes
      const itemSizes = Array.isArray(item.size) ? item.size : [item.size];
      itemSizes.forEach(s => {
        if (!tshirts[item.title].size.includes(s)) {
          tshirts[item.title].size.push(s);
        }
      });

      // Add images
      if (item.img && !tshirts[item.title].images.includes(item.img)) {
        tshirts[item.title].images.push(item.img);
      }
    }
  } else {
    tshirts[item.title] = JSON.parse(JSON.stringify(item));
    tshirts[item.title].color = Array.isArray(item.color) ? item.color : [item.color];
    tshirts[item.title].size = Array.isArray(item.size) ? item.size : [item.size];
    tshirts[item.title].images = item.img ? [item.img] : [];
  }
}


  res.status(200).json({ tshirts });
}

export default connectDb(handler);
