const Useres=require("../models/Useres")

const createNewUser= async (req,res)=>{
    const {firstName,lastName,phon,mail,address}=req.body
    if(!firstName || !lastName || !phon)
        return res.status(400).json({message:"firstName ,lastName and phon are required"})
    const user= await Useres.create({firstName,lastName,phon,mail,address})
    if(!user)
        return res.status(400).json({message:"Invalid user"})
    res.status(201).json({message:"new user created"})

}

const getAllUsers= async (req,res)=>{
    const useres= await Useres.find().lean()
    if(!useres?.length)
        return res.status(400).json({message:"no product found"})
    res.json(useres)
}

const findById=async (req,res)=>{
    const {_id}=req.body
    const user=await Useres.findById(_id).lean()
    if(!user)
       return res.status(400).json({message:"no user found"})
    res.json(user)
}

const updatedUser=async (req,res)=>{
    const {_id,firstName,lastName,phon,mail,address}=req.body
    if(!_id || !firstName || !lastName || !phon)
        return res.status(400).json({message:"_id, firstName,lastName and phon are required"})
    const user=await Useres.findById(_id)
    if(!user)
        return res.status(400).json({message:"no user found"})
    user.firstName=firstName
    user.lastName=lastName
    user.phon=phon
    user.mail=mail
    user.address=address
    await user.save()
    res.json({message:"updated"})
}

const deleteUser= async (req,res)=>{
    const {_id}=req.body
    const user=await Useres.findById(_id)
    if(!user)
        return res.status(400).send("no user found")
    await Useres.deleteOne()
    res.send("deleted")
}

module.exports={createNewUser,getAllUsers,findById,updatedUser,deleteUser}