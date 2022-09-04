const {User} = require("../../../../models");
const AuthService = require('./AuthService');

module.exports = {
    register: async (req, res) => AuthService.register(req, res),

}