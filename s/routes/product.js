const express=require("express")
const router=express.Router()
const productController=require("../controller/productController")
const verifyAdmin = require("../middleware/verifyAdmin")
 
router.get("/",productController.getAllProduct)
router.get("/byId",productController.findById)
router.post("/",verifyAdmin,productController.createNewProduct)
router.put("/",verifyAdmin,productController.updateProduct)
router.delete("/",verifyAdmin,productController.deleteProduct)
module.exports=router