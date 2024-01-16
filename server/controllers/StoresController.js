const { db } = require("../configs/mongodb");

class StoresController {
  static async getAll(req, res, next) {
    try {
      const data = await db.collection("stores").find().toArray();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async template(req, res, next) {
    try {
      const data = `template`;
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = StoresController;
