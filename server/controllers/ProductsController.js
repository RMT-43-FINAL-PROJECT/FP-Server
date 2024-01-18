const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");
const cloudinary = require('cloudinary').v2;
const { randomUUID } = require(`crypto`)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

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
      const data = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const base64File = Buffer.from(req.file.buffer).toString(`base64`)
      const dataURI = `data:${req.file.mimetype};base64,${base64File}`
      const dataImage = await cloudinary.uploader.upload(dataURI,
        { public_id: `${req.file.originalname}_${randomUUID()}`, folder: `products/image` });

      const { name, category, stock, price, discQty, discPercent, isAvailable } = req.body
      const data = await db.collection("products").insertOne({ name, image: dataImage.secure_url, category, stock, price, discQty, discPercent, isAvailable, createdAt: new Date(), updatedAt: new Date() });
      res.status(201).json({ message: `Create Product With ID ${data.insertedId} Successfull` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const base64File = Buffer.from(req.file.buffer).toString(`base64`)
      const dataURI = `data:${req.file.mimetype};base64,${base64File}`
      const dataImage = await cloudinary.uploader.upload(dataURI,
        { public_id: `${req.file.originalname}_${randomUUID()}`, folder: `products/image` });

      const { name, category, stock, price, discQty, discPercent, isAvailable } = req.body
      await db.collection("products").updateOne(
        { "_id": new ObjectId(req.params.id) },
        { $set: { name, image: dataImage.secure_url, category, stock, price, discQty, discPercent, isAvailable } });
      res.status(200).json({ message: `Update Product With ID ${req.params.id} Successfull` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductsController;
