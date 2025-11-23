const express=require("express")
const router=express.Router()
const basketController=require("../controller/basketController")
const verifyJWT = require("../middleware/verifyJWT.JS")

router.get("/:_idUser",verifyJWT,basketController.getBasket)
router.get("/byId/:_id",verifyJWT,basketController.getById)
router.get("/products/:_idBasket",verifyJWT,basketController.getAllProducts)
router.post("/",verifyJWT,basketController.createNewBasket)
router.put("/add",verifyJWT,basketController.addAndUpdate)
router.put("/delete",basketController.deleteAndUpdate)

module.exports=router
