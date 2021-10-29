'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // hasto, hastoMany
      //belongs to 
      this.belongsTo(models.tb_paket,{
        foreignKey: 'id_paket',
        as: 'tb_paket'
      })
      this.belongsTo(models.tb_transaksi,{
        foreignKey: 'id_transaksi',
        as: 'tb_transaksi'
      })
    }
  };
  tb_detail_transaksi.init({
    id_detail_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    id_transaksi: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_detail_transaksi',
    tableName: 'tb_detail_transaksi'
  });
  return tb_detail_transaksi;
};