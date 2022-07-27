const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class AuthController{

    checkToken = async(req,res,next) => {
        try{
            const user = await User.findById(req.userId).select('-password')
            if(!user){
                res.status(400).json({success: false, message: "User Not Found"})
            }
            res.json({success: true, user})
        }catch(e){
            console.log(e);
            res.status(500).json({success: false, message: "Error"})
        }
    }

    loginAuth = async (req,res,next) => {
        const {username, password} = req.body; 

        if(!username | !password){
            return res.status(400).json({success: false, message: 'Missing username and password'})
        }
        
        try{
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({success: false, message: "Username and password not right"})
            }
       
            const passwordValid = await argon2.verify(user.password, password)
            if(!passwordValid){
                return res.status(400).json({success: false, message: "Username and password not right"})
            }

            const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)

            res.json({success: true, message: "Ok", accessToken, user})

        }catch(error){
            console.log(error)
            res.status(500).json({success: false, message: "Error"})
        }
    }

    registerAuth = async (req,res,next) => {
        const {username, password} = req.body;
        console.log(username, password)
        if(!username | !password){
            return res.status(400).json({success: false, message: 'Missing username and password'})
        }

        try{
            const user = await User.findOne({username});

            if(user){
                return res.status(400).json({success: false, message: "Username already taken"})
            }

            const hashedPassword = await argon2.hash(password)

            const newUser = new User(req.body);
            newUser.password = hashedPassword;

            await newUser.save()
            //access token
            const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)
            res.json({success: true, message: "Ok", accessToken, newUser})

        }catch(e){
            console.log(e)
            res.status(500).json({success: false, message: "Error"})
        }
    }
}

module.exports = new AuthController();