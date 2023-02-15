const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    lang: {type: DataTypes.STRING}
});

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  category: {type: DataTypes.STRING}
});

const Session = sequelize.define('session', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  token: {type: DataTypes.STRING}
})

const Result = sequelize.define('result', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  value: {type: DataTypes.INTEGER},
  gameId: {type: DataTypes.INTEGER}
});

User.hasMany(Result);
Result.belongsTo(User);

User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  User,
  Result,
  Session,
  Category
};