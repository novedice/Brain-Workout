const { User, Result, Game } = require("../models/models");
const sequelize = require('../db');
const ApiError = require("c:/users/windows 10/desktop/практика приложение/journey/server/error/apierror");

class ResultController {
  async create(req, res, next) {
    const { gameId, value } = req.body;
    if (!gameId && !value) {
      return next(ApiError.badRequest('Invalid gameId or value!'));
    }
    const user = await User.findByPk(req.user.id);
    const result = await Result.create({gameId, value});
    await user.addResult(result);
    res.json(result);
  }

  async get(req, res, next) {
    let { gameId, limit, page } = req.body;
    gameId = gameId || null;
    limit = limit || null;
    page = page || null;
    if (page && !limit) {
      return next(ApiError.badRequest('Page without specified limit!'))
    }
    let results;
    if (gameId) {
      if (!page && limit) {
        results = await Result.findAndCountAll({where: {gameId}, limit});
      }
      if (!page && !limit) {
        results = await Result.findAndCountAll({where: {gameId}});
      }
      if (page && limit) {
        const offset = limit * page - limit;
        results = await Result.findAndCountAll({where: {gameId}, limit, offset});
      }
    } else {
      if (!page && limit) {
        results = await Result.findAndCountAll({limit});
      }
      if (!page && !limit) {
        results = await Result.findAndCountAll();
      }
      if (page && limit) {
        const offset = limit * page - limit;
        results = await Result.findAndCountAll({limit, offset});
      }
    }
    res.setHeader('x-total-count', results.count);
    res.json(results.rows);
  }
}

module.exports = new ResultController();