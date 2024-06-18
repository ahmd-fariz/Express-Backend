import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Produk = db.define(
  "produks",
  {
    name: DataTypes.STRING,
    harga: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Produk;

(async () => {
  await db.sync();
})();
