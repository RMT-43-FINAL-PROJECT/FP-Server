const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");

class ProductsController {
  static async getAll(req, res, next) {
    try {
      const data = await db.collection("products").find().toArray();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getDetailProduct(req, res, next) {
    try {
      const data = await db.collection("products").findOne({_id: new ObjectId(req.params.id)});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const {name, image, category, stock, price, discQty, discPercent, isAvailable} = req.body
      const data = await db.collection("products").insertOne({name, image, category, stock, price, discQty, discPercent, isAvailable, createdAt: new Date(), updatedAt: new Date()});
      res.status(201).json({message: `Update Product With ID ${data.insertedId} Successfull`});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductsController;
