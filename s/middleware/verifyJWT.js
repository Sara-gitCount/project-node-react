const jwt=require("jsonwebtoken")
const verifyJWT=(req,res,next)=>{
const authorization=req.headers.authorization||req.headers.Authorization
if(!authorization?.startsWith("Bearer "))
    return res.status(401).json({message:"Unauthorized"})
const token =authorization.split(" ")[1]
jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err,decoded)=>{
        if(err){
            console.log({err});
            return res.status(403).json({message:"Forbidden"})}
        req.user=decoded
        next()
    })
}
module.exports=verifyJWT
//לא השתמשתי בזה בשום מקום