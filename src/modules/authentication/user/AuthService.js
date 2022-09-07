

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User} = require("../../../../models");
const ONE_DAY = 86400000;

module.exports = {
    register: async (req,res) => {
        try {
           console.log(req.body);
            const {firstName, lastName, email, password} = req.body;
            if(email == undefined || firstName  == undefined || lastName  == undefined|| password == undefined){
                return res.status(400).json({status:400, message: "All input is required"});
            }
            const oldUser = await  User.findOne({where: {email}});
            if(oldUser){
                return res.status(409).json({status: 409, message : "User already exist. Please login"});
            }
            encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                firstName, lastName, email, password: encryptedPassword,
            });
            const token = getToken(user.id, user.email);
    
            user.dataValues.token = token;
            console.log(user.token);
            var userEntity = new UserEntity(user.firstName, user.lastName,user.email, token);
            res.status(201).json({ status: 201, userEntity });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: error.message });
        }
     }
}
function getToken(user_id, email) {
    return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
      expiresIn: ONE_DAY * 30,
    });
  }

  class UserEntity{
    constructor(firstName, lastName, email,token){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
    }
  }