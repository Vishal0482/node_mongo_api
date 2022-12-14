const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const connectDB = require('./configuration/dbConfig');
dotenv.config();

const app = express();
const port = process.env.DEVELOPMENT_PORT || 5000;

app.use(bodyParser.json());
connectDB();
routes(app);

app.listen(port, ()=> {
    console.log("=======================================");
    console.log("SERVER RUNNING ON PORT: " + port);
    console.log("STARTING TIME: " + new Date());
    console.log("=======================================");
});
