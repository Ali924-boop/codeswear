import connectDb from '../../middleware/mongoose';
import Userdb from '../../models/Userdb';
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === 'POST') {

    const {name, email} = req.body
    let u = new Userdb({name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})    
    await u.save()

      res.status(200).json({ success: "Success" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
