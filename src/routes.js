const express = require('express');
const  UserController  = require('./modules/authentication/user/AuthController');


const routes = express.Router();


routes.post("/authentication/register", UserController.register)


module.exports = routes;

