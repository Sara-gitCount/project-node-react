require("dotenv").config()
const express=require ("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const PORT=process.env.PORT || 1111
const app=express()
connectDB()
const mongoose=require("mongoose")
const { config } = require("dotenv")

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/product",require("./routes/product"))
app.use("/api/useres",require("./routes/useres"))
app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/basket",require("./routes/basket"))

mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT,()=> console.log(`server running on port ${PORT}`))
})

mongoose.connection.on("error",err=>{
    console.log(err);
})
