const express=require("express")
const router=express.Router()
const userseController=require("../controller/useresController")

router.post("/",userseController.createNewUser)
router.get("/",userseController.getAllUsers)
router.get("/byId",userseController.findById)
router.put("/",userseController.updatedUser)
router.delete("/",userseController.deleteUser)
module.exports=router