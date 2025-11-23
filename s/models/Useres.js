const { type } = require("express/lib/response")
const mongoose =require("mongoose")
const usersSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
   lastName:{
        type:String,
        required:true
    },
       phon:{
        type:String,
        required:true,
        maxLength:10,
        unique:true
    },
       mail:{
        type:String,
         unique:true
    },
    address:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})
module.exports=mongoose.model("Useres",usersSchema)