const jwt = require("jsonwebtoken");
const APP_SECRET = "Secret";


// const mappings = {
//   get: ['/tournament','/'],
//   post: ['/create', '/update'],
// };

// function requiresAuth(method, url) {
//   console.log(method,url)
//   return (
//     (mappings[method.tolowerCase()] || []).find((p) => url.startsWith(p)) !==
//     undefined
//   );
// }

// module.exports = function(req, res, next){
//   console.log("Authorization1" , req)
//     if(req.url.endsWith('/login') && req.method == 'POST')
//     {
//         if(req.body && req.body.name == USERNAME && req.body.password == PASSWORD)
//         {
//             let token = jwt.sign({data : USERNAME ,expiresIn : '1h'} , APP_SECRET);
//             res.json({success : true , token : token});
//         } else {
//             res.json({success : false});
//         }
//         res.end();
//         return;
//     }
//     else if (requiresAuth(req.method , req.url)){
//         let token = req.headers["authorization"]
//         if(token.startsWith("Bearer<"))
//         {
//             token = token.substring(7, token , length -1)

//             try {
//                 jwt.verify(token , APP_SECRET);
//                 next();
//                 return;
//             } catch (error){
//               res.status(401).json({message: "Auth Failed"});  
//             }
//         }
//         res.statusCode = 401;
//         res.end();
//         return;

//     }
//   next();
// }

  
module.exports = (req, res, next)=>{  
  console.log("Authorization " , req)
  try{
    const token = req.headers.authorization  
    .split(" ")[1];  

    // console.log(token)

    jwt.verify(token, "A_very_long_string_for_our_secret");  
    next();

    }catch(error){  
      res.status(401).json({message: "Auth Failed"});  
    }  
};