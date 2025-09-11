const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async(req, res, next) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'authentication required'
            });
        }
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(decoded);
        const user = await User.findById(decoded.id);
            console.log(user);
        if(!user){
            return res.status(401).json({
                success: false, 
                message: 'user not found'
            });
        }
        console.log(user);
        req.user = {
            _id: user._id
        };
        next();
    }catch(error){
        console.error(error);
        res.status(401).json({
            success: false,
            message: 'Invalid token', 
            error: error.message
        });
    }
};



exports.isAdmin = async(req, res, next) => {
    try{
        console.log(req.body.user._id);
        const user=User.findById(req.body.user._id);
        console.log(user);
        user.isAdmin=true;
    }catch(err){
        return res.status(403).json({message:"Only admin can delete items"});
    }
    
    next();
};