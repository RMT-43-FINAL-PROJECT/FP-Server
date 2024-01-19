const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");
const cloudinary = require("../configs/cloudinary");

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
      // console.log(error);
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
      // console.log(error);
      next(error);
    }
  }

  static async addStore(req, res, next) {
    try {
      let {
        name,
        address,
        joinDate,
        longitude,
        latitude,
        ownerName,
        mobilePhone,
        status,
      } = req.body;

      if (!name) {
        throw { name: "Store name is required" };
      }

      if (!address) {
        throw { name: "Store address is required" };
      }

      if (!longitude || !latitude) {
        throw { name: "Store longitude & latitude is required" };
      }
      if (!ownerName) {
        throw { name: "Store owner's name is required" };
      }
      if (!mobilePhone) {
        throw { name: "Store mobile phone is required" };
      }

      if (!status) {
        status = "unverified";
      }
      if (!joinDate) {
        joinDate = new Date();
      }

      const store = await db.collection("stores").findOne({ name: name });

      if (store) {
        throw { name: "Store name is already registered" };
      }

      if (!req.file) {
        throw { name: "Photo is required" };
      }

      const dataToUpload = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const uploadFile = await cloudinary.uploader.upload(dataToUpload, {
        public_id: req.file.originalname,
        folder: "FP-Stores",
        resource_type: "auto",
      });

      const input = {
        name,
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        },
        photo: uploadFile.secure_url,
        address,
        joinDate: new Date(joinDate),
        ownerName,
        mobilePhone,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data = await db.collection("stores").insertOne(input);
      const storeId = data.insertedId;
      res
        .status(201)
        .json({ message: `Create Store With ID ${storeId} Successfull` });
    } catch (error) {
      // console.log(error);
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
