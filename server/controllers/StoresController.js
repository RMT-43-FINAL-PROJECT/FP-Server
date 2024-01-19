const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");

class StoresController {
  static async getAll(req, res, next) {
    try {
      const data = await db
        .collection("stores")
        .aggregate([
          {
            $lookup: {
              from: "orders",
              localField: "_id",
              foreignField: "storeId",
              as: "orders",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              photo: 1,
              joinDate: 1,
              orders: 1,
            },
          },
        ])
        .toArray();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getDetailById(req, res, next) {
    try {
      const { id } = req.params;
      const _id = new ObjectId(id);
      const data = await db.collection("stores").findOne({ _id });

      if (!data) {
        throw { name: `No store found with this ID` };
      }

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // static async template(req, res, next) {
  //   try {
  //     const data = `template`;
  //     res.status(200).json(data);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

module.exports = StoresController;
