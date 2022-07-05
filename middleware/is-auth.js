const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.get("Authorization")
    if(!token){
        const error = new Error("Authorization Failed");
        error.statusCode = 401;
        throw error
    }
    token = token.replace("Bearer ", "");
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWTSECRET);
    }
    catch(error){
        error.statusCode = 500;
        next(error);
    }
    if(!decodedToken){
        const error = new Error("Authorization Failed");
        error.statusCode = 401;
        res.status(401).json({
            message: "Authorization Failed",
        })
    }
    next();
}