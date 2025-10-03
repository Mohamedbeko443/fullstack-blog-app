const jwt = require("jsonwebtoken");


// verify token
function verifyToken(req , res , next){
    const authToken = req.headers["authorization"] || req.headers['Authorization'];
    if(!authToken)
    {
        return res.status(401).json({message: "no token provided, access denied"})
    }

    const token = authToken.split(" ").at(1);
    try{
        const decodedPayload = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decodedPayload;
        return next();
    }
    catch (err)
    {
        return res.status(401).json({message: "invalid token, access denied."})
    }

}


function verifyAdmins(req , res, next)
{
    verifyToken(req , res, ()=>{
        if(req.user.isAdmin)
        {
            return next();
        }
        return res.status(403).json({message: "NOT allowed, only admins"});
    })
}


function verifyUsers(req , res, next)
{
    verifyToken(req , res, ()=>{
        if(req.user.id === req.params.id)
        {
            return next();
        }
        return res.status(403).json({message: "NOT allowed, only user himself"});
    })
}


function verifyAdminsAndUsers(req , res , next){
    verifyToken(req, res , ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            return next();
        }
        return res.status(401).json({message: "NOT allowed, only user himself or admins."})
    })
}

module.exports = {
    verifyToken,
    verifyAdmins,
    verifyUsers,
    verifyAdminsAndUsers
}