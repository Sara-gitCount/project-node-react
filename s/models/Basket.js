const mongoose=require("mongoose")
// const useresSchema=require("./Useres")
// const productSchema=require("./Product")
const basketSchema=new mongoose.Schema({
    // user:{
    //     type: useresSchema,
    //     required:true
    // },
    // products:[productSchema]
  
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:{
        type:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        } ,

        quentity:{
        type:Number,
        default:1,
        min:1
        }}],
default:[]
},
    totalPrice:{
        type:Number,
        default:0
    },
       totalProducts:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Basket",basketSchema)