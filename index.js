const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || process.env.PORT_SERVER_HOME || "0.0.0.0" ;

// Middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
    origin : "*"
}));

app.use(helmet());
app.use(morgan("combined"));
const AuthenticationRoute = require("./Auth")


const users = require("./db.json");

app.get("/request", (req, res) => {
    const username = req.query.username;

    
        const response = {
            username : username,
            api_key: process.env.API_KEY
        };
        res.status(201).json(response);
    } 
);

app.get("/users", AuthenticationRoute, (req, res) => {

    const token = req.headers["x-api-key"];
    if (!token) {
        return res.status(401).json({ message: "i want to value valid" });
    }

    if (token === process.env.API_KEY) {
        return res.status(200).json({ message: "Data success", data: users });
    } else {
        return res.status(400).json({ message: "Error: Invalid token" });
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
