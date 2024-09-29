'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resource.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    resource_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_resource_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_active:{
      type: DataTypes.BOOLEAN
    },
    resource_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'resource',
    freezeTableName: true,
  });
  return resource;
};