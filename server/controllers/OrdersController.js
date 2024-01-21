const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");

class OrdersController {
  static async getAll(req, res, next) {
    try {
      const data = await db
        .collection("orders")
        .aggregate([
          {
            $lookup: {
              from: "stores",
              localField: "storeId",
              foreignField: "_id",
              as: "store",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "products",
              let: {
                productId: "$productOrder.productId",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$productId"],
                    },
                  },
                },
              ],
              as: "productDetails",
            },
          },
          {
            $unwind: {
              path: "$store",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              "store.name": 1,
              "store._id": 1,
              "user.name": 1,
              "user._id": 1,
              productOrder: {
                $map: {
                  input: {
                    $range: [
                      0,
                      {
                        $size: "$productOrder",
                      },
                    ],
                  },
                  as: "index",
                  in: {
                    $mergeObjects: [
                      {
                        productId: {
                          $arrayElemAt: ["$productOrder.productId", "$$index"],
                        },
                        qtySold: {
                          $arrayElemAt: ["$productOrder.qtySold", "$$index"],
                        },
                        price: {
                          $arrayElemAt: ["$productOrder.price", "$$index"],
                        },
                      },
                      {
                        $arrayElemAt: ["$productDetails", "$$index"],
                      },
                    ],
                  },
                },
              },
              status: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
          {
            $project: {
              "productOrder._id": 0,
              "productOrder.isAvailable": 0,
              "productOrder.stock": 0,
              "productOrder.createdAt": 0,
              "productOrder.updatedAt": 0,
              "productOrder.discPercent": 0,
              "productOrder.discQty": 0,
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ])
        .toArray();
      data.map((el) => {
        el.totalBill = 0;
        el.productOrder.map((pro) => {
          pro.billPerItem = 0;
          pro.billPerItem = pro.qtySold * pro.price;
          el.totalBill += pro.billPerItem;
        });
      });
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getDetail(req, res, next) {
    try {
      const { role, _id: userLoggedId } = req.user;
      const { id } = req.params;

      let order = await db
        .collection("orders")
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "stores",
              localField: "storeId",
              foreignField: "_id",
              as: "store",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "products",
              let: {
                productId: "$productOrder.productId",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$productId"],
                    },
                  },
                },
              ],
              as: "productDetails",
            },
          },
          {
            $unwind: {
              path: "$store",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              "store.name": 1,
              "store._id": 1,
              "user.name": 1,
              "user._id": 1,
              productOrder: {
                $map: {
                  input: {
                    $range: [
                      0,
                      {
                        $size: "$productOrder",
                      },
                    ],
                  },
                  as: "index",
                  in: {
                    $mergeObjects: [
                      {
                        productId: {
                          $arrayElemAt: ["$productOrder.productId", "$$index"],
                        },
                        qtySold: {
                          $arrayElemAt: ["$productOrder.qtySold", "$$index"],
                        },
                        price: {
                          $arrayElemAt: ["$productOrder.price", "$$index"],
                        },
                      },
                      {
                        $arrayElemAt: ["$productDetails", "$$index"],
                      },
                    ],
                  },
                },
              },
              status: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
          {
            $project: {
              "productOrder._id": 0,
              "productOrder.isAvailable": 0,
              "productOrder.stock": 0,
              "productOrder.createdAt": 0,
              "productOrder.updatedAt": 0,
              "productOrder.discPercent": 0,
              "productOrder.discQty": 0,
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ])
        .toArray();
      order.map((el) => {
        el.totalBill = 0;
        el.productOrder.map((pro) => {
          pro.billPerItem = 0;
          pro.billPerItem = pro.qtySold * pro.price;
          el.totalBill += pro.billPerItem;
        });
      });

      if (order.length === 0) {
        throw { name: `No order found with this ID` };
      }

      if (
        role !== `admin` &&
        userLoggedId.toString() !== order[0].user._id.toString()
      ) {
        throw { name: `Forbidden Access. Admin && related Sales only` };
      }
      const data = order[0];
      res.status(200).json(data);
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

module.exports = OrdersController;
