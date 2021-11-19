const jwt = require("jsonwebtoken");

  
module.exports = (req, res, next)=>{  
  console.log("Authorization " , req)
  try{
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];  
    if(token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) return res.sendStatus(403)
      req.user = user
      next();
    });  
    

    }catch(error){  
      res.status(401).json({message: "Auth Failed"});  
    }  
};