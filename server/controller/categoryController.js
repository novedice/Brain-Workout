const ApiError = require("../error/ApiError");
const { Category } = require("../models/models");

class CategoryController {
  async create(req, res, next) {
    const { category } = req.body;
    if (!category) {
      return next(ApiError.badRequest('Invalid category!'));
    }
    const candidate = Category.findOne({where: {category, userId: req.user.id}});
    if (candidate) {
      return res.json(candidate);
    }
    const categoryObj = Category.create({category, userId: req.user.id});
    res.json(categoryObj);
  }

  async get(req, res, next) {
    const categories = Category.findAll({attributes: ['id', 'category'], where: {userId: req.user.id}});
    res.json(categories);
  }

  async delete(req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 1) {
      return next(ApiError.badRequest('Invalid id!'));
    }
    const category = Category.findOne({where: {id, userId: req.user.id}});
    if (!category) {
      return next(ApiError.notFound('Category not found!'));
    }
    await category.destroy();
    res.json({message: 'Category deleted successfully!'});
  }
}

module.exports = new CategoryController();