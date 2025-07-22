const jwt = require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    
    try{
         const token=req.headers.authorization.split(" ")[1];
         const data= jwt.verify(token, process.env.JWT_SECRET);     
         req.user=data;
         next();

     }catch(e){
         res.json({success:false,message:"invalid token"})
     }

};


module.exports=verifyToken;