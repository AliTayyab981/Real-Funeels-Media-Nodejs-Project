const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// @des Register user 
// route post /api/users/register  
// @access public  

const registerUser = asyncHandler(async(req,res)=>{
        const {username,email,password}=req.body;
    if(!username|| !email || !password){
        res.status(400);
        throw new Error("All feilds are mandotory")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exist")
    }
 // hash password 
    const hashPassword= await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password : hashPassword
    })
    if(user){
        res.status(201).json({_id:user.id ,email : user.email});
    }else{
        res.status(400);
        throw new Error("User Data us not valid")
    }
    res.json({
        message : "Register the user"
    })

}
 )

// @des Login user 
// route post /api/users/login  
// @access public 

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All field are mandotary")
    }
    const user = await User.findOne({email})
    // compare password with hash password 
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken= jwt.sign({
            user : {
                username: user.username,
                email : user.email,
                id : user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Erro("Crdentials are invalid")
    }
    res.json({
        message : "Login the user"
    })
})

// @des current user info
// route post /api/users/current  
// @access private 

const currentUser = asyncHandler((req,res)=>{
    res.json(req.user)
})




module.exports = {
    registerUser,
    loginUser,
    currentUser
}