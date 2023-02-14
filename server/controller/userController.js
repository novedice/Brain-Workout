const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User, Session } = require('../models/models');
const uuid = require('uuid');
const sessionController = require('./sessionController');

const generateJWT = (id, nickname, email, sessionId) => {
  return jsonwebtoken.sign(
    {id: id, nickname, email, sessionId}, 
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
    const session = await sessionController.create(user);
    const token = generateJWT(user.id, user.nickname, user.email, session.id);
    await sessionController.update(session.id, token);
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
    const session = await sessionController.create(user);
    const token = generateJWT(user.id, user.nickname, user.email, session.id);
    await sessionController.update(session.id, token);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.nickname, req.user.email, req.user.sessionId);
    const session = await sessionController.get(req.user.sessionId);
    if (session) {
      await session.update({token});
    }
    return res.json({token});
  }

  async update(req, res, next) {
    const { nickname, email, password } = req.body;
    const user = User.findByPk(req.user.id);
    if (!user) {
      return next(ApiError.notFound('User not found!'));
    }
    if (nickname) await user.update({nickname});
    if (email) await user.update({email});
    if (password) await user.update({password});
    const token = generateJWT(user.id, user.nickname, user.email, req.user.sessionId);
    const session = await sessionController.get(req.user.sessionId);
    if (session) {
      return res.status(401).json({message: 'User not authorized!'});
    }
    await session.update({token});
    res.json({token});
  }

  async delete(req, res, next) {
    const user = User.findByPk(req.user.id);
    if (!user) {
      return next(ApiError.notFound('User not found!'));
    }
    await user.destroy();
    res.json({message: 'User deleted successfully!'});
  }
}

module.exports = new UserController();