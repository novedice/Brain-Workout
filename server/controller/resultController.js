const { User, Result, Game } = require("../models/models");
const sequelize = require("../db");
const ApiError = require("../error/ApiError");

class ResultController {
  async create(req, res, next) {
    const { gameId, value } = req.body;
    if (!gameId && !value) {
      return next(ApiError.badRequest("Invalid gameId or value!"));
    }
    const user = await User.findByPk(req.user.id);
    const result = await Result.create({ gameId, value });
    await user.addResult(result);
    res.json(result);
  }

  async getBest(req, res, next) {
    const userId = req.user.id;
    console.log(userId);
    const { gameId, sort } = req.query;
    if (!sort || !["ASC", "DESC"].includes(sort) || !gameId) {
      return next(ApiError.badRequest("Некорректные gameId или sort!"));
    }
    const result = await Result.findOne({
      where: { gameId, userId },
      attributes: ["value"],
      order: [["value", sort]],
    });
    res.json(result);
  }

  async get(req, res, next) {
    let { gameId, limit, page } = req.query;
    const userId = req.user.id;
    gameId = gameId || null;
    limit = limit || null;
    page = page || null;
    if (page && !limit) {
      return next(ApiError.badRequest("Page without specified limit!"));
    }
    let results;
    if (gameId) {
      if (!page && limit) {
        results = await Result.findAndCountAll({
          where: { gameId, userId },
          limit,
        });
      }
      if (!page && !limit) {
        results = await Result.findAndCountAll({ where: { gameId, userId } });
      }
      if (page && limit) {
        const offset = limit * page - limit;
        results = await Result.findAndCountAll({
          where: { gameId, userId },
          limit,
          offset,
        });
      }
    } else {
      if (!page && limit) {
        results = await Result.findAndCountAll({ where: { userId }, limit });
      }
      if (!page && !limit) {
        results = await Result.findAndCountAll({ where: { userId } });
      }
      if (page && limit) {
        const offset = limit * page - limit;
        results = await Result.findAndCountAll({
          where: { userId },
          limit,
          offset,
        });
      }
    }
    res.setHeader("x-total-count", results.count);
    res.json(results.rows);
  }
}

module.exports = new ResultController();
