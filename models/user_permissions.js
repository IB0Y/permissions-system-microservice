'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_role, {
        foreignKey: 'role_uuid',
        as: 'role'
      });
    }
  }
  user_permission.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    role_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user_role',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'user_permission',
    freezeTableName: true,
  });
  return user_permission;
};