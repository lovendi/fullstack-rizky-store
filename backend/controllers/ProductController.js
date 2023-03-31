import Product from "../models/ProductModel.js";
import { Op } from "sequelize";

export const getProducts = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Product.count({
        where:{
            [Op.or]: [{namaProduk:{
                [Op.like]: '%'+search+'%'
            }}, {kodeProduk:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Product.findAll({
        where:{
            [Op.or]: [{namaProduk:{
                [Op.like]: '%'+search+'%'
            }}, {kodeProduk:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

export const getProductsById = async(req, res) =>{
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }  
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createProduct= async(req, res) =>{
    try {
        await Product.create(req.body);
        res.status(201).json({msg: "Product created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateProduct= async(req, res) =>{
    try {
        await Product.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct= async(req, res) =>{
    try {
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
