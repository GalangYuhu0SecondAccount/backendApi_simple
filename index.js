const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 4000;

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
    
        const response = {
            api_key: process.env.API_KEY
        };
        res.status(201).json(response);
    } 
);

app.get("/users", AuthenticationRoute ,(req, res) => {
  return res.status(200).json(users);
});

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
