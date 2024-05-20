const dotenv = require("dotenv");
dotenv.config();

function AuthenticationRoute(req, res, next) {


    const api_Key = req.headers["x-api-key"];

    if (!api_Key) {
        return res.status(401).json({ message: "API Key is missing" });
    }



   if (process.env.SKIP_AUTH === "true") {
       if (api_Key && api_Key === process.env.API_KEY) {
        next();
   } else {
    
   }
  }
}

module.exports = AuthenticationRoute
