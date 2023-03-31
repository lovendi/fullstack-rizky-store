import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('products',{
    kodeProduk: DataTypes.STRING,
    namaProduk: DataTypes.STRING,
    kategori: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    expired: DataTypes.DATE,
    hargaBeli: DataTypes.INTEGER,
    hargaJual: DataTypes.INTEGER,
    satuan: DataTypes.STRING
},{
    freezeTableName:true
});

export default Product;

(async()=>{
    await db.sync();
})();