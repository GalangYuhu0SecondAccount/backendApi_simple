const dotenv = require("dotenv")
dotenv.config()


function AuthenticationRoute (req , res , next) {
    const api_Key = req.headers["x-api-key"];

    if (api_Key && api_Key === process.env.API_KEY) {
        next();
    } else {
        return res.status(400).json({message : "your have request api key"})
    }
}

module.exports = AuthenticationRoute;