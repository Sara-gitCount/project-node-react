const Product=require("../models/Product")

const createNewProduct=async (req,res)=>{
    const {name, image,price,company}=req.body
    if(!name || !price)
        return res.status(400).json({massage:"name and price is required"})
    const product=await Product.create({name,image,price, company})
    if(product)
        return res.status(201).json({massage:"new product created"})
    else
    return res.status(400).json({message:"Invalid product"})
}

const getAllProduct =async (req,res)=>{
    console.log("getAllProductttt");
    const products=await Product.find().lean()
    return res.status(200).json(products || [])
    // if(!products?.length)  
    //     return res.status(400).json({message: "No product found"})
    // res.json(products)
}

const findById=async (req,res)=>{
const {_id}=req.body
const product=await Product.findById(_id).lean()
if(!product)
    return res.status(400).json({message: "no product found"})
res.json(product)
}

const updateProduct= async (req,res)=>{
     const {_id,name,image,price,company}=req.body
     if(!name||!_id||!price)
        return res.status(400).json({message:"id name and price are required"})
     const product=await Product.findById(_id)
     if(!product)
        return res.status(400).json({message:"no product find"})
product.name=name
product.image=image
product.price=price
product.company=company
await product.save()
res.json({message:"updated"})
}

const deleteProduct=async (req,res)=>{
    const {_id}=req.body
    const product=await Product.findById(_id)
    console.log("id",_id);
    
    if(!product)
        res.status(400).send("no product found")
    await product.deleteOne()
    res.send("the product deleted")
}
module.exports={createNewProduct,getAllProduct,findById,updateProduct,deleteProduct}