    import connectDb from '../../middleware/mongoose';
    import Userdb from '../../models/Userdb';
    var CryptoJS = require("crypto-js");
    var jwt = require('jsonwebtoken');

    const handler = async (req, res) => {
        if (req.method === 'POST') {
            let user = await Userdb.findOne({ "email": req.body.email })
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (req.body.email == user.email && req.body.password == decryptedPass) {
                    var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {
                        expiresIn: "2d"
                    });
                    res.status(200).json({success: true,token});
                }
                else{
                res.status(200).json({ success: false, error: "Invalid Credentials" });
                }
            }
            else {
                res.status(200).json({ success: false, error: "No user found" });
            }
        }
        else {
            res.status(405).json({ error: "Method not allowed" });
        }
    };

    export default connectDb(handler);
