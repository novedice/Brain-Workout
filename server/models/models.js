const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    language: {type: DataTypes.STRING}
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
  value: {type: DataTypes.INTEGER}
});

const Game = sequelize.define('game', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  valueType: {type: DataTypes.STRING, allowNull: true},
  category: {type: DataTypes.STRING}
})