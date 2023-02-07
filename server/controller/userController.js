const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models/models');
const uuid = require('uuid');

const generateJWT = (id, email, role) => {
  return jsonwebtoken.sign(
    {id: id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class UserController {
  async registration(req, res, next) {
    const { nickname, password, email } = req.body;
    if (!nickname && !password && !email) {
      return next(ApiError.badRequest('Invalid email or password!'));
    }
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('User with this email already exists!'));      
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({nickname, password: hashPassword, email});
    const token = generateJWT(user.id, user.nickname, user.email);
    return res.json({token});
  }

  async login(req, res, next) {

  }

  async check(req, res, next) {

  }

  async delete(req, res, next) {

  }
}

module.exports = new UserController();