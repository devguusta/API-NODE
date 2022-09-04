const Sequelize = require('sequelize');
require("dotenv").config();
const connection = new Sequelize(process.env.DATA_NAME, process.env.DATA_ROOT, process.env.DATA_PASSWORD, {
    host: process.env.DATA_HOST,
    dialect: 'mysql',
    timezone: '-03:00',
})

module.exports = connection ;