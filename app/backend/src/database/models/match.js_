'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  match.init({
    home_team: DataTypes.INTEGER,
    home_team_goals: DataTypes.INTEGER,
    away_team: DataTypes.INTEGER,
    away_team_goals: DataTypes.INTEGER,
    in_progress: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'match',
  });
  return match;
};