const jwt = require("jsonwebtoken")
const verifyAdmin = (req, res, next) => {
    console.log("admin?");
    const authorization = req.headers.authorization || req.headers.Authorization
    if (!authorization?.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" })
    const token = authorization.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Forbidden" })
            if (decoded.role === "admin") {
                req.user = decoded
                next()
            }
            else
                res.status(403).json({ message: "forbbiden you are not admin" })
        })

}
module.exports = verifyAdmin
