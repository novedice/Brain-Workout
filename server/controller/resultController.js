const { User, Result, Game } = require("../models/models");
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
    let games;
    if (gameId) {
      const game = await Game.findByPk(gameId);
      if (!game) {
        return next(ApiError.badRequest('Game with this id not found!'));
      }
      if (limit && page) {
        const offset = limit * page - limit;
        games = await Game.findAll(
          {
            attributes: ['id', 'name', 'valueType'],
            where: {id: gameId}, include: {model: Result, attributes: ['id', 'value', 'createdAt'], limit, offset, where: {userId: req.user.id}}
          }
        );
      }
      if (limit && !page) {
        games = await Game.findAll(
          {
            attributes: ['id', 'name', 'valueType'],
            where: {id: gameId}, include: {model: Result, attributes: ['id', 'value', 'createdAt'], limit, where: {userId: req.user.id}}
          }
        );
      }
      if (!limit && !page) {
        games = await Game.findAll(
          {
            attributes: ['id', 'name', 'valueType'],
            where: {id: gameId}, include: {model: Result, attributes: ['id', 'value', 'createdAt'], where: {userId: req.user.id}}
          }
        );
      }
    } else {
      if (limit && page) {
        const offset = limit * page - limit;
        games = await Game.findAll(
          {
            attributes: ['id', 'name', 'valueType'],
            include: {model: Result, attributes: ['id', 'value', 'createdAt'], limit, offset, where: {userId: req.user.id}}
          }
        );
      }
      if (limit && !page) {
        games = await Game.findAll(
          {
            attributes: ['id', 'name', 'valueType'],
            include: {model: Result, attributes: ['id', 'value', 'createdAt'], limit, where: {userId: req.user.id}}
          }
        );
      }
      if (!limit && !page) {
        games = await Game.findAll(
          {
            attributes: ['id', 'name', 'valueType'],
            include: {model: Result, attributes: ['id', 'value', 'createdAt'], where: {userId: req.user.id}}
          }
        );
      }
    }
    res.json(games);
  }
}

module.exports = new ResultController();