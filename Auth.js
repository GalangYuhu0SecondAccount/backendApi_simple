const dotenv = require("dotenv")
dotenv.config()


function AuthenticationRoute(req, res, next) {
    const api_Key = req.headers["x-api-key"] || req.query.api_key;


    if (api_Key && api_Key === process.env.API_KEY) {
        next();
    } else {
        return res.status(400).json({ message: "you have to provide an API key" });
    }
}

module.exports = AuthenticationRoute;
