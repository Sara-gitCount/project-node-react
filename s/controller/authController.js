const User=require("../models/Useres")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const login=async (req,res)=>{
const {phon,password}=req.body
if(!phon || !password) 
    return res.status(400).json({message:"phon and password are required"})
const foundUser=await User.findOne({phon})
if(!foundUser)
    return res.status(401).json({message:"Unauthorized"})
const match=await bcrypt.compare(password,foundUser.password)
if(!match)
    return res.status(401).json({message:"Unauthorized"})
const userInfo={_id:foundUser._id, lastName:foundUser.lastName, 
firstName: foundUser.firstName, phon:foundUser.phon,
 mail:foundUser.mail,address:foundUser.address, role:foundUser.role}
 const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
 res.json({accessToken})
}


const register=async (req,res)=>{
    console.log("register req.body",req.body);
    const {firstName,lastName,phon,mail,address,password,role}=req.body
        if(!firstName || !lastName || !phon || !password)
            return res.status(400).json({message:"firstName ,lastName ,phon and password are required"})
        const duplicate=await User.findOne({phon}).lean()
        if(duplicate)
            return res.status(409).json({message:"duplicate"})
        const hashePWD=await bcrypt.hash(password,10)
        const userObject={firstName,lastName,phon,mail,address,password:hashePWD,role}
        const user=await User.create(userObject)
        if(!user)
            return res.status(400).json({message:"Invalid user"})
        return res.status(201).json({message:"new user created"})
}

module.exports={login,register}