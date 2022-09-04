
require("dotenv").config();
const connection = require("./database/database");

const express = require('express');
const routes = require('./src/routes');



const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
connection.authenticate().then(() => {
    console.log('Authentication successful')
}).catch((error) => {
    console.error(error);
})




app.listen(process.env.SERVER_PORT, () => console.log('HTTP Client is running' + process.env.SERVER_PORT));
