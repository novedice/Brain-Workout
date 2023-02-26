const ApiError = require("../error/ApiError");
const { User, Result } = require("../models/models");

class LeaderController {
  async get(req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 1) {
      return next(ApiError.badRequest("Invalid id!"));
    }
    let { limit, page, sort } = req.query;
    limit = limit || 50;
    page = page || 1;
    sort = sort || "ASC";
    const offset = limit * page - limit;
    let { count, rows: results } = await Result.findAndCountAll({
      where: { gameId: id },
      limit,
      offset,
      order: [["value", sort]],
      attributes: ["value"],
      include: { model: User, attributes: ["nickname"] },
    });
    results = results.map((el, id) => {
      return {
        id: id + 1,
        nickname: el.user.nickname,
        value: el.value,
      };
    });
    res.setHeader("x-total-count", count);
    res.json(results);
  }
}

module.exports = new LeaderController();
