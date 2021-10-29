'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tb_outlet,{
        foreignKey: 'id_outlet',
        as: 'tb_outlet'
      })
    }
  };
  tb_paket.init({
    id_paket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    id_outlet: DataTypes.INTEGER,
    jenis: DataTypes.INTEGER,
    nama_paket: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_paket',
    tableName: 'tb_paket'
  });
  return tb_paket;
};