'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_transaksi extends Model {
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
      this.belongsTo(models.tb_member,{
        foreignKey: 'id_member',
        as: 'tb_member'
      })
      this.belongsTo(models.tb_user,{
        foreignKey: 'id_user',
        as: 'tb_user'
      })
    }
  };
  tb_transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    id_outlet: DataTypes.INTEGER,
    kode_invoice: DataTypes.STRING,
    id_member: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    biaya_tambahan: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    pajak: DataTypes.INTEGER,
    status: DataTypes.STRING,
    dibayar: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_transaksi',
    tableName: 'tb_transaksi'
  });
  return tb_transaksi;
};