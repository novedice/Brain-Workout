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
      return next(ApiError.badRequest('Invalid email, nickname or password!'));
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
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Invalid email or password!'));
    }
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.notFound('User with this email not found!'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest('Wrong password!'));
    }
    const token = generateJWT(user.id, user.nickname, user.email);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.nickname, req.user.email);
    return res.json({token});
  }

  async delete(req, res, next) {
    const { password } = req.body;
    if (!password) {
      return next(ApiError.badRequest('Invalid password!'));
    }
    const user = User.findByPk(req.user.id);
    if (!user) {
      return next(ApiError.notFound('User not found!'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest('Wrong password!'));
    }
    await user.destroy();
    res.json({message: 'User deleted successfully!'});
  }
}

module.exports = new UserController();