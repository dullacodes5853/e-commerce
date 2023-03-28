const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    
    underscored: true,
    modelName: 'tag',
    sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Tag;
